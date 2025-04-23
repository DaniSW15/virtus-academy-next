"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import * as Form from "@radix-ui/react-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Spinner } from "@radix-ui/themes";
import { verifySchema, type VerifyFormData } from "@/lib/validators/auth";
import { useForm } from "@/hooks/useForm";
import { motion } from "framer-motion";
import { IconShieldCheck, IconLock, IconRefresh } from "@tabler/icons-react";
import Link from "next/link";

const inputVariants = {
    focus: { scale: 1.02, transition: { type: "spring", stiffness: 300 } },
    blur: { scale: 1 }
};

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
};

export const VerifyForm = () => {
    const { verify, resendCode } = useAuth();
    const router = useRouter();
    const [code, setCode] = useState("");
    const [isResending, setIsResending] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);
    
    const { errors, isLoading, handleSubmit } = useForm<VerifyFormData>({
        schema: verifySchema,
        onSubmit: async (data) => {
            try {
                await verify(data.code);
                router.push("/dashboard");
            } catch (error) {
                console.error("Error en verificación:", error);
                throw new Error("Error al verificar el código");
            }
        },
    });

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 6);
        setCode(value);
    };

    const handleResendCode = async () => {
        try {
            setIsResending(true);
            await resendCode();
            setResendSuccess(true);
            // Resetear el mensaje de éxito después de 5 segundos
            setTimeout(() => setResendSuccess(false), 5000);
        } catch (error) {
            console.error("Error al reenviar código:", error);
        } finally {
            setIsResending(false);
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit({ code });
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full max-w-md mx-auto"
        >
            <div className="flex flex-col items-center mb-8">
                <motion.div
                    className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                >
                    <IconShieldCheck className="w-8 h-8 text-white" />
                </motion.div>
                <motion.h1 
                    variants={itemVariants}
                    className="text-2xl font-bold text-gray-900 mb-2"
                >
                    Verifica tu cuenta
                </motion.h1>
                <motion.p 
                    variants={itemVariants}
                    className="text-gray-500 text-center"
                >
                    Hemos enviado un código de verificación a tu email.<br />
                    Por favor, ingrésalo a continuación.
                </motion.p>
            </div>

            <Form.Root onSubmit={onSubmit} className="space-y-6">
                {errors.root && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md"
                    >
                        {errors.root}
                    </motion.div>
                )}

                {resendSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md"
                    >
                        Hemos enviado un nuevo código a tu email
                    </motion.div>
                )}

                <motion.div variants={itemVariants}>
                    <Form.Field name="code">
                        <div className="flex flex-col gap-2">
                            <Form.Label className="text-sm font-medium text-gray-700">
                                Código de verificación
                            </Form.Label>
                            <div className="relative">
                                <IconLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <motion.div
                                    variants={inputVariants}
                                    whileFocus="focus"
                                    whileTap="focus"
                                >
                                    <Form.Control asChild>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            pattern="\d*"
                                            value={code}
                                            onChange={handleCodeChange}
                                            required
                                            maxLength={6}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-center tracking-[0.75em] font-mono text-2xl"
                                            placeholder="000000"
                                            disabled={isLoading}
                                            autoComplete="one-time-code"
                                        />
                                    </Form.Control>
                                </motion.div>
                            </div>
                            {errors.code && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-sm text-red-500"
                                >
                                    {errors.code}
                                </motion.p>
                            )}
                        </div>
                    </Form.Field>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-center">
                    <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={isResending}
                        className="text-sm text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <IconRefresh className={`w-4 h-4 ${isResending ? 'animate-spin' : ''}`} />
                        {isResending ? "Reenviando..." : "Reenviar código"}
                    </button>
                </motion.div>

                <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Form.Submit asChild>
                        <Button 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 h-12 text-lg font-medium rounded-md transition-all" 
                            disabled={isLoading || code.length < 6}
                        >
                            {isLoading ? (
                                <>
                                    <Spinner className="text-white" />
                                    Verificando...
                                </>
                            ) : (
                                "Verificar cuenta"
                            )}
                        </Button>
                    </Form.Submit>
                </motion.div>

                <motion.div 
                    variants={itemVariants}
                    className="text-center text-sm text-gray-600"
                >
                    <Link
                        href="/auth/login"
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        Volver al inicio de sesión
                    </Link>
                </motion.div>
            </Form.Root>
        </motion.div>
    );
};