import { useState } from "react";
import {
    GraduationCap,
    MessageCircle,
    Building,
    FileText,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import { Link } from "react-router-dom";

export function Navbar({ userName, onLogout }) {
    const [open, setOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500">
                        <GraduationCap className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                        AI Counsellor
                    </span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-3">
                    <NavItem to="/universities" icon={Building} label="Universities" />
                    <NavItem to="/applications" icon={FileText} label="Applications" />
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-3">
                    <span className="hidden sm:block text-sm text-gray-500">
                        Welcome, <span className="font-semibold text-gray-900">{userName}</span>
                    </span>

                    <button
                        onClick={onLogout}
                        className="hidden sm:flex items-center gap-1 rounded border border-gray-200 px-3 py-1 text-sm hover:bg-gray-100"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden rounded p-2 hover:bg-gray-100"
                    >
                        {open ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-2">
                    <MobileNavItem to="/universities" icon={Building} label="Universities" />
                    <MobileNavItem to="/applications" icon={FileText} label="Applications" />

                    <button
                        onClick={onLogout}
                        className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}

/* Reusable Components */
function NavItem({ to, icon: Icon, label }) {
    return (
        <Link to={to}>
            <button className="flex items-center gap-1 rounded px-3 py-2 text-gray-500 hover:text-gray-900 transition">
                <Icon className="h-4 w-4" />
                {label}
            </button>
        </Link>
    );
}

function MobileNavItem({ to, icon: Icon, label }) {
    return (
        <Link to={to}>
            <div className="flex items-center gap-2 rounded px-3 py-2 text-gray-700 hover:bg-gray-100">
                <Icon className="h-4 w-4" />
                {label}
            </div>
        </Link>
    );
}
