import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { calculateProfileStrength, transformProfile } from './profileSlice';

const initialState = {
    user: null,
    onboardingCompleted: false,
    currentStage: 1,
    loading: false,
    error: null,
};


export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/api/profile/me");
            return res.data;
        } catch (err) {
            console.error("fetchUser error:", err.response?.data || err.message);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);


// Signup
export const signupUser = createAsyncThunk(
    'user/signupUser',
    async ({ email, name, password }, { rejectWithValue }) => {
        try {
            const res = await api.post('/api/signup', {
                email,
                name,
                password,
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || err.message || "Signup failed"
            );
        }
    }
);


// Login
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await api.post('/api/login', { email, password });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Get dashboard
export const fetchDashboard = createAsyncThunk(
    'user/fetchDashboard',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get('/api/dashboard');
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);


// ----------------------- Slice -----------------------
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.onboardingCompleted = false;
            state.currentStage = 1;
            state.error = null;
            localStorage.removeItem('token');

        },
        completeOnboarding: (state) => {
            state.onboardingCompleted = true;
            state.currentStage = 2;
        },
        advanceStage: (state, action) => {
            if (action.payload > state.currentStage) {
                state.currentStage = action.payload;
            }
        },
        setStage: (state, action) => {
            state.currentStage = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        }
    },


    extraReducers: (builder) => {
        // Signup
        builder.
            addCase(signupUser.pending, (state) => {
                state.loading = true; state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true; state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.onboardingCompleted = action.payload.profile?.onboardingComplete || false;
                state.currentStage = action.payload.profile?.currentStage || 1;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                const userData = action.payload.user;

                state.user = {
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    token: userData.token || null, // if you return it
                };
                state.currentStage = userData.currentStage;
                state.onboardingCompleted = userData.onboardingComplete;

                // Also set profile in the profile slice if needed
                if (userData.profile) {
                    state.profile = transformProfile(userData.profile);
                    state.profileStrength = calculateProfileStrength(state.profile);
                }
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export actions
export const { logout, completeOnboarding, advanceStage, clearError } = userSlice.actions;

// Export reducer
export default userSlice.reducer;



