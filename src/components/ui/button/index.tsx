"use client";

import { motion } from "framer-motion";
import { ButtonProps } from "./button.types";
import { cn } from "@/utils/cn";

export const Button = ({
    variant = "primary",
    size = "md",
    isLoading = false,
    children,
    className,
    fullWidth,
    ...props
}: ButtonProps) => {
    const baseStyles = "rounded-lg font-semibold transition-all duration-200";

    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
        outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
        ghost: "hover:bg-gray-100 text-gray-800"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                fullWidth && "w-full",
                className
            )}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Cargando...
                </div>
            ) : (
                children
            )}
        </motion.button>
    );
};