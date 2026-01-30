import { Lock, CheckCircle } from "lucide-react";

const LockConfirmModal = ({
    university,
    isOpen,
    onClose,
    onConfirm,
    isCurrentlyLocked,
}) => {
    if (!university || !isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                {/* Icon */}
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {isCurrentlyLocked ? (
                        <CheckCircle className="w-6 h-6 text-primary" />
                    ) : (
                        <Lock className="w-6 h-6 text-primary" />
                    )}
                </div>

                {/* Title */}
                <h2 className="text-center text-lg font-semibold mb-2">
                    {isCurrentlyLocked ? "Unlock University?" : "Lock University?"}
                </h2>

                {/* Description */}
                <p className="text-center text-sm text-gray-700 mb-6">
                    {isCurrentlyLocked ? (
                        <>
                            Are you sure you want to unlock{" "}
                            <span className="font-semibold">{university.name}</span>? This will
                            allow you to lock a different university.
                        </>
                    ) : (
                        <>
                            Are you sure you want to lock{" "}
                            <span className="font-semibold">{university.name}</span> as your
                            chosen university? You can only lock one university at a time.
                        </>
                    )}
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <button
                        onClick={onClose}
                        className="w-full sm:w-32 rounded-lg border border-gray-300 bg-gray-100 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="w-full sm:w-32 rounded-lg bg-primary py-2 text-sm font-medium text-white hover:bg-primary/90 transition"
                    >
                        {isCurrentlyLocked ? "Unlock" : "Lock"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LockConfirmModal;
