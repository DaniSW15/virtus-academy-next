"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/button";
import ReactCountryFlag from "react-country-flag";

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
    const [showModal, setShowModal] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
    const [isSelectingNative, setIsSelectingNative] = useState(false);

    const handleLanguageSelect = (lang: typeof languages[0]) => {
        setSelectedLanguage(lang);
        setShowModal(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800">
            {/* Header Section */}
            <div className="relative h-screen">
                <div className="absolute inset-0">
                    <Image
                        src="/images/paris-bg.jpg"
                        alt="Paris background"
                        fill
                        className="object-cover opacity-50"
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center space-y-8 pt-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                        >
                            <h1 className="text-6xl font-bold text-white">
                                Aprende
                                <br />
                                idiomas gratis
                            </h1>
                            <p className="text-xl text-white/90">
                                41 idiomas desde tu lengua materna.
                                <br />
                                En cualquier momento, desde cualquier lugar y en cualquier dispositivo.
                            </p>
                        </motion.div>

                        {/* Language Selection */}
                        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-4 mt-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-600">Hablo</label>
                                    <button
                                        onClick={() => {
                                            setIsSelectingNative(true);
                                            setShowModal(true);
                                        }}
                                        className="w-full flex items-center justify-between p-3 border rounded-lg hover:border-blue-500"
                                    >
                                        <div className="flex items-center gap-2">
                                            <ReactCountryFlag
                                                countryCode={selectedLanguage.countryCode}
                                                svg
                                                style={{
                                                    width: '24px',
                                                    height: '24px'
                                                }}
                                            />
                                            <span>{selectedLanguage.name}</span>
                                        </div>
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-600">Quiero aprender</label>
                                    <button
                                        onClick={() => {
                                            setIsSelectingNative(false);
                                            setShowModal(true);
                                        }}
                                        className="w-full flex items-center justify-between p-3 border rounded-lg hover:border-blue-500"
                                    >
                                        <div className="flex items-center gap-2">
                                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                                            </svg>
                                            <span>Seleccionar idioma</span>
                                        </div>
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full mt-4 bg-orange-500 hover:bg-orange-600"
                            >
                                Empieza a aprender
                            </Button>
                        </div>

                        {/* Awards Section */}
                        <div className="flex justify-center gap-8 mt-12">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="bg-white/10 p-4 rounded-lg"
                            >
                                <Image
                                    src="/images/awards/facebook.png"
                                    alt="App del año Facebook"
                                    width={100}
                                    height={100}
                                />
                                <p className="text-white text-sm mt-2">App del año Facebook</p>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="bg-white/10 p-4 rounded-lg"
                            >
                                <Image
                                    src="/images/awards/google-play.png"
                                    alt="Selección de editores Google Play"
                                    width={100}
                                    height={100}
                                />
                                <p className="text-white text-sm mt-2">Selección de editores</p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Devices Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white py-20"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="relative max-w-3xl mx-auto">
                        <Image
                            src="/images/devices.png"
                            alt="Dispositivos"
                            width={800}
                            height={500}
                            className="w-full h-auto"
                        />
                    </div>

                    <div className="mt-8">
                        <div className="flex items-center justify-center gap-2 text-4xl">
                            <span className="font-bold">4.7</span>
                            <div className="flex text-yellow-400">
                                {"★".repeat(5)}
                            </div>
                        </div>
                        <p className="text-gray-500 mt-2">1.000.000+ calificaciones</p>
                    </div>

                    <p className="mt-4 text-lg text-gray-600">
                        Mondly ha sido nombrada "Mejor nueva app" por Apple y está entre las
                        mejores apps de educación.
                    </p>
                </div>
            </motion.div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">
                                {isSelectingNative ? "Selecciona tu idioma" : "OFERTAS DE PRIMAVERA"}
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>

                        {isSelectingNative ? (
                            <div className="grid grid-cols-2 gap-4">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => handleLanguageSelect(lang)}
                                        className="flex items-center gap-2 p-3 border rounded-lg hover:border-blue-500"
                                    >
                                        <ReactCountryFlag
                                            countryCode={lang.countryCode}
                                            svg
                                            style={{
                                                width: '24px',
                                                height: '24px'
                                            }}
                                        />
                                        <span>{lang.name}</span>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <>
                                <p className="text-center mb-4">
                                    Obtén acceso de por vida con una compra única
                                </p>

                                <div className="flex justify-center gap-2 mb-4">
                                    {languages.map((lang) => (
                                        <ReactCountryFlag
                                            key={lang.code}
                                            countryCode={lang.countryCode}
                                            svg
                                            style={{
                                                width: '32px',
                                                height: '32px'
                                            }}
                                            className="rounded-full"
                                        />
                                    ))}
                                </div>

                                <p className="text-center text-sm mb-4">
                                    Únete a <span className="font-bold">125 millones</span> de usuarios
                                </p>

                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="w-full bg-orange-500 hover:bg-orange-600"
                                    onClick={() => setShowModal(false)}
                                >
                                    OBTENER OFERTA
                                </Button>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </div>
    );
};