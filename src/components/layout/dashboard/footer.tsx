"use client";

export function Footer() {
    return (
        <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="py-4 px-6">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        2024 Virtus Academy. Todos los derechos reservados.
                    </p>
                    <div className="flex items-center space-x-4">
                        <a 
                            href="#" 
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary"
                        >
                            Términos y Condiciones
                        </a>
                        <a 
                            href="#" 
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary"
                        >
                            Política de Privacidad
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}