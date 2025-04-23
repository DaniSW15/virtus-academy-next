"use client";

import { Header } from "@/components/layout/dashboard/header";
import { Footer } from "@/components/layout/dashboard/footer";
import { Sidebar } from "@/components/layout/dashboard/sidebar";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@/contexts/theme-context";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const { theme } = useTheme();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-950' : 'bg-gray-100'}`}>
            <Header />
            <div className="flex h-[calc(100vh-4rem)]">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-8 lg:ml-64">
                    <div className="mx-auto max-w-7xl">
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}