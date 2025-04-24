"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    IconHome,
    IconBook,
    IconCash,
    IconSubscript,
    IconSettings,
    IconFileDescription,
    IconBell,
    IconSun,
    IconMoon,
    IconCode,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/theme-context";

const navigation = [
    { name: "Overview", href: "/dashboard", icon: IconHome },
    { name: "Transactions", href: "/dashboard/transactions", icon: IconFileDescription },
    { name: "Loyalty Cards", href: "/dashboard/loyalty", icon: IconCash },
    { name: "Subscriptions", href: "/dashboard/subscriptions", icon: IconSubscript },
    { name: "Debts", href: "/dashboard/debts", icon: IconBook },
    { name: "Legal information", href: "/dashboard/legal", icon: IconFileDescription },
    { name: "Notifications", href: "/dashboard/notifications", icon: IconBell },
    { name: "Setting", href: "/dashboard/settings", icon: IconSettings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1300);
            setIsOpen(window.innerWidth >= 1300);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <>
            {/* Botón flotante para abrir en móvil */}
            {isMobile && !isOpen && (
                <button
                    className="fixed top-4 left-4 z-50 p-2 rounded-md text-gray-400 hover:bg-gray-100 bg-white dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    onClick={() => setIsOpen(true)}
                    aria-label="Abrir menú"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="h-6 w-6"
                    >
                        <path d="M4 6l16 0"></path>
                        <path d="M4 12l16 0"></path>
                        <path d="M4 18l16 0"></path>
                    </svg>
                </button>
            )}

            {/* Overlay para móvil */}
            {isMobile && isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 h-full z-50
                transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                transition-all duration-300 ease-in-out
                w-64 
                ${!isMobile ? 'translate-x-0 static' : ''}
                bg-black dark:bg-gray-900 text-white
            `}>
                <div className="h-full flex flex-col">
                    {/* Header del sidebar */}
                    <div className="flex flex-col border-b border-gray-800">
                        <div className="flex items-center justify-between h-16 px-4">
                            <Link href="/dashboard" className="flex items-center gap-3">
                                <span className={`text-xl font-semibold ${isMobile ? 'hidden' : 'block'}`}>Virtus Academy</span>
                            </Link>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="lg:hidden p-2 rounded-md text-gray-400 hover:bg-gray-800"
                                aria-label="Cerrar menú"
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="24" 
                                    height="24" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    className="h-6 w-6"
                                >
                                    <path d="M18 6L6 18"></path>
                                    <path d="M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Navegación */}
                    <nav className="flex-1 overflow-y-auto py-6">
                        <div className="px-4 space-y-1">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`
                                            flex items-center gap-3 px-3 py-2 rounded-lg
                                            ${isActive 
                                                ? 'bg-gray-800 text-white' 
                                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                            }
                                        `}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>

                    {/* Footer con botones de tema y código fuente */}
                    <div className="p-4 border-t border-gray-800">
                        <div className="flex items-center justify-between gap-4">
                            <button
                                onClick={toggleTheme}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white"
                            >
                                {theme === 'light' ? (
                                    <>
                                        <IconMoon className="w-5 h-5" />
                                        <span>Modo oscuro</span>
                                    </>
                                ) : (
                                    <>
                                        <IconSun className="w-5 h-5" />
                                        <span>Modo claro</span>
                                    </>
                                )}
                            </button>
                            <a
                                href="https://github.com/tu-usuario/tu-repo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white"
                            >
                                <IconCode className="w-5 h-5" />
                                <span>Código</span>
                            </a>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}