import React from 'react';
import { useAuth } from '../logic/useAuth';
import { useNavigate } from 'react-router-dom';
import { LogOut, User as UserIcon } from 'lucide-react';

const Profile = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                        <UserIcon className="text-white" size={32} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Profile</h2>
                        <p className="text-gray-500 text-sm">{user?.email}</p>
                    </div>
                </div>

                <button
                    onClick={handleSignOut}
                    className="w-full bg-red-50 text-red-600 border-2 border-red-200 py-3 rounded-lg font-medium hover:bg-red-100 transition flex items-center justify-center gap-2"
                >
                    <LogOut size={20} />
                    Sign Out
                </button>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">About Re-Eat</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                    Re-Eat helps you maintain a balanced diet by analyzing your recent meals and suggesting what food groups you might be missing. Log your meals regularly for the best AI-powered recommendations!
                </p>
            </div>
        </div>
    );
};

export default Profile;
