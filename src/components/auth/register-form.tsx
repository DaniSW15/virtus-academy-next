"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import * as Form from "@radix-ui/react-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Spinner } from "@radix-ui/themes";
import { registerSchema, type RegisterFormData } from "@/lib/validators/auth";
import { useForm } from "@/hooks/useForm";
import { motion } from "framer-motion";
import { IconUser, IconMail, IconLock, IconEye, IconEyeOff } from "@tabler/icons-react";
import Link from "next/link";
import { LanguageMenu } from "./language-menu";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card/card";

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

export const RegisterForm = () => {
    const { register } = useAuth();
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const { errors, isLoading, handleSubmit } = useForm<RegisterFormData>({
        schema: registerSchema,
        onSubmit: async (data) => {
            try {
                await register(data.name, data.email, data.password);
                router.push("/verify");
            } catch (error) {
                console.error("Error en registro:", error);
                throw new Error("Error al crear la cuenta");
            }
        },
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit({ name, email, password, confirmPassword });
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full max-w-md mx-auto"
        >
            <motion.h1 
                variants={itemVariants}
                className="text-3xl font-bold text-center text-white mb-6"
            >
                Virtus Academy
            </motion.h1>
            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Crear cuenta</CardTitle>
                        <LanguageMenu />
                    </div>
                    <CardDescription>
                        Ingresa tus datos para crear una nueva cuenta
                    </CardDescription>
                </CardHeader>
                <CardContent>
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

                        <motion.div variants={itemVariants}>
                            <Form.Field name="name">
                                <div className="flex flex-col gap-2">
                                    <Form.Label className="text-sm font-medium text-gray-700">
                                        Nombre
                                    </Form.Label>
                                    <div className="relative">
                                        <IconUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <motion.div
                                            variants={inputVariants}
                                            whileFocus="focus"
                                            whileTap="focus"
                                        >
                                            <Form.Control asChild>
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                    placeholder="Tu nombre"
                                                    disabled={isLoading}
                                                />
                                            </Form.Control>
                                        </motion.div>
                                    </div>
                                    {errors.name && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-sm text-red-500"
                                        >
                                            {errors.name}
                                        </motion.p>
                                    )}
                                </div>
                            </Form.Field>
                        </motion.div>
                        
                        <motion.div variants={itemVariants}>
                            <Form.Field name="email">
                                <div className="flex flex-col gap-2">
                                    <Form.Label className="text-sm font-medium text-gray-700">
                                        Email
                                    </Form.Label>
                                    <div className="relative">
                                        <IconMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <motion.div
                                            variants={inputVariants}
                                            whileFocus="focus"
                                            whileTap="focus"
                                        >
                                            <Form.Control asChild>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                    placeholder="tu@email.com"
                                                    disabled={isLoading}
                                                />
                                            </Form.Control>
                                        </motion.div>
                                    </div>
                                    {errors.email && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-sm text-red-500"
                                        >
                                            {errors.email}
                                        </motion.p>
                                    )}
                                </div>
                            </Form.Field>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Form.Field name="password">
                                <div className="flex flex-col gap-2">
                                    <Form.Label className="text-sm font-medium text-gray-700">
                                        Contraseña
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
                                                    type={showPassword ? "text" : "password"}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                    placeholder="********"
                                                    disabled={isLoading}
                                                />
                                            </Form.Control>
                                        </motion.div>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                        >
                                            {showPassword ? (
                                                <IconEyeOff className="w-5 h-5" />
                                            ) : (
                                                <IconEye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-sm text-red-500"
                                        >
                                            {errors.password}
                                        </motion.p>
                                    )}
                                </div>
                            </Form.Field>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Form.Field name="confirmPassword">
                                <div className="flex flex-col gap-2">
                                    <Form.Label className="text-sm font-medium text-gray-700">
                                        Confirmar Contraseña
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
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    required
                                                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                    placeholder="********"
                                                    disabled={isLoading}
                                                />
                                            </Form.Control>
                                        </motion.div>
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                        >
                                            {showConfirmPassword ? (
                                                <IconEyeOff className="w-5 h-5" />
                                            ) : (
                                                <IconEye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-sm text-red-500"
                                        >
                                            {errors.confirmPassword}
                                        </motion.p>
                                    )}
                                </div>
                            </Form.Field>
                        </motion.div>

                        <motion.div 
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Form.Submit asChild>
                                <Button 
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 h-12 text-lg font-medium rounded-md transition-all" 
                                    disabled={isLoading}
                                >
                                    <Spinner loading={isLoading}>
                                        Crear cuenta
                                    </Spinner>
                                </Button>
                            </Form.Submit>
                        </motion.div>
                    </Form.Root>
                </CardContent>
                <CardFooter>
                    <div className="text-center text-sm text-gray-600 w-full">
                        ¿Ya tienes una cuenta?{" "}
                        <Link
                            href="/auth/login"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Inicia sesión
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    );
};