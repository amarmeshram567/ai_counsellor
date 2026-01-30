import { Check, GraduationCap, Target, Wallet, FileText } from "lucide-react";

const steps = [
    { icon: GraduationCap, label: "Academic Background" },
    { icon: Target, label: "Study Goals" },
    { icon: Wallet, label: "Budget" },
    { icon: FileText, label: "Exams & Documents" },
];

const StepIndicator = ({ currentStep, totalSteps }) => {
    return (
        <div className="w-full mb-8">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const StepIcon = step.icon;

                    const isCompleted = index < currentStep;
                    const isActive = index === currentStep;
                    const isPending = index > currentStep;

                    return (
                        <div key={index} className="flex flex-col items-center flex-1">
                            <div className="flex items-center w-full">
                                {/* Connector before */}
                                {index > 0 && (
                                    <div
                                        className={`h-0.5 flex-1 transition-colors duration-300 ${isCompleted || isActive
                                            ? "bg-green-500"
                                            : "bg-gray-300"
                                            }`}
                                    />
                                )}

                                {/* Step circle */}
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shrink-0
                    ${isCompleted
                                            ? "bg-green-500 text-white"
                                            : isActive
                                                ? "bg-blue-600 text-white ring-4 ring-blue-500/20"
                                                : "bg-gray-200 text-gray-500"
                                        }`}
                                >
                                    {isCompleted ? (
                                        <Check className="w-5 h-5" />
                                    ) : (
                                        <StepIcon className="w-5 h-5" />
                                    )}
                                </div>

                                {/* Connector after */}
                                {index < totalSteps - 1 && (
                                    <div
                                        className={`h-0.5 flex-1 transition-colors duration-300 ${isCompleted ? "bg-green-500" : "bg-gray-300"
                                            }`}
                                    />
                                )}
                            </div>

                            {/* Step label */}
                            <span
                                className={`mt-2 text-xs font-medium text-center px-1 transition-colors duration-300
                  ${isCompleted
                                        ? "text-green-600"
                                        : isActive
                                            ? "text-blue-600"
                                            : "text-gray-500"
                                    }`}
                            >
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StepIndicator;
