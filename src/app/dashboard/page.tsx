"use client";

import { ProgressCard } from "@/components/dashboard/progress-card";
import { LanguageSelector } from "@/components/dashboard/language-selector";
import { Card, Box, Flex, Text, Heading } from "@radix-ui/themes";
import { 
    IconBook2, 
    IconClock, 
    IconTrophy,
    IconFlame
} from "@tabler/icons-react";

const stats = [
    {
        label: "Lecciones completadas",
        value: "12",
        icon: IconBook2,
        color: "blue",
        trend: "+2 esta semana"
    },
    {
        label: "Tiempo de estudio",
        value: "5.2h",
        icon: IconClock,
        color: "green",
        trend: "+1.5h vs semana pasada"
    },
    {
        label: "Logros desbloqueados",
        value: "8",
        icon: IconTrophy,
        color: "yellow",
        trend: "+1 nuevo"
    },
    {
        label: "Racha actual",
        value: "5 días",
        icon: IconFlame,
        color: "red",
        trend: "¡Mantén el ritmo!"
    }
];

export default function DashboardPage() {
    return (
        <Box className="space-y-6">
            <Flex justify="between" align="center">
                <Heading size="5">
                    ¡Bienvenido de vuelta!
                </Heading>
                <LanguageSelector />
            </Flex>

            <Flex gap="4" wrap="wrap">
                {stats.map((stat, index) => (
                    <Card key={index} style={{ flex: '1', minWidth: '240px' }}>
                        <Flex align="center" gap="4">
                            <Box className={`p-3 rounded-full bg-${stat.color}-100`}>
                                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                            </Box>
                            <Box>
                                <Text size="2" color="gray">{stat.label}</Text>
                                <Heading size="4">{stat.value}</Heading>
                                <Text size="2" color="gray">{stat.trend}</Text>
                            </Box>
                        </Flex>
                    </Card>
                ))}
            </Flex>

            <Flex gap="4" direction={{ initial: 'column', sm: 'row' }}>
                <Box style={{ flex: 1 }}>
                    <ProgressCard
                        title="Progreso del curso"
                        progress={65}
                        level="Intermedio"
                        nextMilestone="Nivel 7"
                        xpNeeded={240}
                    />
                </Box>
                
                <Card style={{ flex: 1 }}>
                    <Box p="4">
                        <Heading size="4" mb="4">Próximas lecciones</Heading>
                        <Flex direction="column" gap="3">
                            <Card variant="surface">
                                <Flex justify="between" align="center">
                                    <Flex gap="3" align="center">
                                        <IconBook2 className="w-5 h-5 text-blue-600" />
                                        <Box>
                                            <Text weight="medium">Verbos irregulares</Text>
                                            <Text size="2" color="gray">Lección 7</Text>
                                        </Box>
                                    </Flex>
                                    <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        Continuar
                                    </button>
                                </Flex>
                            </Card>
                            
                            <Card variant="surface">
                                <Flex justify="between" align="center">
                                    <Flex gap="3" align="center">
                                        <IconBook2 className="w-5 h-5 text-blue-600" />
                                        <Box>
                                            <Text weight="medium">Vocabulario de viajes</Text>
                                            <Text size="2" color="gray">Lección 8</Text>
                                        </Box>
                                    </Flex>
                                    <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        Comenzar
                                    </button>
                                </Flex>
                            </Card>
                        </Flex>
                    </Box>
                </Card>
            </Flex>
        </Box>
    );
}