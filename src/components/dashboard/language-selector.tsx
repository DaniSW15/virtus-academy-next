"use client";

import * as Select from "@radix-ui/react-select";
import { IconChevronDown, IconLanguage } from "@tabler/icons-react";

const languages = [
    { code: "en", name: "Inglés", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Francés", flag: "🇫🇷" },
    { code: "de", name: "Alemán", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "pt", name: "Portugués", flag: "🇵🇹" },
];

export function LanguageSelector() {
    return (
        <Select.Root defaultValue="en">
            <Select.Trigger
                className="inline-flex items-center justify-between gap-2 rounded-md px-4 py-2 text-sm leading-none bg-white border border-gray-200 hover:bg-gray-50 focus:outline-none min-w-[200px]"
                aria-label="Idioma"
            >
                <div className="flex items-center gap-2">
                    <IconLanguage className="w-4 h-4" />
                    <Select.Value placeholder="Selecciona un idioma" />
                </div>
                <Select.Icon>
                    <IconChevronDown className="w-4 h-4" />
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content
                    className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200 min-w-[200px]"
                >
                    <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white text-gray-700 cursor-default">
                        <IconChevronDown className="w-4 h-4 rotate-180" />
                    </Select.ScrollUpButton>

                    <Select.Viewport className="p-1">
                        {languages.map((lang) => (
                            <Select.Item
                                key={lang.code}
                                value={lang.code}
                                className="relative flex items-center gap-2 px-6 py-2 text-sm leading-none rounded-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 focus:outline-none select-none"
                            >
                                <Select.ItemText>
                                    <div className="flex items-center gap-2">
                                        <span>{lang.flag}</span>
                                        {lang.name}
                                    </div>
                                </Select.ItemText>
                            </Select.Item>
                        ))}
                    </Select.Viewport>

                    <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white text-gray-700 cursor-default">
                        <IconChevronDown className="w-4 h-4" />
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
}