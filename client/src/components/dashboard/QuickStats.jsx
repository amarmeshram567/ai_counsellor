import { Building, Lock, CheckCircle } from "lucide-react";

export function QuickStats({ shortlistedCount, lockedCount, tasksDone, totalTasks }) {
    const stats = [
        {
            label: "Shortlisted",
            value: shortlistedCount,
            icon: Building,
            color: "text-blue-600 bg-blue-100",
        },
        {
            label: "Locked",
            value: lockedCount,
            icon: Lock,
            color: "text-yellow-600 bg-yellow-100",
        },
        {
            label: "Tasks Done",
            value: `${tasksDone}/${totalTasks}`,
            icon: CheckCircle,
            color: "text-green-600 bg-green-100",
        },
    ];

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow">
            <h3 className="mb-4 font-semibold text-gray-900">Quick Stats</h3>

            <div className="grid grid-cols-3 gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="text-center">
                            <div className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}>
                                <Icon className="h-5 w-5" />
                            </div>
                            <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                            <p className="text-xs text-gray-500">{stat.label}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
