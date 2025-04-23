"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import ReactCountryFlag from "react-country-flag";
import Link from "next/link";

const languages = [
    { code: "es", name: "Español", countryCode: "ES" },
    { code: "en", name: "English", countryCode: "GB" },
    { code: "fr", name: "Français", countryCode: "FR" },
    { code: "de", name: "Deutsch", countryCode: "DE" },
    { code: "it", name: "Italiano", countryCode: "IT" },
    { code: "pt", name: "Português", countryCode: "PT" },
    { code: "ru", name: "Русский", countryCode: "RU" },
    { code: "ko", name: "한국어", countryCode: "KR" },
    { code: "cn", name: "中文", countryCode: "CN" },
    { code: "jp", name: "日本語", countryCode: "JP" },
];

export const Welcome = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
            <nav className="absolute top-0 left-0 right-0 p-4">
                <div className="max-w-7xl mx-auto flex items-center justify-end gap-4">
                    <Link href="/auth/login">
                        <Button variant="ghost" className="text-white hover:bg-white/10">
                            Iniciar sesión
                        </Button>
                    </Link>
                    <Link href="/auth/register">
                        <Button className="bg-white text-blue-600 hover:bg-white/90">
                            Registrarse
                        </Button>
                    </Link>
                </div>
            </nav>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center text-white mb-12"
            >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Aprende idiomas de forma divertida
                </h1>
                <p className="text-xl md:text-2xl opacity-90">
                    Comienza tu viaje de aprendizaje hoy mismo
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-lg p-8 shadow-xl w-full max-w-md"
            >
                <div className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Bienvenido a Idiomas App
                        </h2>
                        <p className="text-gray-600">
                            Selecciona tu idioma para comenzar
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {languages.slice(0, 6).map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => setSelectedLanguage(lang)}
                                className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                                    selectedLanguage.code === lang.code
                                        ? "border-blue-500 bg-blue-50 text-blue-700"
                                        : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                                }`}
                            >
                                <ReactCountryFlag
                                    countryCode={lang.countryCode}
                                    svg
                                    className="w-5 h-5"
                                />
                                <span className="font-medium">{lang.name}</span>
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4 pt-6">
                        <Link href="/auth/login" className="w-full">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                Iniciar sesión
                            </Button>
                        </Link>
                        <Link href="/auth/register" className="w-full">
                            <Button variant="outline" className="w-full">
                                Crear cuenta
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};