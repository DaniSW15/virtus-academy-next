import { VerifyForm } from "@/components/auth/verify-form";

export default function VerifyPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Verificación
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Te hemos enviado un código de verificación a tu email
                    </p>
                </div>
                <VerifyForm />
            </div>
        </div>
    );
}