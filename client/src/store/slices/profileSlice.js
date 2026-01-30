import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';


// Fetch profile
export const fetchProfile = createAsyncThunk(
    'user/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get('/api/profile');
            return res.data; // expected Profile object
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Update profile
export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async (profileData, { rejectWithValue }) => {
        try {
            const res = await api.post('/api/profile', {
                educationLevel: profileData.educationLevel,
                major: profileData.major,
                graduationYear: Number(profileData.graduationYear),
                gpa: profileData.gpa ? Number(profileData.gpa) : null,

                targetDegree: profileData.targetDegree,
                field: profileData.field,
                intakeYear: Number(profileData.intakeYear),
                countries: profileData.countries,

                budgetRange: profileData.budgetRange,
                fundingType: profileData.fundingType,

                ieltsStatus: profileData.ieltsStatus,
                greStatus: profileData.greStatus,
                sopStatus: profileData.sopStatus,
            });

            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const transformProfile = (p) => ({
    academics: {
        educationLevel: p.educationLevel || '',
        major: p.major || '',
        graduationYear: p.graduationYear || '',
        gpa: p.gpa || null,
    },
    goals: {
        intendedDegree: p.targetDegree || '',
        fieldOfStudy: p.field || '',
        targetIntakeYear: p.intakeYear || '',
        preferredCountries: p.countries || [],
    },
    budget: {
        budgetRange: p.budgetRange || '',
        fundingType: p.fundingType || '',
    },
    exams: {
        ieltsStatus: p.ieltsStatus || 'not_started',
        greGmatStatus: p.greStatus || 'not_started',
        sopStatus: p.sopStatus || 'not_started',
    },
});


export const calculateProfileStrength = (profile) => {
    if (!profile) return 0;

    let strength = 0;

    if (profile.academics?.educationLevel) strength += 15;
    if (profile.academics?.major) strength += 5;
    if (profile.academics?.gpa) strength += 10;

    if (profile.goals?.intendedDegree) strength += 5;
    if (profile.goals?.fieldOfStudy) strength += 5;
    if (profile.goals?.targetIntakeYear) strength += 5;

    if (profile.goals?.preferredCountries?.length > 0) strength += 15;

    if (profile.budget?.budgetRange) strength += 10;
    if (profile.budget?.fundingType) strength += 5;

    if (profile.exams?.ieltsStatus === 'Planned') strength += 10;
    if (profile.exams?.greGmatStatus === 'completed') strength += 10;
    if (profile.exams?.sopStatus === 'Pending') strength += 5;

    return Math.min(strength, 100);
};



const initialState = {
    profile: null,
    profileStrength: 0,
    loading: false,
    error: null,
};


const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;
            state.profileStrength = calculateProfileStrength(action.payload);
        },
        clearProfile: (state) => {
            state.profile = null;
            state.profileStrength = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetch profile
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true; state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false;
                if (!action.payload) return;
                state.profile = transformProfile(action.payload);
                state.profileStrength = calculateProfileStrength(state.profile);
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // update profile
            .addCase(updateProfile.pending, (state) => {
                state.loading = true; state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = transformProfile(action.payload); // 🔥 transform here too!
                state.profileStrength = calculateProfileStrength(state.profile);
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }

})

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;




