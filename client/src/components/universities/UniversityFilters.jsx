import { Search } from "lucide-react";
import { useState } from "react";

const UniversityFilters = ({
    searchQuery,
    onSearchChange,
    selectedCountry,
    onCountryChange,
    budgetRange,
    onBudgetChange,
    countries,
    maxBudget,
}) => {
    const [localBudget, setLocalBudget] = useState(budgetRange);

    const handleBudgetChange = (index, value) => {
        const newBudget = [...localBudget];
        newBudget[index] = Number(value);
        setLocalBudget(newBudget);
        onBudgetChange(newBudget);
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-6">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                {/* Search Input */}
                <div className="flex-1 space-y-2">
                    <label htmlFor="search" className="text-sm font-medium text-gray-900">
                        Search
                    </label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            id="search"
                            type="text"
                            placeholder="Search by name or city..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Country Filter */}
                <div className="w-full lg:w-48 space-y-2">
                    <label htmlFor="country" className="text-sm font-medium text-gray-900">
                        Country
                    </label>
                    <select
                        id="country"
                        value={selectedCountry}
                        onChange={(e) => onCountryChange(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Countries</option>
                        {countries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Budget Range */}
                <div className="w-full lg:w-72 space-y-2">
                    <label className="text-sm font-medium text-gray-900">
                        Budget Range
                    </label>
                    <div className="pt-2 flex gap-2 items-center">
                        <input
                            type="number"
                            min={0}
                            max={localBudget[1]}
                            step={1000}
                            value={localBudget[0]}
                            onChange={(e) => handleBudgetChange(0, e.target.value)}
                            className="w-20 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-gray-500">-</span>
                        <input
                            type="number"
                            min={localBudget[0]}
                            max={maxBudget}
                            step={1000}
                            value={localBudget[1]}
                            onChange={(e) => handleBudgetChange(1, e.target.value)}
                            className="w-20 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-gray-500 text-sm ml-2">Max: ${maxBudget.toLocaleString()}</span>
                    </div>
                    {/* Slider */}
                    <input
                        type="range"
                        min={0}
                        max={maxBudget}
                        step={1000}
                        value={localBudget[0]}
                        onChange={(e) => handleBudgetChange(0, e.target.value)}
                        className="w-full mt-2 accent-blue-500"
                    />
                    <input
                        type="range"
                        min={0}
                        max={maxBudget}
                        step={1000}
                        value={localBudget[1]}
                        onChange={(e) => handleBudgetChange(1, e.target.value)}
                        className="w-full mt-1 accent-blue-500"
                    />
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>${localBudget[0].toLocaleString()}</span>
                        <span>${localBudget[1].toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniversityFilters;
