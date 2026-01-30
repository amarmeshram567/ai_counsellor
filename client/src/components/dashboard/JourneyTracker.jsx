import { CheckCircle, Lock, Sparkles, Search, ListChecks, Send } from "lucide-react";



export function JourneyTracker({ currentStage }) {
    const stages = [
        { id: 1, name: "Onboarding", icon: <Sparkles className="h-4 w-4" /> },
        { id: 2, name: "Research", icon: <Search className="h-4 w-4" /> },
        { id: 3, name: "Shortlist", icon: <ListChecks className="h-4 w-4" /> },
        { id: 4, name: "Apply", icon: <Send className="h-4 w-4" /> },
    ];

    const getStatus = (id) => {
        if (currentStage > id) return "completed";
        if (currentStage === id) return "current";
        return "locked";
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
            <h2 className="mb-6 text-lg font-semibold text-gray-800">Your Journey</h2>

            <div className="relative">
                {/* Progress line */}
                <div className="absolute left-5 top-7 h-full w-0.5 bg-gray-200 md:left-0 md:top-5 md:h-0.5 md:w-full"></div>

                {/* Stages */}
                <div className="relative flex flex-col gap-8 md:flex-row md:justify-between md:gap-0">
                    {stages.map((stage) => {
                        const status = getStatus(stage.id);

                        return (
                            <div
                                key={stage.id}
                                className={`flex items-center gap-4 md:flex-col md:items-center md:gap-3 ${status === "locked" ? "opacity-50" : ""
                                    }`}
                            >
                                {/* Stage Icon */}
                                <div
                                    className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300
                    ${status === "completed" ? "border-green-500 bg-green-500 text-white" : ""}
                    ${status === "current" ? "border-blue-500 bg-blue-500 text-white animate-pulse" : ""}
                    ${status === "locked" ? "border-gray-300 bg-gray-100 text-gray-400" : ""}
                  `}
                                >
                                    {status === "completed" ? (
                                        <CheckCircle className="h-5 w-5" />
                                    ) : status === "locked" ? (
                                        <Lock className="h-4 w-4" />
                                    ) : (
                                        stage.icon
                                    )}
                                </div>

                                {/* Stage Info */}
                                <div className="md:text-center">
                                    <p
                                        className={`font-medium transition-colors
                      ${status === "completed" ? "text-green-600" : ""}
                      ${status === "current" ? "text-blue-600" : ""}
                      ${status === "locked" ? "text-gray-400" : ""}
                    `}
                                    >
                                        {stage.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {status === "completed" && "Completed"}
                                        {status === "current" && "In Progress"}
                                        {status === "locked" && "Locked"}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
