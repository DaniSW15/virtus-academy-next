"use client";

import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Flex, Text } from "@radix-ui/themes";
import { IconChevronDown, IconCheck } from "@tabler/icons-react";
import { motion } from "framer-motion";

interface Language {
    code: string;
    name: string;
    flag: string;
}

const languages: Language[] = [
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
];

const menuVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.2
        }
    }
};

export function LanguageMenu() {
    const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <span>{selectedLanguage.flag}</span>
                    <span>{selectedLanguage.name}</span>
                    <IconChevronDown className="w-4 h-4" />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="min-w-[180px] bg-white rounded-lg p-1 shadow-lg border border-gray-200"
                    align="start"
                    sideOffset={5}
                    asChild
                >
                    <motion.div
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {languages.map((language) => (
                            <DropdownMenu.Item
                                key={language.code}
                                className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md cursor-pointer outline-none"
                                onClick={() => setSelectedLanguage(language)}
                            >
                                <Flex align="center" gap="2">
                                    <Text>{language.flag}</Text>
                                    <Text>{language.name}</Text>
                                </Flex>
                                {selectedLanguage.code === language.code && (
                                    <IconCheck className="w-4 h-4" />
                                )}
                            </DropdownMenu.Item>
                        ))}
                    </motion.div>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}