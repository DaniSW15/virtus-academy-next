// src/app/auth/register/page.tsx
"use client";

import { AuthLayout } from "@/components/layout/auth/auth-layout";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
    return (
        <AuthLayout
            title="Crear Cuenta"
            description="Regístrate para comenzar a aprender"
        >
            <RegisterForm />
        </AuthLayout>
    );
}