export interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    avatar?: string;
    language?: string;
    level?: string;
    xp?: number;
    streak?: number;
    verified?: boolean;
}

export interface Language {
    code: string;
    name: string;
    flag: string;
    level?: string;
    progress?: number;
}

export interface Lesson {
    id: string;
    title: string;
    description: string;
    level: string;
    duration: number;
    xp: number;
    completed?: boolean;
    progress?: number;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt?: Date;
    progress?: number;
    xp: number;
}