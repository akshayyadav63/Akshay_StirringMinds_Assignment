'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Rocket, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2 group">
                    <motion.div
                        whileHover={{ rotate: 20, scale: 1.1 }}
                        className="rounded-lg bg-indigo-600 p-2 text-white group-hover:bg-indigo-500 transition-colors"
                    >
                        <Rocket size={24} />
                    </motion.div>
                    <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                        StartupPerks
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link href="/deals" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                        Explore Deals
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                            >
                                <LayoutDashboard size={18} />
                                <span className="hidden sm:inline">Dashboard</span>
                            </Link>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
                            >
                                <LogOut size={16} />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link
                                href="/login"
                                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/register"
                                className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20"
                            >
                                Sign up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
