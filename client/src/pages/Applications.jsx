// import { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { fetchShortlist, fetchUniversity } from '../store/slices/universitiesSlice';
// import { fetchTask } from '../store/slices/taskSlice';
// import { fetchTimeline } from '../store/slices/timelineSlice';
// import { ArrowLeft, Lock, MapPin, Calendar, AlertTriangle } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';

// const Applications = () => {
//     const dispatch = useDispatch();

//     const { currentStage, shortlist = [], universities = [], loading: universitiesLoading } =
//         useSelector((state) => state.universities);
//     const { events } = useSelector((state) => state.timeline);
//     const { tasks = [], loading: tasksLoading } = useSelector((state) => state.tasks);

//     useEffect(() => {
//         dispatch(fetchTask());
//         dispatch(fetchShortlist());
//         dispatch(fetchUniversity());
//     }, [dispatch]);

//     const hasShortlist = shortlist.length > 0;
//     const lockedUniversity = shortlist.find((u) => u.locked);

//     useEffect(() => {
//         if (lockedUniversity) {
//             dispatch(
//                 fetchTimeline({
//                     stage: 4,
//                     universityId: lockedUniversity.id,
//                 })
//             );
//         }
//     }, [dispatch, lockedUniversity]);

//     const applicationTasks = tasks.filter((task) => task.stage === 4);
//     const completedTasks = applicationTasks.filter((task) => task.completed);
//     const progress =
//         applicationTasks.length > 0
//             ? Math.round((completedTasks.length / applicationTasks.length) * 100)
//             : 0;

//     const otherUniversities = shortlist.filter((u) => !u.locked).slice(0, 3);

//     // ------------------ LOADING ------------------
//     if (tasksLoading || universitiesLoading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="flex flex-col items-center gap-4">
//                     <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
//                     <p>Loading applications...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (!hasShortlist) {
//         return (
//             <div className="min-h-screen flex flex-col items-center justify-center text-center">
//                 <Lock className="w-10 h-10 mb-4 text-muted-foreground" />
//                 <h2 className="text-xl font-semibold">No universities shortlisted</h2>
//                 <p className="text-muted-foreground mb-4">
//                     Please shortlist at least one university to continue.
//                 </p>
//                 <Link
//                     to="/universities"
//                     className="px-4 py-2 rounded bg-blue-500 text-white"
//                 >
//                     Browse Universities
//                 </Link>
//             </div>
//         );
//     }

//     return (
//         <div className="flex flex-col min-h-screen bg-white">
//             {/* ========== HEADER ========== */}
//             <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
//                 <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between gap-4">
//                     <div className="flex items-center gap-3">
//                         <Link to="/dashboard">
//                             <ArrowLeft />
//                         </Link>
//                         <div>
//                             <h1 className="text-xl font-bold">Applications</h1>
//                             <p className="text-sm text-gray-500">Stage 4</p>
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                         <div className="w-40 h-2 bg-gray-200 rounded">
//                             <div
//                                 className="h-2 bg-green-500 rounded"
//                                 style={{ width: `${progress}%` }}
//                             />
//                         </div>
//                         <span className="text-sm font-semibold">{progress}% Complete</span>
//                     </div>
//                 </div>
//             </header>

//             {/* ========== MAIN CONTENT ========== */}
//             <div className="flex-1 overflow-auto">
//                 <main className="container mx-auto px-4 py-6 grid lg:grid-cols-3 gap-6">
//                     {/* LEFT COLUMN */}
//                     <div className="lg:col-span-2 space-y-6">
//                         {lockedUniversity ? (
//                             <div className="rounded-lg overflow-hidden border-2 border-gray-200 hover:border-green-400">
//                                 <img
//                                     src={lockedUniversity.imageUrl || '/placeholder.jpg'}
//                                     alt={lockedUniversity.name}
//                                     className="w-full h-56 object-cover"
//                                 />
//                                 <div className="p-6 bg-gray-500 text-white">
//                                     <h2 className="text-2xl font-bold">{lockedUniversity.name}</h2>
//                                     <div className="flex gap-4 text-sm text-white/80 mt-2">
//                                         <span className="flex gap-1 items-center">
//                                             <MapPin size={14} />
//                                             {lockedUniversity.city}, {lockedUniversity.country}
//                                         </span>
//                                         <span className="flex gap-1 items-center">
//                                             <Calendar size={14} />
//                                             {new Date(
//                                                 lockedUniversity.applicationDeadline
//                                             ).toLocaleDateString()}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="grid sm:grid-cols-2 gap-4">
//                                 {shortlist.map((uni) => (
//                                     <div key={uni.id} className="border rounded-lg p-4">
//                                         <img
//                                             src={uni.imageUrl || '/placeholder.jpg'}
//                                             className="h-32 w-full object-cover rounded mb-3"
//                                         />
//                                         <h3 className="font-semibold">{uni.name}</h3>
//                                         <p className="text-sm text-gray-500">
//                                             {uni.city}, {uni.country}
//                                         </p>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>

//                     {/* RIGHT COLUMN */}
//                     <div className="flex flex-col space-y-6">
//                         {/* TIMELINE */}
//                         <div className="border rounded-lg p-6">
//                             <h3 className="text-lg font-semibold mb-4">Timeline</h3>
//                             <div className="relative pl-4">
//                                 <div className="absolute left-1 top-0 bottom-0 w-px bg-gray-300" />
//                                 <div className="space-y-4">
//                                     {events.map((event) => (
//                                         <div key={event.id} className="flex gap-3 relative">
//                                             <div
//                                                 className={`w-3 h-3 rounded-full mt-1 ${event.status === 'completed' ? 'bg-green-500' : 'bg-gray-400'
//                                                     }`}
//                                             />
//                                             <div>
//                                                 <p className="text-sm font-medium">{event.title}</p>
//                                                 <p className="text-xs text-gray-500">
//                                                     {new Date(event.date).toLocaleDateString()}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* OTHER SHORTLISTED */}
//                         {otherUniversities.length > 0 && (
//                             <div className="border rounded-lg p-6">
//                                 <h3 className="text-lg font-semibold mb-4">Other Shortlisted</h3>
//                                 <div className="space-y-3">
//                                     {otherUniversities.map((uni) => (
//                                         <div key={uni.id} className="flex gap-3">
//                                             <img
//                                                 src={uni.imageUrl}
//                                                 className="w-16 h-12 rounded object-cover"
//                                             />
//                                             <div>
//                                                 <p className="text-sm font-medium">{uni.name}</p>
//                                                 <p className="text-xs text-gray-500">
//                                                     {uni.city}, {uni.country}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </main>
//             </div>

//             {/* ========== COUNSELLOR / GUIDANCE FULL WIDTH BOTTOM ========== */}
//             <div className="w-full p-4 bg-gradient-to-r from-indigo-500 to-pink-500 flex flex-col items-center sticky bottom-0 z-20 mb-2">
//                 <AlertTriangle className="text-white h-7 w-7" />
//                 <p className="mt-2 text-sm text-white">
//                     Need help? Chat with AI Counsellor.
//                 </p>
//                 <Link to="/counsellor" className="mt-4">
//                     <button className="bg-white rounded-lg px-3 py-1 text-sm font-medium hover:bg-green-500 hover:text-white duration-300">
//                         Get Guidance
//                     </button>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default Applications;



import { useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    FileText,
    Lock,
    ExternalLink,
    CheckCircle,
    Clock,
    Circle,
    Upload,
    AlertTriangle,
    MapPin,
    Calendar,
} from "lucide-react";

const Applications = () => {
    /* ------------------ Dummy Data ------------------ */

    const currentStage = 4;

    const lockedUniversity = {
        id: 1,
        name: "Harvard University",
        city: "Cambridge",
        country: "USA",
        image:
            "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54",
        applicationDeadline: "2026-03-15",
        portalUrl: "https://www.harvard.edu",
    };

    const documents = [
        { id: 1, name: "Statement of Purpose", status: "completed", uploadedAt: "2026-01-10" },
        { id: 2, name: "Resume / CV", status: "in_progress" },
        { id: 3, name: "LOR", status: "pending" },
    ];

    const [tasks, setTasks] = useState([
        { id: 1, title: "Fill application form", completed: true, priority: "high" },
        { id: 2, title: "Upload documents", completed: false, priority: "medium" },
        { id: 3, title: "Pay application fee", completed: false, priority: "low" },
    ]);

    const timeline = [
        { id: 1, title: "University Locked", date: "2026-01-05", status: "completed" },
        { id: 2, title: "Documents Submission", date: "2026-02-01", status: "upcoming" },
        { id: 3, title: "Application Review", date: "2026-02-20", status: "upcoming" },
    ];

    /* ------------------ Helpers ------------------ */

    const toggleTask = (id) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const completedTasks = tasks.filter((t) => t.completed).length;
    const progress = Math.round((completedTasks / tasks.length) * 100);

    const statusIcon = (status) => {
        if (status === "completed") return <CheckCircle className="w-5 h-5 text-green-500" />;
        if (status === "in_progress") return <Clock className="w-5 h-5 text-yellow-500" />;
        return <Circle className="w-5 h-5 text-gray-400" />;
    };

    /* ------------------ Locked Check ------------------ */

    if (currentStage < 4 || !lockedUniversity) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-lg shadow text-center">
                    <Lock className="w-10 h-10 mx-auto mb-4 text-gray-400" />
                    <h2 className="text-xl font-semibold mb-2">Stage Locked</h2>
                    <p className="text-gray-500 mb-6">
                        Lock a university to access applications.
                    </p>
                    <Link to="/universities" className="px-4 py-2 bg-blue-600 text-white rounded">
                        Browse Universities
                    </Link>
                </div>
            </div>
        );
    }

    /* ------------------ UI ------------------ */

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link to="/dashboard">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </Link>
                        <FileText className="w-6 h-6 text-blue-600" />
                        <h1 className="text-lg font-semibold">Applications</h1>
                    </div>
                    <span className="text-sm font-medium">{progress}% Complete</span>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-4 grid lg:grid-cols-3 gap-6">
                {/* Left Section */}
                <div className="lg:col-span-2 space-y-6">
                    {/* University Card */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <img src={lockedUniversity.image} alt="" className="h-48 w-full object-cover" />
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-2">{lockedUniversity.name}</h2>
                            <div className="flex gap-4 text-sm text-gray-500 mb-4">
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {lockedUniversity.city}, {lockedUniversity.country}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(lockedUniversity.applicationDeadline).toDateString()}
                                </span>
                            </div>
                            <a
                                href={lockedUniversity.portalUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 text-blue-600 font-medium"
                            >
                                Visit Portal <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Documents */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="font-semibold mb-4">Required Documents</h3>
                        <div className="space-y-3">
                            {documents.map((doc) => (
                                <div key={doc.id} className="flex justify-between items-center hover:border-2 transition-all hover:border-green-500 cursor-pointer duration-200 rounded p-3">
                                    <div className="flex items-center gap-3">
                                        {statusIcon(doc.status)}
                                        <span>{doc.name}</span>
                                    </div>
                                    <Upload className="w-4 h-4 text-gray-400" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tasks */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="font-semibold mb-4">Application Tasks</h3>
                        <div className="space-y-3">
                            {/* {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    onClick={() => toggleTask(task.id)}
                                    className="flex items-center gap-3 cursor-pointer border rounded p-3"
                                >
                                    <div className={`w-5 h-5 border rounded ${task.completed ? "bg-green-500" : ""}`} />
                                    <span className={task.completed ? "line-through text-gray-400" : ""}>
                                        {task.title}
                                    </span>
                                </div>
                            ))} */}
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    onClick={() => toggleTask(task.id)}
                                    className="flex items-center gap-3 cursor-pointer border border-gray-100 rounded p-3 hover:bg-gray-50 transition"
                                >
                                    {task.completed ? (
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                    ) : (
                                        <Circle className="h-5 w-5 text-gray-400" />
                                    )}

                                    <span
                                        className={`text-sm ${task.completed ? "line-through text-gray-400" : "text-gray-800"
                                            }`}
                                    >
                                        {task.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="space-y-6">
                    {/* Timeline */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="font-semibold mb-4">Timeline</h3>
                        <div className="space-y-4">
                            {timeline.map((item) => (
                                <div key={item.id} className="flex gap-3">
                                    <div
                                        className={`w-3 h-3 rounded-full mt-1 ${item.status === "completed" ? "bg-green-500" : "bg-gray-300"
                                            }`}
                                    />
                                    <div>
                                        <p className="text-sm font-medium">{item.title}</p>
                                        <p className="text-xs text-gray-500">{item.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Help */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex gap-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-600" />
                            <div>
                                <p className="font-medium">Need Help?</p>
                                <p className="text-sm text-gray-600 mb-2">
                                    Chat with our AI counsellor.
                                </p>
                                <Link to="/dashboard" className="text-blue-600 text-sm font-medium">
                                    Get Guidance →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Applications;
