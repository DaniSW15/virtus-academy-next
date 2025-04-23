"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { useAuth } from "@/contexts/auth-context";
import { redirect } from "next/navigation";
import { Box, Container } from "@radix-ui/themes";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <Box className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </Box>
        );
    }

    if (!user) {
        redirect("/auth/login");
    }

    return (
        <Box className="min-h-screen bg-gray-50">
            <Header />
            <Box className="flex">
                <Sidebar />
                <Box className="flex-1 p-6">
                    <Container>
                        {children}
                    </Container>
                </Box>
            </Box>
        </Box>
    );
}