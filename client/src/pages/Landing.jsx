

// import { Link } from "react-router-dom";
// import {
//     GraduationCap,
//     ArrowRight,
//     CheckCircle,
//     Shield,
//     Sparkles,
// } from "lucide-react";

// const Landing = () => {


//     const features = [
//         {
//             icon: <Shield className="w-6 h-6" />,
//             title: "Stage-Locked Guidance",
//             description:
//                 "Complete each step before moving forward. No shortcuts, no confusion.",
//         },
//         {
//             icon: <Sparkles className="w-6 h-6" />,
//             title: "AI-Powered Insights",
//             description:
//                 "Get personalized university recommendations based on your profile.",
//         },
//         {
//             icon: <CheckCircle className="w-6 h-6" />,
//             title: "Task Management",
//             description:
//                 "Never miss a deadline with auto-generated to-do lists.",
//         },
//     ];


//     const steps = [
//         'Complete your profile with academic details',
//         'Discover universities matched to your goals',
//         'Finalize and lock your top choice',
//         'Get guided through the application process',
//     ];

//     return (
//         <div className="min-h-screen bg-white">
//             {/* Navbar */}
//             <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
//                 <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
//                     <div className="flex items-center gap-2 text-green-600">
//                         <GraduationCap className="w-8 h-8" />
//                         <span className="text-xl font-bold">AI Counsellor</span>
//                     </div>

//                     <div className="flex items-center gap-4">
//                         <Link
//                             to="/login"
//                             className="text-green-500 border-2 border-green-500 px-8 py-1.5 hover:scale-95 duration-200 rounded-lg font-medium"
//                         >
//                             Login
//                         </Link>
//                         <Link
//                             to="/signup"
//                             className="px-5 py-2 rounded-lg bg-green-500 hover:scale-95 duration-300  text-white"
//                         >
//                             Get Started
//                         </Link>
//                     </div>
//                 </div>
//             </nav>

//             {/* Hero */}
//             <section className="pt-40 pb-50 bg-gradient-to-r from-green-100 to-white">
//                 <div className="max-w-4xl mx-auto text-center px-4">
//                     <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-400 rounded-full text-sm font-normal mb-6">
//                         <Sparkles className="w-4 h-4" />
//                         Your study abroad journey, simplified
//                     </div>

//                     <h1 className="text-4xl sm:text-5xl font-bold mb-6">
//                         Plan your study-abroad journey
//                         <br />
//                         <span className="text-green-600">
//                             with a guided AI counsellor
//                         </span>
//                     </h1>

//                     <p className="text-lg text-gray-600 mb-10">
//                         A strict step-by-step system that helps you go from profile building
//                         to application submission with confidence.
//                     </p>

//                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                         <Link
//                             to="/signup"
//                             className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition"
//                         >
//                             Get Started Free
//                             <ArrowRight className="w-5 h-5" />
//                         </Link>
//                         <Link
//                             to="/login"
//                             className="px-6 py-3 rounded-lg border-2 border-green-500 text-green-500 font-medium hover:bg-green-100 transition"
//                         >
//                             I already have an account
//                         </Link>
//                     </div>
//                 </div>
//             </section>

//             {/* Features */}
//             <section className="pt-40 pb-50 bg-gray-50">
//                 <div className="max-w-7xl mx-auto px-4">
//                     <div className="text-center mb-12">
//                         <h2 className="text-3xl text-green-500 font-bold mb-4">
//                             How AI Counsellor Works
//                         </h2>
//                         <p className="text-gray-400">
//                             A structured journey that ensures clarity and progress
//                         </p>
//                     </div>

//                     <div className="grid md:grid-cols-3 gap-8">
//                         {features.map((feature, index) => (
//                             <div
//                                 key={index}
//                                 className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
//                             >
//                                 <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-xl mb-4">
//                                     {feature.icon}
//                                 </div>
//                                 <h3 className="text-lg font-semibold text-green-700 mb-2">
//                                     {feature.title}
//                                 </h3>
//                                 <p className="text-gray-500">
//                                     {feature.description}
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Stages */}
//             <section className="py-20">
//                 <div className="max-w-7xl mx-auto px-4">
//                     <h2 className="text-3xl text-green-500 font-bold text-center mb-12">
//                         Your 4-Stage Journey
//                     </h2>

//                     <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                         {steps.map((title, index) => (
//                             <div
//                                 key={index}
//                                 className="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-md transition"
//                             >
//                                 <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
//                                     {index + 1}
//                                 </div>
//                                 <h3 className="font-semibold text-green-600">{title}</h3>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>



//             {/* CTA */}
//             <section className="py-20 bg-green-500 text-white text-center">
//                 <h2 className="text-3xl font-bold mb-4">
//                     Ready to start your journey?
//                 </h2>
//                 <p className="mb-8 text-gray-200">
//                     Join students planning their future with AI Counsellor
//                 </p>
//                 <Link
//                     to="/signup"
//                     className="inline-flex items-center gap-2 px-6 py-3 hover:scale-95 duration-200 bg-white text-green-600 rounded-lg font-medium hover:bg-gray-100 transition"
//                 >
//                     Start for Free
//                     <ArrowRight className="w-5 h-5" />
//                 </Link>
//             </section>

//             {/* Footer */}
//             <footer className="py-8 text-center text-sm text-gray-500">
//                 © 2025 AI Counsellor. Built for students.
//             </footer>
//         </div>
//     );
// };

// export default Landing;


import { Link } from "react-router-dom";
import {
    GraduationCap,
    ArrowRight,
    CheckCircle,
    Shield,
    Sparkles,
} from "lucide-react";

const Landing = () => {
    const features = [
        {
            icon: Shield,
            title: "Stage-Locked Guidance",
            description:
                "Move step-by-step. Each stage unlocks only when you're truly ready.",
        },
        {
            icon: Sparkles,
            title: "AI-Powered Insights",
            description:
                "Personalized university suggestions based on your profile & goals.",
        },
        {
            icon: CheckCircle,
            title: "Smart Task Management",
            description:
                "Auto-generated to-dos so you never miss an important deadline.",
        },
    ];

    const steps = [
        "Build your academic profile",
        "Discover matched universities",
        "Lock your final shortlist",
        "Apply with guided support",
    ];

    return (
        <div className="min-h-screen bg-white text-gray-800">
            {/* Navbar */}
            <nav className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-600 font-bold">
                        <GraduationCap className="w-8 h-8" />
                        <span className="text-xl">AI Counsellor</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/login"
                            className="px-6 py-1.5 border-2 border-green-500 text-green-600 rounded-lg font-medium hover:bg-green-50 transition"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="px-6 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition shadow-md hover:shadow-lg"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-36 pb-28 bg-gradient-to-br from-green-100 via-white to-white">
                <div className="max-w-4xl mx-auto text-center px-4 animate-fadeIn">
                    <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-green-100 text-green-600 text-sm font-medium shadow-sm">
                        <Sparkles className="w-4 h-4 animate-pulse" />
                        Your study abroad journey, simplified
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
                        Plan your study-abroad journey
                        <br />
                        <span className="text-green-600">
                            with a guided AI counsellor
                        </span>
                    </h1>

                    <p className="text-lg text-gray-600 mb-10">
                        A structured, no-confusion system that takes you from profile
                        creation to application submission with confidence.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/signup"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-green-500 text-white rounded-lg font-medium shadow-md hover:shadow-xl hover:-translate-y-0.5 transition"
                        >
                            Get Started Free
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/login"
                            className="px-7 py-3 rounded-lg border-2 border-green-500 text-green-600 font-medium hover:bg-green-100 transition"
                        >
                            I already have an account
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-bold text-green-600 mb-3">
                            How AI Counsellor Works
                        </h2>
                        <p className="text-gray-500">
                            Designed to remove confusion and guide you clearly
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <div
                                    key={i}
                                    className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="w-14 h-14 mb-5 flex items-center justify-center rounded-xl bg-green-100 text-green-600 group-hover:scale-110 transition">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-green-700 mb-2">
                                        {f.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {f.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Steps */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-green-600 text-center mb-14">
                        Your 4-Stage Journey
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step, i) => (
                            <div
                                key={i}
                                className="bg-white p-8 rounded-2xl text-center shadow-sm hover:shadow-lg transition hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-green-500 text-white flex items-center justify-center text-lg font-bold ring-4 ring-green-100">
                                    {i + 1}
                                </div>
                                <p className="font-medium text-green-700">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-gradient-to-r from-green-500 to-green-600 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Ready to start your journey?
                </h2>
                <p className="mb-8 text-green-100">
                    Join students building their future with AI Counsellor
                </p>
                <Link
                    to="/signup"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-white text-green-600 rounded-lg font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition"
                >
                    Start for Free
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </section>

            {/* Footer */}
            <footer className="py-8 text-center text-sm text-gray-500">
                © 2025 AI Counsellor. Built for students.
            </footer>
        </div>
    );
};

export default Landing;

