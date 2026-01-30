const RiskBadge = ({ riskLevel, className = "" }) => {
    const getRiskConfig = (level) => {
        switch (level?.toUpperCase()) {
            case "LOW":
                return { label: "Safe", className: "bg-green-100 text-green-800" };
            case "MEDIUM":
                return { label: "Match", className: "bg-yellow-100 text-yellow-800" };
            case "HIGH":
                return { label: "Reach", className: "bg-red-100 text-red-800" };
            default:
                return { label: level || "Unknown", className: "bg-gray-100 text-gray-800" };
        }
    };

    const config = getRiskConfig(riskLevel);

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide shadow-sm ${config.className} ${className}`}
        >
            {config.label}
        </span>
    );
};

export default RiskBadge;
