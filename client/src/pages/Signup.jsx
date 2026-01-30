import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    GraduationCap,
    Mail,
    Lock,
    User,
    ArrowRight,
    Loader2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../store/slices/userSlice";
import toast from "react-hot-toast";

const Signup = () => {

    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.user);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(
                signupUser({ name, email, password })
            ).unwrap();
            toast.success("User created successfully")
            navigate("/onboarding");
        } catch (err) {
            console.log(err)
            toast.error(err || "Server error")
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Decorative */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-t from-green-400 to-blue-400 items-center justify-center p-12">
                <div className="text-white max-w-md">
                    <h2 className="text-3xl font-bold mb-6">
                        Start your journey today
                    </h2>
                    <p className="text-lg opacity-90 mb-8">
                        Join thousands of students who found their perfect university match
                        with AI-powered guidance.
                    </p>

                    <div className="space-y-4">
                        {[
                            "Personalized recommendations",
                            "Step-by-step guidance",
                            "Application tracking",
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                    <span className="text-sm">✓</span>
                                </div>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 mb-8">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                            <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-xl">EduPath AI</span>
                    </Link>

                    <h1 className="text-3xl font-bold mb-2">Create your account</h1>
                    <p className="text-gray-500 mb-8">
                        Begin your path to the perfect university
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    required
                                    className="w-full pl-11 pr-4 py-2 border border-gray-200  rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full pl-11 pr-4 py-2 border  border-gray-200  rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                                    minLength={6}
                                    className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        </div>


                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition duration-200 disabled:opacity-60"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Login */}
                    <p className="text-center text-gray-500 mt-8">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-green-600 font-medium hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}


export default Signup;