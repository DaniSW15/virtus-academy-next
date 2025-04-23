"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card/card";
import { IconBook, IconUsers, IconCash, IconChartBar } from "@tabler/icons-react";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-foreground">Panel de Control</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                                <IconUsers className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">1.4k</p>
                                <p className="text-sm text-muted-foreground">+10% desde el mes pasado</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Cursos Activos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                                <IconBook className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">14</p>
                                <p className="text-sm text-muted-foreground">3 nuevos esta semana</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Ingresos Mensuales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                                <IconCash className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">$32.4k</p>
                                <p className="text-sm text-muted-foreground">+20.1% desde el mes pasado</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Tasa de Conversión</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                                <IconChartBar className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">24.8%</p>
                                <p className="text-sm text-muted-foreground">+4.3% desde el mes pasado</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Últimos Estudiantes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Lista de estudiantes recientes */}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Actividad Reciente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Timeline de actividad */}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}