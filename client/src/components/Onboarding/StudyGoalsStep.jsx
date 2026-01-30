const targetDegrees = ["Masters", "MBA", "PhD"];
const intakeYears = [2025, 2026, 2027];
// const countryOptions = ["USA", "Canada", "UK", "Germany", "Australia"];
const countryOptions = [
    "USA",
    "Canada",
    "UK",
    "Germany",
    "Australia",
    "Ireland",
    "Netherlands",
    "Sweden",
    "France",
    "New Zealand",
];


const StudyGoalsStep = ({ data, updateData }) => {
    const toggleCountry = (country) => {
        if (data.countries.includes(country)) {
            updateData({
                countries: data.countries.filter((c) => c !== country),
            });
        } else {
            updateData({
                countries: [...data.countries, country],
            });
        }
    };

    return (
        <div className="space-y-6">
            {/* Target Degree */}
            <div className="space-y-2">
                <label
                    htmlFor="targetDegree"
                    className="block text-sm font-medium text-gray-700"
                >
                    Target Degree
                </label>

                <select
                    id="targetDegree"
                    value={data.targetDegree}
                    onChange={(e) => updateData({ targetDegree: e.target.value })}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select your target degree</option>
                    {targetDegrees.map((degree) => (
                        <option key={degree} value={degree}>
                            {degree}
                        </option>
                    ))}
                </select>
            </div>

            {/* Field of Study */}
            <div className="space-y-2">
                <label
                    htmlFor="field"
                    className="block text-sm font-medium text-gray-700"
                >
                    Field of Study
                </label>
                <input
                    id="field"
                    type="text"
                    placeholder="e.g., Computer Science"
                    value={data.field}
                    onChange={(e) => updateData({ field: e.target.value })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Intake Year */}
            <div className="space-y-2">
                <label
                    htmlFor="intakeYear"
                    className="block text-sm font-medium text-gray-700"
                >
                    Preferred Intake Year
                </label>

                <select
                    id="intakeYear"
                    value={data.intakeYear || ""}
                    onChange={(e) =>
                        updateData({
                            intakeYear: e.target.value ? parseInt(e.target.value) : "",
                        })
                    }
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select intake year</option>
                    {intakeYears.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            {/* Preferred Countries */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Preferred Countries
                </label>
                <p className="text-xs text-gray-500">
                    Select one or more countries you're interested in
                </p>

                <div className="flex flex-wrap gap-2">
                    {countryOptions.map((country) => {
                        const isSelected = data.countries.includes(country);

                        return (
                            <button
                                key={country}
                                type="button"
                                onClick={() => toggleCountry(country)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  ${isSelected
                                        ? "border-blue-600 bg-blue-600 text-white"
                                        : "border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50"
                                    }`}
                            >
                                {country}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default StudyGoalsStep;
