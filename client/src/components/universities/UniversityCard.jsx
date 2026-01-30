import {
    Heart,
    HeartOff,
    Lock,
    CheckCircle,
    MapPin,
    Trophy,
    Calendar,
    DollarSign,
} from "lucide-react";
import { format } from "date-fns";
import RiskBadge from "./RiskBadge";

const UniversityCard = ({
    university,
    isShortlisted,
    isLocked,
    currentStage,
    onToggleShortlist,
    onLockClick,
}) => {
    const deadline = new Date(university.applicationDeadline);
    const formattedDeadline = format(deadline, "MMM d, yyyy");

    return (
        <div
            className={`group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isLocked ? "ring-2 ring-blue-600 shadow-lg" : ""
                }`}
        >
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={university.imageUrl}
                    alt={university.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />

                {/* Risk Badge */}
                <div className="absolute top-3 left-3">
                    <RiskBadge riskLevel={university.riskLevel} />
                </div>

                {/* Ranking Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Trophy className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-xs font-bold text-gray-900">#{university.ranking}</span>
                </div>

                {/* University Name Overlay */}
                <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 drop-shadow-sm">
                        {university.name}
                    </h3>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-4 space-y-4">
                {/* Location */}
                <div className="flex items-center gap-1.5 text-gray-500">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{university.city}, {university.country}</span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg">
                        <DollarSign className="w-4 h-4 text-blue-600" />
                        <div>
                            <p className="text-xs text-gray-500">Tuition</p>
                            <p className="text-sm font-semibold text-gray-900">{university.cost}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <div>
                            <p className="text-xs text-gray-500">Deadline</p>
                            <p className="text-sm font-semibold text-gray-900">{formattedDeadline}</p>
                        </div>
                    </div>
                </div>

                {/* Acceptance Chance */}
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Acceptance Chance</span>
                        <span className="text-sm font-bold text-gray-900">{university.acceptanceChance}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${university.acceptanceChance >= 70
                                ? "bg-green-500"
                                : university.acceptanceChance >= 40
                                    ? "bg-yellow-400"
                                    : "bg-red-500"
                                }`}
                            style={{ width: `${university.acceptanceChance}%` }}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                    <button
                        onClick={onToggleShortlist}
                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-all ${isShortlisted
                            ? "bg-pink-600 text-white border-none hover:bg-pink-700"
                            : "border-gray-300 text-gray-900 hover:bg-gray-100"
                            }`}
                    >
                        {isShortlisted ? <Heart className="w-4 h-4" /> : <HeartOff className="w-4 h-4" />}
                        {isShortlisted ? "Shortlisted" : "Shortlist"}
                    </button>

                    <button
                        onClick={onLockClick}
                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-all ${isLocked
                            ? "bg-green-600 text-white border-none hover:bg-green-700"
                            : "border-gray-300 text-gray-900 hover:bg-gray-100"
                            }`}
                    >
                        {isLocked ? <CheckCircle className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        {isLocked ? "Locked" : "Lock"}
                    </button>
                </div>

                {/* Stage Indicator */}
                {currentStage > 0 && (
                    <div className="pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-500 text-center">
                            Current Stage: <span className="font-semibold text-blue-600">{currentStage}</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UniversityCard;
