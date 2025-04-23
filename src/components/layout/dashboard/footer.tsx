"use client";

export function Footer() {
    return (
        <footer className="h-16 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="h-full px-4 flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    2024 Virtus Academy. Todos los derechos reservados.
                </p>
                <div className="flex items-center gap-4">
                    <a
                        href="#"
                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                        Términos
                    </a>
                    <a
                        href="#"
                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                        Privacidad
                    </a>
                </div>
            </div>
        </footer>
    );
}