import { useEffect } from "react";
import { JourneyTracker } from "../components/dashboard/JourneyTracker";
import { Navbar } from "../components/dashboard/Navbar";
import { NextActionCard } from "../components/dashboard/NextActionCard";
import { ProfileSidebar } from "../components/dashboard/ProfileSidebar";
import { QuickStats } from "../components/dashboard/QuickStats";
import { TaskList } from "../components/dashboard/TaskList";


import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../store/slices/profileSlice";
import { fetchUser, logout } from "../store/slices/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fetchTask } from "../store/slices/taskSlice";
import Counsellor from "./Counsellor";


const Dashboard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { user, loading } = useSelector(state => state.user);
    const { profile, profileStrength } = useSelector(state => state.profile);
    const { tasks, fetched } = useSelector(state => state.tasks);
    const { shortlist, locked, currentStage } = useSelector(state => state.universities);


    const handleLogout = () => {
        dispatch(logout());
        toast.success("Logged out");
        navigate("/");
    };

    console.log(
        "loading... : ", loading,
        "user :", user,
        "current stage: ", currentStage,
        "profile : ", profile,
        "profile strength: ", profileStrength,
        "tasks : ", tasks,
        "shortlist: ", shortlist,
        "locked : ", locked
    )

    useEffect(() => {
        dispatch(fetchUser())
        dispatch(fetchProfile())
        dispatch(fetchTask())
    }, [dispatch])


    // Default tasks if none provided
    const defaultTasks = [
        { id: "1", title: "Complete your profile information", priority: "high", completed: true },
        { id: "2", title: "Set your budget preferences", priority: "high", completed: true },
        { id: "3", title: "Add preferred countries", priority: "medium", completed: true },
        { id: "4", title: "Upload academic transcripts", priority: "medium", completed: false },
        { id: "5", title: "Take English proficiency assessment", priority: "low", completed: false },
    ];

    // const displayTasks =
    //     fetched && tasks.length === 0
    //         ? defaultTasks
    //         : tasks;


    const isUsingDefaults = fetched && tasks.length === 0;

    const displayTasks = isUsingDefaults ? defaultTasks : tasks;

    const tasksDone = displayTasks.filter((t) => t.completed).length;




    // const displayTasks = isUsingDefaults ? defaultTasks : tasks;


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <Navbar userName={user?.name || "Amar"} onLogout={handleLogout} />

            <Counsellor />

            {/* Main Content */}
            <main className="container mx-auto py-8 px-4">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, {user?.name || "Amar"}! 👋
                    </h1>
                    <p className="mt-1 text-gray-500">
                        Track your study abroad journey and take the next step towards your dream university.
                    </p>
                </div>

                {/* Dashboard Grid */}
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Left / Main Column */}
                    <div className="space-y-6 lg:col-span-2">
                        <JourneyTracker currentStage={currentStage} />
                        <NextActionCard currentStage={currentStage} />
                        <TaskList tasks={displayTasks} disableActions={isUsingDefaults} />

                    </div>


                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {profile ? (
                            <ProfileSidebar profile={profile} profileStrength={profileStrength} />
                        ) : (
                            <div>Loading profile...</div>
                        )}

                        <QuickStats
                            shortlistedCount={shortlist.length}
                            lockedCount={locked ? 1 : 0}
                            tasksDone={tasksDone}
                            totalTasks={displayTasks.length}
                        />
                    </div>

                </div>
            </main>
        </div>
    );
}


export default Dashboard
