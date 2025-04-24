"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import * as Form from "@radix-ui/react-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { registerSchema, type RegisterFormData } from "@/lib/validators/auth";
import { useForm } from "@/hooks/useForm";
import { motion, AnimatePresence } from "framer-motion";
import { IconMail, IconLock, IconEye, IconEyeOff, IconUser, IconX, IconCheck } from "@tabler/icons-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card/card";
import { LanguageMenu } from "./language-menu";
import { Spinner } from "../ui/spinner/spinner";

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

export function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();
    const { register } = useAuth();

    const { formData, handleChange, handleSubmit, errors, isSubmitting } = useForm<RegisterFormData>({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: registerSchema,
        onSubmit: async (values) => {
            try {
                await register(values);
                setIsSuccess(true);
                setToastMessage("¡Registro exitoso! Bienvenido a Virtus Academy");
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                    router.push("/dashboard");
                }, 2000);
            } catch (error) {
                setIsSuccess(false);
                setToastMessage(error instanceof Error ? error.message : "Error al crear la cuenta");
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            }
        }
    });

    return (
        <>
            <Card className="w-full max-w-md">
                <CardContent className="mt-3">
                    <Form.Root asChild>
                        <motion.form
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            <Form.Field name="name">
                                <div className="relative">
                                    <Form.Label className="block text-sm font-medium mb-1">
                                        Nombre completo
                                    </Form.Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                            <IconUser size={20} />
                                        </span>
                                        <motion.input
                                            variants={inputVariants}
                                            whileFocus="focus"
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    {errors.name && (
                                        <Form.Message className="text-sm text-red-500 mt-1">
                                            {errors.name}
                                        </Form.Message>
                                    )}
                                </div>
                            </Form.Field>

                            <Form.Field name="email">
                                <div className="relative">
                                    <Form.Label className="block text-sm font-medium mb-1">
                                        Correo electrónico
                                    </Form.Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                            <IconMail size={20} />
                                        </span>
                                        <motion.input
                                            variants={inputVariants}
                                            whileFocus="focus"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    {errors.email && (
                                        <Form.Message className="text-sm text-red-500 mt-1">
                                            {errors.email}
                                        </Form.Message>
                                    )}
                                </div>
                            </Form.Field>

                            <Form.Field name="password">
                                <div className="relative">
                                    <Form.Label className="block text-sm font-medium mb-1">
                                        Contraseña
                                    </Form.Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                            <IconLock size={20} />
                                        </span>
                                        <motion.input
                                            variants={inputVariants}
                                            whileFocus="focus"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? (
                                                <IconEyeOff size={20} />
                                            ) : (
                                                <IconEye size={20} />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <Form.Message className="text-sm text-red-500 mt-1">
                                            {errors.password}
                                        </Form.Message>
                                    )}
                                </div>
                            </Form.Field>

                            <Form.Field name="confirmPassword">
                                <div className="relative">
                                    <Form.Label className="block text-sm font-medium mb-1">
                                        Confirmar contraseña
                                    </Form.Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                            <IconLock size={20} />
                                        </span>
                                        <motion.input
                                            variants={inputVariants}
                                            whileFocus="focus"
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showConfirmPassword ? (
                                                <IconEyeOff size={20} />
                                            ) : (
                                                <IconEye size={20} />
                                            )}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <Form.Message className="text-sm text-red-500 mt-1">
                                            {errors.confirmPassword}
                                        </Form.Message>
                                    )}
                                </div>
                            </Form.Field>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <Spinner className="mr-2" />
                                ) : null}
                                {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
                            </Button>
                        </motion.form>
                    </Form.Root>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-gray-600">
                        ¿Ya tienes una cuenta?{" "}
                        <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
                            Inicia sesión
                        </Link>
                    </p>
                </CardFooter>
            </Card>

            <AnimatePresence>
                {showToast && (
                    <motion.div 
                        className="fixed bottom-4 right-4 flex items-center gap-2 min-w-[320px] p-4 rounded-lg shadow-lg
                            bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg ${
                            isSuccess ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
                        }`}>
                            {isSuccess ? (
                                <IconCheck className="h-5 w-5" />
                            ) : (
                                <IconX className="h-5 w-5" />
                            )}
                        </div>
                        <p className="flex-1 text-sm text-gray-600 dark:text-gray-300">
                            {toastMessage}
                        </p>
                        <button 
                            onClick={() => setShowToast(false)}
                            className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                        >
                            <IconX className="h-5 w-5" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}