import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Utensils, History, User } from 'lucide-react';
import clsx from 'clsx';

const Layout = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', icon: Utensils, label: 'Eat' },
        { path: '/history', icon: History, label: 'History' },
        { path: '/profile', icon: User, label: 'Profile' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 md:pb-0">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                        Re-Eat
                    </h1>
                </div>
            </header>

            <main className="max-w-md mx-auto px-4 py-6">
                <Outlet />
            </main>

            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 md:hidden">
                <div className="flex justify-around items-center h-16">
                    {navItems.map(({ path, icon: Icon, label }) => (
                        <Link
                            key={path}
                            to={path}
                            className={clsx(
                                "flex flex-col items-center justify-center w-full h-full space-y-1",
                                location.pathname === path
                                    ? "text-emerald-600"
                                    : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            <Icon size={24} />
                            <span className="text-xs font-medium">{label}</span>
                        </Link>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default Layout;
