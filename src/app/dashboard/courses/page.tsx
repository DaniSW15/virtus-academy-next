"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card";
import { useAuth } from "@/contexts/auth-context";
import { redirect } from "next/navigation";
import Image from "next/image";

interface Course {
    id: string;
    title: string;
    description: string;
    level: string;
    duration: string;
    progress: number;
    image: string;
    instructor: string;
    language: string;
}

export default function CoursesPage() {
    const { user } = useAuth();

    if (!user) {
        redirect("/auth/login");
    }

    const courses: Course[] = [
        {
            id: "1",
            title: "Inglés Avanzado para Negocios",
            description: "Aprende inglés enfocado en el ambiente empresarial y profesional",
            level: "Avanzado",
            duration: "12 semanas",
            progress: 75,
            image: "/courses/business-english.jpg",
            instructor: "Sarah Johnson",
            language: "Inglés"
        },
        {
            id: "2",
            title: "Español para Principiantes",
            description: "Curso básico de español para extranjeros",
            level: "Básico",
            duration: "8 semanas",
            progress: 30,
            image: "/courses/spanish-basics.jpg",
            instructor: "María González",
            language: "Español"
        },
        {
            id: "3",
            title: "Francés Intermedio",
            description: "Mejora tu francés con situaciones de la vida real",
            level: "Intermedio",
            duration: "10 semanas",
            progress: 50,
            image: "/courses/french-intermediate.jpg",
            instructor: "Jean Dupont",
            language: "Francés"
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground">Mis Cursos</h1>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                    Explorar Cursos
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                        <div className="relative h-48 w-full">
                            <Image
                                src={course.image}
                                alt={course.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-primary">
                                    {course.language}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    {course.level}
                                </span>
                            </div>
                            <CardTitle>{course.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                {course.description}
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Progreso</span>
                                    <span className="font-medium text-foreground">{course.progress}%</span>
                                </div>
                                <div className="h-2 bg-secondary rounded-full">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all"
                                        style={{ width: `${course.progress}%` }}
                                    />
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Instructor</span>
                                    <span className="font-medium text-foreground">{course.instructor}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Duración</span>
                                    <span className="font-medium text-foreground">{course.duration}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}