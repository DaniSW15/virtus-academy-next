"use client";

import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <Theme>
                <AuthProvider>{children}</AuthProvider>
            </Theme>
        </ThemeProvider>
    );
}