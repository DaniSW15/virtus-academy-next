"use client";

import { useAuth } from "@/contexts/auth-context";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Box, Flex, Text, Avatar } from "@radix-ui/themes";
import { IconBell, IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import type { User } from "@/types";

export function Header() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const currentUser = user as User | null;

    const handleLogout = async () => {
        try {
            await logout();
            router.push("/auth/login");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    return (
        <Box className="bg-white border-b border-gray-200">
            <Flex align="center" justify="between" p="4" style={{ height: '64px' }}>
                <Flex align="center" gap="4">
                    <Text size="5" weight="bold">Dashboard</Text>
                </Flex>

                <Flex align="center" gap="4">
                    <button className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-colors">
                        <IconBell className="w-5 h-5" />
                    </button>

                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <button className="focus:outline-none">
                                <Avatar
                                    src={currentUser?.avatar}
                                    fallback={getInitials(currentUser?.name || "Usuario")}
                                    size="2"
                                    className="cursor-pointer"
                                />
                            </button>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Portal>
                            <DropdownMenu.Content
                                className="min-w-[220px] bg-white rounded-md p-1 shadow-lg border border-gray-200"
                                align="end"
                            >
                                <DropdownMenu.Label className="px-2 py-2 text-sm text-gray-500">
                                    Mi cuenta
                                </DropdownMenu.Label>
                                <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
                                
                                <DropdownMenu.Item className="flex items-center gap-2 px-2 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-sm cursor-pointer outline-none">
                                    <IconUser className="w-4 h-4" />
                                    <span>Perfil</span>
                                </DropdownMenu.Item>
                                
                                <DropdownMenu.Item className="flex items-center gap-2 px-2 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-sm cursor-pointer outline-none">
                                    <IconSettings className="w-4 h-4" />
                                    <span>Configuración</span>
                                </DropdownMenu.Item>
                                
                                <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
                                
                                <DropdownMenu.Item 
                                    className="flex items-center gap-2 px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-sm cursor-pointer outline-none"
                                    onClick={handleLogout}
                                >
                                    <IconLogout className="w-4 h-4" />
                                    <span>Cerrar sesión</span>
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                </Flex>
            </Flex>
        </Box>
    );
}