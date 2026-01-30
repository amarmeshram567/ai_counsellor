// import { CheckCircle2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { addTask, fetchTask, toggleTask } from "../../store/slices/taskSlice";


// const priorityConfig = {
//     high: {
//         label: "High",
//         className: "bg-red-100 text-red-600 border-red-200",
//     },
//     medium: {
//         label: "Medium",
//         className: "bg-yellow-100 text-yellow-600 border-yellow-200",
//     },
//     low: {
//         label: "Low",
//         className: "bg-green-100 text-green-600 border-green-200",
//     },
// };

// export function TaskList({ tasks = [], disableActions }) {


//     const dispatch = useDispatch();
//     const [newTaskTitle, setNewTaskTitle] = useState("");

//     // const displayTasks = tasks;
//     const completedCount = displayTasks.filter(t => t.completed).length;
//     const progress = displayTasks.length
//         ? (completedCount / displayTasks.length) * 100
//         : 0;

//     const isAddDisabled = displayTasks.length >= 5;


//     const isUsingDefaults = isAddDisabled && tasks.length === 0;

//     const displayTasks = isUsingDefaults ? defaultTasks : tasks;


//     const handleAddTask = () => {
//         if (!newTaskTitle.trim()) return;
//         dispatch(addTask({ title: newTaskTitle, stage: 2, priority: "medium" }));
//         setNewTaskTitle("");
//     };


//     return (
//         <div className="rounded-xl border border-gray-200 bg-white p-6 shadow">
//             <div className="mb-4 flex items-center justify-between">
//                 <h2 className="text-lg font-semibold text-gray-900">Current Tasks</h2>
//                 <span className="text-sm text-gray-500">
//                     {completedCount}/{displayTasks.length} completed
//                 </span>
//             </div>


//             {/* Add Task Input */}
//             <div className="mb-4 flex gap-2">
//                 <input
//                     type="text"
//                     value={newTaskTitle}
//                     onChange={(e) => setNewTaskTitle(e.target.value)}
//                     placeholder="Add new task..."
//                     className="flex-1 rounded border border-gray-300 px-3 py-1"
//                 />
//                 <button
//                     onClick={handleAddTask}
//                     className={`rounded  px-4 py-1 text-white ${isAddDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 "}`}
//                     disabled={isAddDisabled}
//                 >
//                     Add
//                 </button>
//             </div>


//             {/* Progress Bar */}
//             <div className="mb-6 h-2 w-full rounded-full bg-gray-200">
//                 <div
//                     className="h-2 rounded-full bg-blue-600 transition-all"
//                     style={{ width: `${progress}%` }}
//                 ></div>
//             </div>

//             {/* Task List */}
//             <div className="space-y-3">
//                 {displayTasks.map((task) => (
//                     <div
//                         key={task.id}
//                         className={`group flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-all duration-200 hover:border-blue-300 hover:shadow-sm ${task.completed ? "bg-gray-100" : ""
//                             }`}
//                     >
//                         {/* Checkbox */}
//                         <button
//                             disabled={disableActions}
//                             onClick={() => dispatch(toggleTask(task.id))}
//                             className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2
//     ${disableActions ? "cursor-not-allowed opacity-50" : ""}
//     ${task.completed
//                                     ? "border-green-600 bg-green-600 text-white"
//                                     : "border-gray-300 hover:border-blue-500"
//                                 }`}
//                         >

//                             {task.completed && <CheckCircle2 className="h-4 w-4" />}
//                         </button>

//                         {/* Task Content */}
//                         <span
//                             className={`flex-1 text-sm transition-colors ${task.completed ? "text-gray-400 line-through" : "text-gray-900"
//                                 }`}
//                         >
//                             {task.title}
//                         </span>

//                         {/* Priority Badge */}
//                         <span
//                             className={`rounded-full border px-2 py-0.5 text-xs font-medium ${priorityConfig[task.priority]?.className || "bg-gray-100 text-gray-600 border-gray-200"
//                                 }`}
//                         >
//                             {priorityConfig[task.priority]?.label || "Medium"}
//                         </span>

//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }



import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, toggleTask } from "../../store/slices/taskSlice";

const priorityConfig = {
    high: {
        label: "High",
        className: "bg-red-100 text-red-600 border-red-200",
    },
    medium: {
        label: "Medium",
        className: "bg-yellow-100 text-yellow-600 border-yellow-200",
    },
    low: {
        label: "Low",
        className: "bg-green-100 text-green-600 border-green-200",
    },
};

export function TaskList({ tasks = [], disableActions = false }) {
    const dispatch = useDispatch();
    const [newTaskTitle, setNewTaskTitle] = useState("");

    // ✅ SAFE derived values
    const completedCount = tasks.filter((t) => t.completed).length;
    const progress = tasks.length
        ? (completedCount / tasks.length) * 100
        : 0;

    const isAddDisabled = disableActions || tasks.length >= 5;

    const handleAddTask = () => {
        if (!newTaskTitle.trim() || disableActions) return;

        dispatch(
            addTask({
                title: newTaskTitle,
                stage: 2,
                priority: "medium",
            })
        );

        setNewTaskTitle("");
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Current Tasks</h2>
                <span className="text-sm text-gray-500">
                    {completedCount}/{tasks.length} completed
                </span>
            </div>

            {/* Add Task */}
            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Add new task..."
                    disabled={disableActions}
                    className="flex-1 rounded border border-gray-300 px-3 py-1 disabled:bg-gray-100"
                />
                <button
                    onClick={handleAddTask}
                    disabled={isAddDisabled}
                    className={`rounded px-4 py-1 text-white transition
            ${isAddDisabled
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    Add
                </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-6 h-2 w-full rounded-full bg-gray-200">
                <div
                    className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Task List */}
            <div className="space-y-3">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className={`flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-all
              hover:border-blue-300 hover:shadow-sm
              ${task.completed ? "bg-gray-100" : ""}
            `}
                    >
                        {/* Toggle */}
                        <button
                            disabled={disableActions}
                            onClick={() => dispatch(toggleTask(task.id))}
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2
                ${disableActions ? "cursor-not-allowed opacity-50" : ""}
                ${task.completed
                                    ? "border-green-600 bg-green-600 text-white"
                                    : "border-gray-300 hover:border-blue-500"
                                }
              `}
                        >
                            {task.completed && <CheckCircle2 className="h-4 w-4" />}
                        </button>

                        {/* Title */}
                        <span
                            className={`flex-1 text-sm ${task.completed
                                ? "line-through text-gray-400"
                                : "text-gray-900"
                                }`}
                        >
                            {task.title}
                        </span>

                        {/* Priority */}
                        <span
                            className={`rounded-full border px-2 py-0.5 text-xs font-medium
                ${priorityConfig[task.priority]?.className ||
                                "bg-gray-100 text-gray-600 border-gray-200"
                                }
              `}
                        >
                            {priorityConfig[task.priority]?.label || "Medium"}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
