"use client";

import { AuthLayout } from "@/components/layout/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
    return (
        <AuthLayout
            title="Iniciar Sesión"
            description="Ingresa a tu cuenta para continuar"
        >
            <LoginForm />
        </AuthLayout>
    );
}