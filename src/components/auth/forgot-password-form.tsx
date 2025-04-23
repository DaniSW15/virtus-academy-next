"use client";

import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { IconMail } from "@tabler/icons-react";
import Link from "next/link";
import { LanguageMenu } from "./language-menu";
import { Spinner } from "../ui/spinner/spinner";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card/card";

const forgotPasswordSchema = z.object({
    email: z.string().email("Ingresa un email válido"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

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

export function ForgotPasswordForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const result = forgotPasswordSchema.parse({ email });
            // Aquí iría la lógica para enviar el email de recuperación
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulación
            setSuccess(true);
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError(err.errors[0].message);
            } else {
                setError("Ocurrió un error al procesar tu solicitud");
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg"
            >
                <div className="text-center">
                    <motion.div
                        className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                    >
                        <IconMail className="h-6 w-6 text-green-600" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Revisa tu email</h2>
                    <p className="text-gray-600 mb-4">
                        Hemos enviado las instrucciones para recuperar tu contraseña a {email}
                    </p>
                    <Link href="/auth/login">
                        <Button variant="outline" className="mt-4">
                            Volver al inicio de sesión
                        </Button>
                    </Link>
                </div>
            </motion.div>
        );
    }

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
                        <CardTitle>Recuperar contraseña</CardTitle>
                        <LanguageMenu />
                    </div>
                    <CardDescription>
                        Ingresa tu email para recuperar tu contraseña
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form.Root onSubmit={handleSubmit} className="space-y-6">
                        <motion.div variants={itemVariants}>
                            <Form.Field name="email">
                                <div className="flex items-center justify-between">
                                    <Form.Label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </Form.Label>
                                </div>
                                <Form.Control asChild>
                                    <motion.div
                                        variants={inputVariants}
                                        whileFocus="focus"
                                        whileHover="focus"
                                        className="relative"
                                    >
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                                            placeholder="tu@email.com"
                                        />
                                        <IconMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    </motion.div>
                                </Form.Control>
                                {error && (
                                    <Form.Message className="text-sm text-red-500 mt-1">
                                        {error}
                                    </Form.Message>
                                )}
                            </Form.Field>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Form.Submit asChild>
                                <Button 
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 h-12 text-lg font-medium rounded-md transition-all" 
                                    disabled={isLoading}
                                >
                                    <Spinner loading={isLoading}>
                                        Enviar instrucciones
                                    </Spinner>
                                </Button>
                            </Form.Submit>
                        </motion.div>
                    </Form.Root>
                </CardContent>
                <CardFooter>
                    <div className="text-center text-sm text-gray-600 w-full">
                        <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Volver al inicio de sesión
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    );
}