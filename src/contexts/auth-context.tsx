"use client";

import { createContext, useContext, useState, useEffect } from "react";
import AuthService from "@/lib/auth/auth-service";

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    verify: (code: string) => Promise<void>;
    resendCode: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const userData = await AuthService.getCurrentUser();
            setUser(userData);
            setLoading(false);
        } catch (error) {
            console.error("Error checking auth:", error);
            setLoading(false);
        }
    };

    const login = async (email: string, password: string, rememberMe = false) => {
        try {
            const { user: userData } = await AuthService.login(email, password, rememberMe);
            setUser(userData);
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    };

    const register = async (email: string, password: string, name: string) => {
        try {
            const { user: userData } = await AuthService.register(email, password, name);
            setUser(userData);
        } catch (error) {
            console.error("Error registering:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await AuthService.logout();
            setUser(null);
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    };

    const verify = async (code: string) => {
        try {
            await AuthService.verifyCode(code);
        } catch (error) {
            console.error("Error verifying code:", error);
            throw error;
        }
    };

    const resendCode = async () => {
        try {
            await AuthService.resendVerificationCode();
        } catch (error) {
            console.error("Error resending code:", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider 
            value={{ 
                user, 
                loading,
                login,
                register,
                logout,
                verify,
                resendCode
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}