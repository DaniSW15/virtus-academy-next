// src/lib/validators/auth.ts
import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "El email es requerido")
        .email("Email inválido"),
    password: z
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const registerSchema = z.object({
    name: z
        .string()
        .min(1, "El nombre es requerido")
        .max(50, "El nombre es muy largo"),
    email: z
        .string()
        .min(1, "El email es requerido")
        .email("Email inválido"),
    password: z
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z
        .string()
        .min(1, "Confirma tu contraseña"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

export const verifySchema = z.object({
    code: z
        .string()
        .length(6, "El código debe tener 6 dígitos")
        .regex(/^\d+$/, "El código debe contener solo números"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type VerifyFormData = z.infer<typeof verifySchema>;