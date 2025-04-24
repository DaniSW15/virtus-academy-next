"use client";

import { Sidebar } from "@/components/layout/dashboard/sidebar";
import { Header } from "@/components/layout/dashboard/header";
import { Main } from "@/components/layout/dashboard/main";
import { Footer } from "@/components/layout/dashboard/footer";
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
            <div className="flex min-h-screen">
                <aside className="flex-shrink-0">
                    <Sidebar />
                </aside>

                <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                    <Header />
                    <Main>{children}</Main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}