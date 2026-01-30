import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function NextActionCard({ currentStage }) {
    const stageActions = {
        1: {
            title: "Research Universities",
            description:
                "Explore universities that match your profile and preferences. Compare programs, rankings, and costs.",
            cta: "Explore Universities",
            icon: Sparkles,
            route: "/universities",
        },
        2: {
            title: "Submit Applications",
            description:
                "Complete and submit your applications. Track deadlines and requirements for each university.",
            cta: "View Applications",
            icon: Sparkles,
            route: "/applications",
        },
    };

    const action = stageActions[currentStage] || stageActions[1];
    const Icon = action.icon;

    return (
        <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-r from-purple-500 to-blue-500 p-6 shadow-lg hover:shadow-xl transition">
            {/* Background blur */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white/5 blur-xl" />

            <div className="relative">
                {/* Icon */}
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                        <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs text-white">
                        Recommended Next Step
                    </span>
                </div>

                {/* Text */}
                <h3 className="mb-2 text-xl font-bold text-white">{action.title}</h3>
                <p className="mb-6 text-sm text-white/80">{action.description}</p>

                {/* CTA */}
                <Link to={action.route}>
                    <button className="group inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-medium text-blue-600 hover:bg-white/90">
                        {action.cta}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </Link>
            </div>
        </div>
    );
}
