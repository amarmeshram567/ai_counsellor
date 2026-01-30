const educationLevels = ["High School", "Diploma", "Bachelors", "Masters"];

const AcademicBackgroundStep = ({ data, updateData }) => {
    return (
        <div className="space-y-6">
            {/* Education Level */}
            <div className="space-y-2">
                <label
                    htmlFor="educationLevel"
                    className="block text-sm font-medium text-gray-700"
                >
                    Education Level
                </label>
                <select
                    id="educationLevel"
                    value={data.educationLevel}
                    onChange={(e) => updateData({ educationLevel: e.target.value })}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select your education level</option>
                    {educationLevels.map((level) => (
                        <option key={level} value={level}>
                            {level}
                        </option>
                    ))}
                </select>
            </div>

            {/* Major */}
            <div className="space-y-2">
                <label
                    htmlFor="major"
                    className="block text-sm font-medium text-gray-700"
                >
                    Major / Field of Study
                </label>
                <input
                    id="major"
                    type="text"
                    placeholder="e.g., Computer Science"
                    value={data.major}
                    onChange={(e) => updateData({ major: e.target.value })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Graduation Year & GPA */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <label
                        htmlFor="graduationYear"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Graduation Year
                    </label>
                    <input
                        id="graduationYear"
                        type="number"
                        placeholder="e.g., 2024"
                        value={data.graduationYear}
                        onChange={(e) =>
                            updateData({
                                graduationYear: e.target.value
                                    ? parseInt(e.target.value)
                                    : "",
                            })
                        }
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="gpa"
                        className="block text-sm font-medium text-gray-700"
                    >
                        GPA / Percentage
                    </label>
                    <input
                        id="gpa"
                        type="number"
                        step="0.1"
                        placeholder="e.g., 9.1"
                        value={data.gpa}
                        onChange={(e) =>
                            updateData({
                                gpa: e.target.value ? parseFloat(e.target.value) : "",
                            })
                        }
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
    );
};

export default AcademicBackgroundStep;
