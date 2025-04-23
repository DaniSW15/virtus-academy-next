"use client";

import { useAuth } from "@/contexts/auth-context";
import { IconBell } from "@tabler/icons-react";
import Image from "next/image";
import type { User } from "@/types";

export function Header() {
    const { user } = useAuth();
    const userWithImage = user as User;

    return (
        <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="h-full px-4 flex items-center justify-between">
                <div className="flex items-center">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Dashboard
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <IconBell className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="flex flex-col text-right">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {userWithImage?.name || 'Usuario'}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {userWithImage?.email || 'usuario@email.com'}
                            </span>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            {(userWithImage?.image || userWithImage?.avatar) ? (
                                <Image
                                    src={userWithImage.image || userWithImage.avatar || ''}
                                    alt={userWithImage.name || 'Usuario'}
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                            ) : (
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    {(userWithImage?.name || 'U')[0]}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}