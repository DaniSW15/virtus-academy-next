"use client";

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <ForgotPasswordForm />
            </motion.div>
        </div>
    );
}