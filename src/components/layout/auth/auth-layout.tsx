"use client";

import Link from "next/link";
import { useTheme } from "@/contexts/theme-context";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { IconButton } from "@/components/ui/icon/icon-button";

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
    showThemeToggle?: boolean;
}

export function AuthLayout({
    children,
    title,
    description,
    showThemeToggle = true
}: AuthLayoutProps) {
    const { theme, toggleTheme } = useTheme();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <motion.div
            className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-950"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div
                className="w-full max-w-6xl bg-white dark:bg-gray-900 rounded-2xl overflow-hidden flex
                    shadow-[0_8px_30px_rgba(59,130,246,0.3)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.1)]
                    border-2 border-blue-200 dark:border-gray-800
                    hover:shadow-[0_12px_40px_rgba(59,130,246,0.4)] transition-shadow duration-300"
                variants={itemVariants}
            >
                {/* Panel izquierdo - Bienvenida */}
                <motion.div
                    className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-400 to-blue-600 p-12 flex-col justify-between relative
                        dark:from-gray-800 dark:to-gray-900"
                    variants={itemVariants}
                >
                    <div className="relative z-10">
                        <motion.h1
                            className="text-4xl font-bold text-white mb-6"
                            variants={itemVariants}
                        >
                            {title === "Iniciar Sesión" ? "¡Bienvenido de nuevo!" : "¡Únete a nosotros!"}
                        </motion.h1>
                        <motion.p
                            className="text-xl text-white/90 font-medium"
                            variants={itemVariants}
                        >
                            {title === "Iniciar Sesión"
                                ? "Inicia sesión para continuar tu aprendizaje de idiomas con los mejores profesores"
                                : "Regístrate para comenzar tu viaje de aprendizaje con los mejores profesores"}
                        </motion.p>
                    </div>

                    <motion.div
                        className="relative z-10"
                        variants={itemVariants}
                    >
                        <Link href="/" className="text-2xl font-bold text-white hover:text-white/90 transition-colors">
                            Virtus Academy
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Panel derecho - Formulario */}
                <motion.div
                    className="flex-1 p-8 lg:p-12 relative bg-white dark:bg-gray-900"
                    variants={itemVariants}
                >
                    {/* Efecto de brillo en la esquina */}
                    <div className="absolute top-0 right-0 w-32 h-32 
                        bg-blue-200/40 dark:bg-white/5 
                        rounded-full blur-3xl -z-10" />

                    {showThemeToggle && (
                        <IconButton
                            variant={theme === 'dark' ? 'light' : 'dark'}
                            onClick={toggleTheme}
                            className="absolute top-4 right-4"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {theme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
                        </IconButton>
                    )}

                    <motion.div
                        className="max-w-md mx-auto"
                        variants={itemVariants}
                    >
                        <motion.div variants={itemVariants}>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {title}
                            </h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                {description}
                            </p>
                        </motion.div>

                        <motion.div
                            className="mt-8"
                            variants={itemVariants}
                        >
                            {children}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}