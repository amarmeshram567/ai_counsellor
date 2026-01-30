import { useState } from "react";
import { Bot, X, Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTask } from "../store/slices/taskSlice";
import { fetchShortlist } from "../store/slices/universitiesSlice";

const Counsellor = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const { currentStage } = useSelector((state) => state.user);


    console.log("Counsellor rendered");

    // 🔹 Mock AI logic (replace with real API later)
    const askAI = async (stage) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    message:
                        stage === 1
                            ? "Start by chatting with the AI counsellor to clarify your goals."
                            : stage === 2
                                ? "Explore universities that match your academic profile and budget."
                                : "Focus on completing pending tasks to move forward.",
                    suggestions: [
                        "Complete your profile",
                        "Review shortlisted universities",
                        "Check application deadlines",
                    ],
                    actions: ["refreshTasks", "refreshShortlist"],
                });
            }, 1200);
        });
    };

    const handleAskAI = async () => {
        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            const aiResult = await askAI(currentStage);
            setResponse(aiResult);

            // trigger side effects
            aiResult.actions?.forEach((action) => {
                if (action === "refreshTasks") dispatch(fetchTask());
                if (action === "refreshShortlist") dispatch(fetchShortlist());
            });
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setResponse(null);
        setError(null);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-400 text-white shadow-lg transition hover:scale-105 hover:bg-blue-500"
            >
                <Bot className="h-6 w-6" />
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

                        {/* Header */}
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                    <Sparkles className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">AI Counsellor</h3>
                                    <p className="text-xs text-gray-500">
                                        Your study abroad assistant
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleClose}
                                className="rounded p-1 hover:bg-gray-100"
                            >
                                <X className="h-4 w-4 text-gray-600" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="min-h-[120px] rounded-lg bg-gray-50 p-4">
                            {loading ? (
                                <div className="flex items-center justify-center gap-2 py-8">
                                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                                    <span className="text-sm text-gray-500">Thinking...</span>
                                </div>
                            ) : response ? (
                                <div className="space-y-3">
                                    <p className="text-sm text-gray-800">{response.message}</p>

                                    {response.suggestions?.length > 0 && (
                                        <ul className="list-inside list-disc space-y-1 text-xs text-gray-600">
                                            {response.suggestions.map((s, i) => (
                                                <li key={i}>{s}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ) : error ? (
                                <p className="text-sm text-red-600">{error}</p>
                            ) : (
                                <p className="text-center text-sm text-gray-500">
                                    Click below to get personalized guidance based on your current
                                    stage.
                                </p>
                            )}
                        </div>

                        {/* CTA */}
                        <button
                            onClick={handleAskAI}
                            disabled={loading}
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
                        >
                            <Bot className="h-4 w-4" />
                            Ask AI Counsellor
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Counsellor;

