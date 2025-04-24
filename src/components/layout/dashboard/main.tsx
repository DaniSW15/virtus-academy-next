"use client";

interface MainProps {
    children: React.ReactNode;
}

export function Main({ children }: MainProps) {
    return (
        <main className="flex-1 overflow-y-auto">
            <div className="p-6 lg:p-8 w-full">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
                    {children}
                </div>
            </div>
        </main>
    );
}