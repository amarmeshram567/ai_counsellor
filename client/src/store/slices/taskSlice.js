import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
    tasks: [],
    loading: false,
    error: null,
};

// Fetch tasks
export const fetchTask = createAsyncThunk(
    "tasks/fetchTasks",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/api/tasks"); // <-- await was missing
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch tasks");
        }
    }
);

// Add task
export const addTask = createAsyncThunk(
    "tasks/addTask",
    async (task, { rejectWithValue }) => {
        try {
            const res = await api.post("/api/tasks", task);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to add task");
        }
    }
);

// Toggle task
export const toggleTask = createAsyncThunk(
    "tasks/toggleTask",
    async (taskId, { rejectWithValue }) => {
        try {
            const res = await api.patch(`/api/tasks/${taskId}`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to toggle task");
        }
    }
);

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    fetched: false,
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },
        clearTasks: (state) => {
            state.tasks = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTask.fulfilled, (state, action) => {
                state.loading = false;
                state.fetched = true;
                state.tasks = (action.payload || []).map(task => ({
                    ...task,
                    completed: task.status === "DONE",
                    priority: task.priority || "medium", // default priority
                }));
            })
            .addCase(toggleTask.fulfilled, (state, action) => {
                const task = state.tasks.find(t => t.id === action.payload.id);
                if (task) task.completed = action.payload.status === "DONE";

            })

            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push({
                    ...action.payload,
                    completed: action.payload.status === "DONE",
                });
            });


    },
});

export const { setTasks, clearTasks } = taskSlice.actions;
export default taskSlice.reducer;
