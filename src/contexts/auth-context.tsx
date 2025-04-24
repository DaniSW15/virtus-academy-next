"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { type RegisterFormData, type LoginFormData } from "@/lib/validators/auth";

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (data: LoginFormData) => Promise<void>;
    register: (data: RegisterFormData) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = useCallback(async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            // Aquí iría la llamada a tu API de login
            // const response = await fetch("/api/auth/login", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(data),
            // });
            // const user = await response.json();
            // setUser(user);

            // Por ahora simulamos un login exitoso
            setUser({
                id: "1",
                name: "Usuario Demo",
                email: data.email
            });
        } catch (error) {
            console.error("Error en login:", error);
            throw new Error("Error al iniciar sesión");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const register = useCallback(async (data: RegisterFormData) => {
        setIsLoading(true);
        try {
            // Aquí iría la llamada a tu API de registro
            // const response = await fetch("/api/auth/register", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(data),
            // });
            // const user = await response.json();
            // setUser(user);

            // Por ahora simulamos un registro exitoso
            setUser({
                id: "1",
                name: data.name,
                email: data.email
            });
        } catch (error) {
            console.error("Error en registro:", error);
            throw new Error("Error al crear la cuenta");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        setIsLoading(true);
        try {
            // Aquí iría la llamada a tu API de logout
            // await fetch("/api/auth/logout");
            setUser(null);
        } catch (error) {
            console.error("Error en logout:", error);
            throw new Error("Error al cerrar sesión");
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
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