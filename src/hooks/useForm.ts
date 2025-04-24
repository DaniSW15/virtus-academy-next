import { useState, useCallback } from "react";
import { z } from "zod";

interface UseFormProps<T> {
    initialValues: T;
    validationSchema: z.ZodType<T>;
    onSubmit: (values: T) => Promise<void>;
}

interface UseFormReturn<T> {
    formData: T;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    errors: Partial<Record<keyof T, string>>;
    isSubmitting: boolean;
    resetForm: () => void;
}

export function useForm<T extends Record<string, any>>({
    initialValues,
    validationSchema,
    onSubmit
}: UseFormProps<T>): UseFormReturn<T> {
    const [formData, setFormData] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Limpiar error cuando el usuario empieza a escribir
        if (errors[name as keyof T]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    }, [errors]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Validar datos con Zod
            const validatedData = validationSchema.parse(formData);
            await onSubmit(validatedData);
            setErrors({});
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Convertir errores de Zod a nuestro formato
                const formattedErrors: Partial<Record<keyof T, string>> = {};
                error.errors.forEach(err => {
                    if (err.path.length > 0) {
                        const field = err.path[0] as keyof T;
                        formattedErrors[field] = err.message;
                    }
                });
                setErrors(formattedErrors);
            } else {
                // Error inesperado
                console.error("Error en validación:", error);
            }
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, validationSchema, onSubmit]);

    const resetForm = useCallback(() => {
        setFormData(initialValues);
        setErrors({});
    }, [initialValues]);

    return {
        formData,
        handleChange,
        handleSubmit,
        errors,
        isSubmitting,
        resetForm
    };
}