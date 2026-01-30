import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";


// Fetch all universities
export const fetchUniversity = createAsyncThunk(
    "universities/fetchUniversity",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/api/universities");
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch universities"
            );
        }
    }
);


export const fetchShortlist = createAsyncThunk(
    "universities/fetchShortlist",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/api/universities/shortlist");
            return res.data.map(u => ({
                universityId: u.id,
                ...u,
            }));
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch shortlist"
            );
        }
    }
);




// Add university to shortlist
export const addToShortlist = createAsyncThunk(
    "universities/addToShortlist",
    async (university, { rejectWithValue }) => {
        try {
            const res = await api.post("/api/universities/shortlist/add", {
                universityId: university.id,
                category: university.category || "default", // make sure this exists
            });

            return {
                ...university,
                shortlistCategory: university.category,
            };
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to add to shortlist"
            );
        }
    }
);



// Remove from shortlist
export const removeFromShortlist = createAsyncThunk(
    "universities/removeFromShortlist",
    async (universityId, { rejectWithValue }) => {
        try {
            await api.delete("/api/universities/shortlist/remove", { data: { universityId } });
            return universityId; // <--- just return the id
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to remove from shortlist");
        }
    }
);




export const lockUniversity = createAsyncThunk(
    "application/lockUniversity",
    async (university, { rejectWithValue }) => {
        try {
            const res = await api.post("/api/universities/shortlist/lock", {
                universityId: university.id,
            });

            return res.data.locked; // ✅ locked object
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);




// Unlock university 
export const unlockUniversity = createAsyncThunk(
    "universities/unlockUniversity",
    async (universityId, { rejectWithValue }) => {
        try {
            const res = await api.post("/api/universities/shortlist/unlock", { universityId });
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message ||
                err.response?.data?.error ||
                err.message ||
                "Failed to unlock university"
            );
        }
    }
);




// fetch locked
export const fetchLockedUniversity = createAsyncThunk(
    "universities/fetchLockedUniversity",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/api/universities/shortlist/locked");
            return res.data?.locked || null; // ✅
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch locked university");
        }
    }
);



// Fetch current stage
export const fetchCurrentStage = createAsyncThunk(
    "universities/fetchStage",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/api/universities/stage");
            return res.data.currentStage; // ✅ FIXED
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch stage"
            );
        }
    }
);


// Update stage
export const updateStage = createAsyncThunk(
    "universities/updateStage",
    async (stage, { rejectWithValue }) => {
        try {
            const res = await api.patch("/api/universities/stage", { stage });
            return res.data.stage;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to update stage"
            );
        }
    }
);


const initialState = {
    universities: [],
    shortlist: [],
    locked: null,
    currentStage: 0,
    loading: false,
    error: null,
};

// slices
const universitySlice = createSlice({
    name: "universities",
    initialState,
    reducers: {
        setUniversities: (state, action) => {
            state.universities = action.payload;
        },
        clearShortlist: (state) => {
            state.shortlist = []
        }
    },

    extraReducers: (builder) => {
        builder

            /* ---------- FETCH UNIVERSITIES ---------- */
            .addCase(fetchUniversity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUniversity.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null
                state.universities = action.payload;
            })
            .addCase(fetchUniversity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* ---------- SHORTLIST ADD ---------- */
            .addCase(addToShortlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToShortlist.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                const exists = state.shortlist.some(
                    u => u.universityId === action.payload.universityId
                );

                if (!exists) {
                    state.shortlist.push(action.payload);
                }
            })
            .addCase(addToShortlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* ---------- SHORTLIST REMOVE ---------- */
            .addCase(removeFromShortlist.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(removeFromShortlist.fulfilled, (state, action) => {
                state.shortlist = state.shortlist.filter(u => u.universityId !== action.payload);
            })
            .addCase(removeFromShortlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Lock University
            .addCase(lockUniversity.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(lockUniversity.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.locked = action.payload;
            })
            .addCase(lockUniversity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Unlock University 
            .addCase(unlockUniversity.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(unlockUniversity.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.locked = null;
            })
            .addCase(unlockUniversity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // fetch current stage
            .addCase(fetchCurrentStage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentStage.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.currentStage = action.payload
            })
            .addCase(fetchCurrentStage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // update stage
            .addCase(updateStage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateStage.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.currentStage = action.payload;
            })
            .addCase(updateStage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // fetch shortlist
            .addCase(fetchShortlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchShortlist.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.shortlist = action.payload;
            })
            .addCase(fetchShortlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // fetch locked university
            .addCase(fetchLockedUniversity.fulfilled, (state, action) => {
                state.locked = action.payload; // now ONLY university or null
            });

    },
});

export const {
    setUniversities,
    clearShortlist,
} = universitySlice.actions;

export default universitySlice.reducer;








