"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

type IconButtonProps = HTMLMotionProps<"button"> & {
    variant?: 'light' | 'dark';
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ children, variant = 'light', className, ...props }, ref) => {
        return (
            <motion.button
                ref={ref}
                className={cn(
                    "p-2 rounded-lg transition-colors",
                    variant === 'light' 
                        ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900" 
                        : "bg-gray-900 hover:bg-gray-800 text-white",
                    className
                )}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);