const budgetRanges = [
    { value: "10000-20000", label: "$10,000 - $20,000" },
    { value: "20000-40000", label: "$20,000 - $40,000" },
    { value: "40000-60000", label: "$40,000 - $60,000" },
];

const fundingTypes = ["Self", "Loan", "Scholarship"];

const BudgetStep = ({ data, updateData }) => {
    return (
        <div className="space-y-6">
            {/* Budget Range */}
            <div className="space-y-2">
                <label
                    htmlFor="budgetRange"
                    className="block text-sm font-medium text-gray-700"
                >
                    Annual Budget Range
                </label>
                <p className="text-xs text-gray-500">
                    Estimated budget for tuition and living expenses per year
                </p>

                <select
                    id="budgetRange"
                    value={data.budgetRange}
                    onChange={(e) => updateData({ budgetRange: e.target.value })}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select your budget range</option>
                    {budgetRanges.map((range) => (
                        <option key={range.value} value={range.value}>
                            {range.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Funding Type */}
            <div className="space-y-2">
                <label
                    htmlFor="fundingType"
                    className="block text-sm font-medium text-gray-700"
                >
                    Primary Funding Source
                </label>

                <select
                    id="fundingType"
                    value={data.fundingType}
                    onChange={(e) => updateData({ fundingType: e.target.value })}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select your funding type</option>
                    {fundingTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default BudgetStep;
