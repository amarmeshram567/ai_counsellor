const ieltsOptions = ["Not Started", "Planned", "Completed"];
const greOptions = ["Not Required", "Planned", "Completed"];
const sopOptions = ["Pending", "In Progress", "Completed"];

const ExamsDocumentsStep = ({ data, updateData }) => {
    return (
        <div className="space-y-6">
            {/* IELTS / TOEFL */}
            <div className="space-y-2">
                <label
                    htmlFor="ieltsStatus"
                    className="block text-sm font-medium text-gray-700"
                >
                    IELTS / TOEFL Status
                </label>

                <select
                    id="ieltsStatus"
                    value={data.ieltsStatus}
                    onChange={(e) => updateData({ ieltsStatus: e.target.value })}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select your IELTS status</option>
                    {ieltsOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            {/* GRE / GMAT */}
            <div className="space-y-2">
                <label
                    htmlFor="greStatus"
                    className="block text-sm font-medium text-gray-700"
                >
                    GRE / GMAT Status
                </label>

                <select
                    id="greStatus"
                    value={data.greStatus}
                    onChange={(e) => updateData({ greStatus: e.target.value })}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select your GRE status</option>
                    {greOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            {/* SOP */}
            <div className="space-y-2">
                <label
                    htmlFor="sopStatus"
                    className="block text-sm font-medium text-gray-700"
                >
                    Statement of Purpose (SOP)
                </label>

                <select
                    id="sopStatus"
                    value={data.sopStatus}
                    onChange={(e) => updateData({ sopStatus: e.target.value })}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select your SOP status</option>
                    {sopOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ExamsDocumentsStep;
