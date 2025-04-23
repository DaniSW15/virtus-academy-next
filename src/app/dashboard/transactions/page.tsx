"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { useAuth } from "@/contexts/auth-context";
import { redirect } from "next/navigation";

export default function TransactionsPage() {
    const { user } = useAuth();

    if (!user) {
        redirect("/auth/login");
    }

    const transactions = [
        {
            id: "1",
            name: "Curso de Inglés Avanzado",
            amount: "$299",
            date: "2024-04-23",
            status: "completed",
            description: "Pago por curso completo"
        },
        {
            id: "2",
            name: "Curso de Español Básico",
            amount: "$199",
            date: "2024-04-22",
            status: "pending",
            description: "Pago inicial"
        },
        {
            id: "3",
            name: "Curso de Francés Intermedio",
            amount: "$249",
            date: "2024-04-21",
            status: "completed",
            description: "Pago mensual"
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground">Transacciones</h1>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                    Exportar
                </button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Historial de Transacciones</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid gap-4">
                            {transactions.map((transaction) => (
                                <div 
                                    key={transaction.id} 
                                    className="flex items-center justify-between p-4 rounded-lg border bg-card"
                                >
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-card-foreground">
                                            {transaction.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {transaction.description}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(transaction.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-medium text-card-foreground">
                                            {transaction.amount}
                                        </span>
                                        <span className={`text-sm px-2.5 py-0.5 rounded-full font-medium ${
                                            transaction.status === "completed"
                                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                        }`}>
                                            {transaction.status === "completed" ? "Completado" : "Pendiente"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}