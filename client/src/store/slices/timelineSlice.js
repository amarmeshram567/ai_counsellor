import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchTimeline = createAsyncThunk(
    'timeline/fetchTimeline',
    async ({ stage, universityId }, { rejectWithValue }) => {
        try {
            const res = await api.get(
                `/api/timeline?stage=${stage}&universityId=${universityId}`
            );
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch timeline");
        }
    }
);

const timelineSlice = createSlice({
    name: 'timeline',
    initialState: {
        events: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchTimeline.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTimeline.fulfilled, (state, action) => {
                state.events = action.payload;
                state.loading = false;
            })
            .addCase(fetchTimeline.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default timelineSlice.reducer;
