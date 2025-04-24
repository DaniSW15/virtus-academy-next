"use client";

import Link from "next/link";
import Image from "next/image";
import { IconLogout, IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import type { User } from "@/types";

export function Header() {
    const { user } = useAuth();
    const userWithImage = user as User;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <div className="h-16 px-4 flex items-center justify-end gap-4">
                {/* Dropdown de perfil */}
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                {(userWithImage?.image || userWithImage?.avatar) ? (
                                    <Image
                                        src={userWithImage.image || userWithImage.avatar || '/placeholder-avatar.jpg'}
                                        alt={userWithImage.name || 'Avatar del usuario'}
                                        width={32}
                                        height={32}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                        {(userWithImage?.name || 'U')[0]}
                                    </span>
                                )}
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                {userWithImage?.name || 'Usuario'}
                            </span>
                            <IconChevronDown size={16} className="text-gray-400" />
                        </div>
                    </button>

                    {/* Menú desplegable */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                            <Link
                                href="/dashboard/perfil"
                                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                Mi Perfil
                            </Link>
                            <Link
                                href="/dashboard/configuracion"
                                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                Configuración
                            </Link>
                            <hr className="my-1 border-gray-200 dark:border-gray-700" />
                            <button
                                onClick={() => {
                                    // Aquí irá la lógica de cerrar sesión
                                    console.log("Cerrar sesión");
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                            >
                                <IconLogout size={16} />
                                Cerrar Sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}