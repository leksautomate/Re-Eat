import { createContext, useContext, useEffect, useState } from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged
} from 'firebase/auth';
import { auth, isConfigured } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

// Demo mode user
const DEMO_USER = {
    uid: 'demo-user-123',
    email: 'demo@re-eat.com',
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [demoMode, setDemoMode] = useState(!isConfigured);

    useEffect(() => {
        // If Firebase is not configured, use demo mode
        if (!isConfigured || !auth) {
            console.log('Firebase not configured, using demo mode');
            setDemoMode(true);
            setLoading(false);
            return;
        }

        // Firebase is configured, use real auth
        try {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                setUser(user);
                setLoading(false);
                setDemoMode(false);
            });
            return unsubscribe;
        } catch (error) {
            console.log('Firebase auth error, falling back to demo mode:', error);
            setDemoMode(true);
            setLoading(false);
        }
    }, []);

    const signIn = async (email, password) => {
        if (demoMode) {
            // Demo mode - accept any credentials
            setUser(DEMO_USER);
            return Promise.resolve({ user: DEMO_USER });
        }
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signUp = async (email, password) => {
        if (demoMode) {
            // Demo mode - accept any credentials
            setUser(DEMO_USER);
            return Promise.resolve({ user: DEMO_USER });
        }
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signOut = async () => {
        if (demoMode) {
            setUser(null);
            return Promise.resolve();
        }
        return firebaseSignOut(auth);
    };

    const value = {
        user,
        loading,
        signIn,
        signUp,
        signOut,
        demoMode,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
