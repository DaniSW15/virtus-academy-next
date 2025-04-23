// src/hooks/useForm.ts
import { useState } from "react";
import { z } from "zod";

interface UseFormProps<T> {
    schema: z.ZodType<T>;
    onSubmit: (data: T) => Promise<void>;
}

export function useForm<T>({ schema, onSubmit }: UseFormProps<T>) {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = async (data: unknown) => {
        try {
            await schema.parseAsync(data);
            setErrors({});
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const formattedErrors: Record<string, string> = {};
                error.errors.forEach((err) => {
                    if (err.path) {
                        formattedErrors[err.path.join(".")] = err.message;
                    }
                });
                setErrors(formattedErrors);
            }
            return false;
        }
    };

    const handleSubmit = async (data: unknown) => {
        setIsLoading(true);

        try {
            const isValid = await validate(data);
            if (isValid) {
                await onSubmit(data as T);
            }
        } catch (error) {
            console.error("Form submission error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        errors,
        isLoading,
        handleSubmit,
        validate,
    };
}