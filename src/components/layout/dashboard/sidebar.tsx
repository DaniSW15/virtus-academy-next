"use client";

import { Sidebar as ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
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
    IconMoon,
    IconSun,
    IconCode,
    IconChevronLeft,
    IconChevronRight,
    IconUser,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/theme-context";

const navigation = [
    { name: "Vista General", href: "/dashboard", icon: IconHome },
    { name: "Transacciones", href: "/dashboard/transactions", icon: IconFileDescription },
    { name: "Tarjetas", href: "/dashboard/loyalty", icon: IconCash },
    { name: "Suscripciones", href: "/dashboard/subscriptions", icon: IconSubscript },
    { name: "Deudas", href: "/dashboard/debts", icon: IconBook },
    { name: "Información Legal", href: "/dashboard/legal", icon: IconFileDescription },
    { name: "Notificaciones", href: "/dashboard/notifications", icon: IconBell },
];

export function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const checkMobile = () => {
            const isMobileView = window.innerWidth < 1024;
            setIsMobile(isMobileView);
            setIsOpen(!isMobileView);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <>
            {/* Sidebar principal */}
            <div className={`
                ${isMobile 
                    ? `fixed inset-y-0 left-0 z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
                    : 'relative'
                }
                transition-transform duration-300 ease-in-out
                min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
            `}>
                <ProSidebar
                    collapsed={collapsed}
                    backgroundColor="transparent"
                    style={{ 
                        height: '100%',
                        border: 'none',
                        boxShadow: isMobile ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    rootStyles={{
                        color: theme === 'dark' ? '#e5e7eb' : '#374151',
                    }}
                >
                    <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
                        <h1 className={`text-xl font-bold text-gray-900 dark:text-white ${collapsed ? 'text-center' : ''}`}>
                            {!collapsed ? 'Idiomas App' : 'IA'}
                        </h1>
                        {/* Botón de colapsar para desktop */}
                        {!isMobile && (
                            <button
                                onClick={() => setCollapsed(!collapsed)}
                                className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                {collapsed ? <IconChevronRight size={20} /> : <IconChevronLeft size={20} />}
                            </button>
                        )}
                    </div>
                    
                    {/* Menú principal */}
                    <Menu 
                        className="flex-grow"
                        menuItemStyles={{
                            button: ({ level, active }) => ({
                                backgroundColor: active ? 'var(--primary-50)' : 'transparent',
                                color: active ? 'var(--primary-600)' : theme === 'dark' ? '#e5e7eb' : '#374151',
                                '&:hover': {
                                    backgroundColor: theme === 'dark' ? 'rgba(55, 65, 81, 0.5)' : 'rgba(243, 244, 246, 0.8)',
                                    color: theme === 'dark' ? '#ffffff' : '#111827',
                                },
                            }),
                        }}
                    >
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            
                            return (
                                <MenuItem
                                    key={item.name}
                                    icon={<Icon size={20} />}
                                    component={<Link href={item.href} />}
                                    active={isActive}
                                >
                                    {item.name}
                                </MenuItem>
                            );
                        })}
                    </Menu>

                    {/* Footer del Sidebar */}
                    <div className="border-t border-gray-200 dark:border-gray-800 p-4">
                        <Menu
                            menuItemStyles={{
                                button: {
                                    color: theme === 'dark' ? '#e5e7eb' : '#374151',
                                    '&:hover': {
                                        backgroundColor: theme === 'dark' ? 'rgba(55, 65, 81, 0.5)' : 'rgba(243, 244, 246, 0.8)',
                                        color: theme === 'dark' ? '#ffffff' : '#111827',
                                    },
                                },
                            }}
                        >
                            <MenuItem icon={<IconUser size={20} />}>Mi Perfil</MenuItem>
                            <MenuItem icon={<IconSettings size={20} />}>Configuración</MenuItem>
                            <MenuItem 
                                icon={theme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
                                onClick={toggleTheme}
                            >
                                {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
                            </MenuItem>
                        </Menu>
                    </div>
                </ProSidebar>
            </div>

            {/* Overlay para móvil */}
            {isMobile && isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}
            
            {/* Botón flotante para móvil */}
            {isMobile && !isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-4 right-4 p-2 bg-primary-600 text-white rounded-full shadow-lg z-50 hover:bg-primary-700"
                >
                    <IconCode size={24} />
                </button>
            )}
        </>
    );
}