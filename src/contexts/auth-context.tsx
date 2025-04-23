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
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const mockUser = {
            id: "1",
            name: "Usuario Prueba",
            email: "test@test.com",
            role: "admin"
        };
        setUser(mockUser);
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const mockUser = {
                id: "1",
                name: "Usuario Prueba",
                email: email,
                role: "admin"
            };
            setUser(mockUser);
        } catch (error) {
            console.error("Error en login:", error);
            throw new Error("Error en la autenticación");
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const mockUser = {
                id: "1",
                name: name,
                email: email,
                role: "admin"
            };
            setUser(mockUser);
        } catch (error) {
            console.error("Error en registro:", error);
            throw new Error("Error al crear la cuenta");
        }
    };

    const logout = async () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
}