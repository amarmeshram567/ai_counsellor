// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {useSelector, useDispatch} from "react-redux"
// import {
//     GraduationCap,
//     Mail,
//     Lock,
//     ArrowRight,
//     Loader2,
// } from "lucide-react";
// import { useApp } from "../context/AppContext";
// import { loginUser } from "../store/slices/userSlice";

// const Login = () => {

//     const {user, loading, onboardingComplete} = useSelector(state => state.user)

//     const dispatch = useDispatch()

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {

//             dispatch(loginUser(email, password))

//     // Redirect based on onboarding status
//     if (onboardingCompleted) {
//       navigate('/dashboard');
//     } else {
//       navigate('/onboarding');
//     }

//         } catch (error) {

//         }

//     };

//     return (
//         <div className="min-h-screen flex">
//             {/* Left Panel */}
//             <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
//                 <div className="w-full max-w-md">
//                     {/* Logo */}
//                     <Link to="/" className="flex items-center gap-2 mb-8">
//                         <div className="w-10 h-10 bg-green-400 rounded-lg flex items-center justify-center">
//                             <GraduationCap className="w-6 h-6 text-white" />
//                         </div>
//                         <span className="font-bold text-xl">EduPath AI</span>
//                     </Link>

//                     <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
//                     <p className="text-gray-500 mb-8">
//                         Continue your journey to the perfect university
//                     </p>

//                     {/* Form */}
//                     <form onSubmit={handleSubmit} className="space-y-5">
//                         {/* Email */}
//                         <div>
//                             <label className="block text-sm font-medium mb-2">
//                                 Email
//                             </label>
//                             <div className="relative">
//                                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                                 <input
//                                     type="email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     placeholder="you@example.com"
//                                     required
//                                     className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                                 />
//                             </div>
//                         </div>

//                         {/* Password */}
//                         <div>
//                             <label className="block text-sm font-medium mb-2">
//                                 Password
//                             </label>
//                             <div className="relative">
//                                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                                 <input
//                                     type="password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     placeholder="••••••••"
//                                     required
//                                     className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                                 />
//                             </div>
//                         </div>

//                         {/* Error */}
//                         {error && (
//                             <div className="p-3 rounded-lg bg-red-100 text-red-600 text-sm">
//                                 {error}
//                             </div>
//                         )}

//                         {/* Button */}
//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 duration-200 transition disabled:opacity-60"
//                         >
//                             {loading ? (
//                                 <Loader2 className="w-5 h-5 animate-spin" />
//                             ) : (
//                                 <>
//                                     Sign In
//                                     <ArrowRight className="w-5 h-5" />
//                                 </>
//                             )}
//                         </button>
//                     </form>

//                     {/* Signup */}
//                     <p className="text-center text-gray-500 mt-8">
//                         Don&apos;t have an account?{" "}
//                         <Link
//                             to="/signup"
//                             className="text-green-600 font-medium hover:underline"
//                         >
//                             Sign up
//                         </Link>
//                     </p>
//                 </div>
//             </div>

//             {/* Right Panel */}
//             <div className="hidden lg:flex flex-1 bg-gradient-to-t from-green-400 to-blue-400 items-center justify-center p-12">
//                 <div className="text-white max-w-md">
//                     <h2 className="text-3xl font-bold mb-6">
//                         Your AI counsellor is waiting
//                     </h2>
//                     <p className="text-lg opacity-90">
//                         Pick up right where you left off. Your personalized university
//                         recommendations and application tasks are just a login away.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }


// export default Login

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast"
import {
    GraduationCap,
    Mail,
    Lock,
    ArrowRight,
    Loader2,
} from "lucide-react";

import { fetchDashboard, loginUser } from "../store/slices/userSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, onboardingCompleted } = useSelector(
        (state) => state.user
    );

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         await dispatch(
    //             loginUser({ email, password })
    //         ).unwrap();
    //         toast.success("Login In")

    //         // Redirect after successful login
    //         if (onboardingCompleted) {
    //             navigate("/dashboard");
    //         } else {
    //             navigate("/onboarding");
    //         }

    //     } catch (err) {
    //         // Error is already stored in Redux
    //         console.error("Login failed:", err);
    //         toast.error('Login failed')
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 1️⃣ Login
            await dispatch(loginUser({ email, password })).unwrap();

            // 2️⃣ Fetch dashboard (source of truth)
            const dashboardRes = await dispatch(fetchDashboard()).unwrap();

            toast.success("Logged in");

            // 3️⃣ Redirect based on BACKEND truth
            if (dashboardRes.onboardingComplete) {
                navigate("/dashboard");
            } else {
                navigate("/onboarding");
            }

        } catch (err) {
            console.error("Login failed:", err);
            toast.error("Login failed");
        }
    };


    return (
        <div className="min-h-screen flex">
            {/* Left Panel */}
            <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 mb-8">
                        <div className="w-10 h-10 bg-green-400 rounded-lg flex items-center justify-center">
                            <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-xl">EduPath AI</span>
                    </Link>

                    <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
                    <p className="text-gray-500 mb-8">
                        Continue your journey to the perfect university
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition disabled:opacity-60"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Signup */}
                    <p className="text-center text-gray-500 mt-8">
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-green-600 font-medium hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Panel */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-t from-green-400 to-blue-400 items-center justify-center p-12">
                <div className="text-white max-w-md">
                    <h2 className="text-3xl font-bold mb-6">
                        Your AI counsellor is waiting
                    </h2>
                    <p className="text-lg opacity-90">
                        Pick up right where you left off. Your personalized university
                        recommendations and application tasks are just a login away.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
