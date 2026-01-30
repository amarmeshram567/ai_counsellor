import { User, GraduationCap, Globe, Wallet, FileText } from "lucide-react";

export function ProfileSidebar({ profile, profileStrength }) {
    const countryFlags = {
        UK: "🇬🇧",
        Germany: "🇩🇪",
        Australia: "🇦🇺",
        USA: "🇺🇸",
        Canada: "🇨🇦",
    };

    const statusColors = {
        "not_started": "bg-gray-200 text-gray-600",
        "completed": "bg-green-100 text-green-700",
        "in_progress": "bg-yellow-100 text-yellow-700",
        "pending": "bg-yellow-100 text-yellow-700",
    };

    return (
        <div className="space-y-6">

            {/* Profile Strength */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow">
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                        <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Profile Strength</h3>
                        <p className="text-sm text-gray-500">Complete your profile</p>
                    </div>
                </div>

                <div className="mb-2 flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">{profileStrength}%</span>
                    <span className="text-sm text-gray-500">Almost there!</span>
                </div>

                {/* Tailwind Progress Bar */}
                <div className="h-3 w-full rounded-full bg-gray-200">
                    <div
                        className="h-3 rounded-full bg-blue-600 transition-all duration-500"
                        style={{ width: `${profileStrength}%` }}
                    />
                </div>
            </div>

            {/* Profile Summary */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow">
                <h3 className="mb-4 font-semibold text-gray-900">Profile Summary</h3>
                <div className="space-y-4">

                    {/* Degree */}
                    <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                            <GraduationCap className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">
                                {profile.goals.intendedDegree || null} in {profile.goals.fieldOfStudy || null}
                            </p>
                            <p className="text-xs text-gray-500">
                                Target: {profile.goals.targetIntakeYear}
                            </p>
                        </div>
                    </div>

                    {/* Countries */}
                    <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-100">
                            <Globe className="h-4 w-4 text-teal-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">Target Countries</p>
                            <div className="mt-1 flex flex-wrap gap-1">
                                {profile.goals.preferredCountries.map((country) => (
                                    <span
                                        key={country}
                                        className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-800"
                                    >
                                        {countryFlags[country]} {country}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Budget */}
                    <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                            <Wallet className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">{profile.budget.budgetRange}</p>
                            <p className="text-xs text-gray-500">{profile.budget.fundingType} funded</p>
                        </div>
                    </div>

                    {/* Exams */}
                    <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100">
                            <FileText className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">Exams & Documents</p>
                            <div className="mt-1 space-y-1 text-xs">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">IELTS</span>
                                    <span className={`rounded-full px-2 py-0.5 ${statusColors[profile.exams.ieltsStatus.toLowerCase()]}`}>
                                        {profile.exams.ieltsStatus}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">GRE/GMAT</span>
                                    <span className={`rounded-full px-2 py-0.5 ${statusColors[profile.exams.greGmatStatus.toLowerCase()]}`}>
                                        {profile.exams.greGmatStatus}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">SOP</span>
                                    <span className={`rounded-full px-2 py-0.5 ${statusColors[profile.exams.sopStatus.toLowerCase()]}`}>
                                        {profile.exams.sopStatus}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
