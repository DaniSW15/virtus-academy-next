"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const Welcome = () => {
    return (
        <div className="min-h-screen bg-primary-600 relative overflow-hidden">
            {/* Fondo con gradiente y overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 opacity-90" />
            
            {/* Contenido principal */}
            <div className="relative z-10 container mx-auto px-4 py-12 lg:py-24">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Texto y CTA */}
                    <motion.div 
                        className="flex-1 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.h1 
                            className="text-4xl lg:text-6xl font-bold mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Aprende<br />
                            idiomas gratis
                        </motion.h1>
                        
                        <motion.p 
                            className="text-xl lg:text-2xl text-white/90 mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            41 idiomas desde tu lengua materna.<br />
                            En cualquier momento, desde cualquier lugar y en cualquier dispositivo.
                        </motion.p>

                        {/* Badges */}
                        <motion.div 
                            className="flex flex-wrap gap-6 mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                                <Image 
                                    src="/icons/facebook.svg" 
                                    alt="Facebook" 
                                    width={24} 
                                    height={24}
                                    className="w-6 h-6"
                                />
                                <span className="text-sm">App del año Facebook</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                                <Image 
                                    src="/icons/apple.svg" 
                                    alt="Apple" 
                                    width={24} 
                                    height={24}
                                    className="w-6 h-6"
                                />
                                <span className="text-sm">Apps que nos encantan Apple App Store</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                                <Image 
                                    src="/icons/google-play.svg" 
                                    alt="Google Play" 
                                    width={24} 
                                    height={24}
                                    className="w-6 h-6"
                                />
                                <span className="text-sm">Selección de los editores Google Play</span>
                            </div>
                        </motion.div>

                        {/* Botones de acción */}
                        <motion.div 
                            className="flex flex-wrap gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <Link 
                                href="/auth/register" 
                                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                            >
                                Empieza a aprender
                            </Link>
                            <Link 
                                href="/auth/login" 
                                className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                            >
                                Ya tengo cuenta
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Imagen decorativa */}
                    <motion.div 
                        className="flex-1 relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image
                            src="/images/welcome-hero.jpg"
                            alt="Estudiantes aprendiendo idiomas"
                            width={600}
                            height={600}
                            className="rounded-2xl shadow-2xl"
                        />
                        
                        {/* Decoración de fondo */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}