"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Box, Flex, Text } from "@radix-ui/themes";
import { 
    IconHome, 
    IconBook2, 
    IconTrophy,
    IconSettings,
    IconLanguage,
    IconChartBar
} from "@tabler/icons-react";

const menuItems = [
    { href: "/dashboard", icon: IconHome, label: "Inicio" },
    { href: "/dashboard/lessons", icon: IconBook2, label: "Lecciones" },
    { href: "/dashboard/practice", icon: IconLanguage, label: "Práctica" },
    { href: "/dashboard/achievements", icon: IconTrophy, label: "Logros" },
    { href: "/dashboard/stats", icon: IconChartBar, label: "Estadísticas" },
    { href: "/dashboard/settings", icon: IconSettings, label: "Configuración" },
];

const sidebarVariants = {
    hidden: { x: -250 },
    visible: {
        x: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.2 }
    }
};

export function Sidebar() {
    const pathname = usePathname();

    return (
        <motion.aside
            initial="hidden"
            animate="visible"
            variants={sidebarVariants}
            className="w-64 min-h-screen bg-white border-r border-gray-200"
        >
            <Box p="6">
                <Flex align="center" gap="2" mb="6">
                    <IconLanguage className="w-8 h-8 text-blue-600" />
                    <Text size="5" weight="bold">Idiomas App</Text>
                </Flex>

                <Flex direction="column" gap="1">
                    {menuItems.map((item, index) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={item.href}
                                variants={itemVariants}
                                custom={index}
                                whileHover={{ x: 5 }}
                            >
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                        isActive
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {item.label}
                                </Link>
                            </motion.div>
                        );
                    })}
                </Flex>
            </Box>
        </motion.aside>
    );
}