import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import profileReducer from "./slices/profileSlice"
import universityReducer from "./slices/universitiesSlice"
import taskReducer from "./slices/taskSlice"
import timelineReducer from './slices/timelineSlice';


const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        universities: universityReducer,
        tasks: taskReducer,
        timeline: timelineReducer,

    },
});

export default store

