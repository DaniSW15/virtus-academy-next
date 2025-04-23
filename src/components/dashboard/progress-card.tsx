"use client";

import { Card, Box, Flex, Text, Heading, Progress } from "@radix-ui/themes";
import { IconStar } from "@tabler/icons-react";
import { motion } from "framer-motion";

interface ProgressCardProps {
    title: string;
    progress: number;
    level: string;
    nextMilestone: string;
    xpNeeded: number;
}

export function ProgressCard({
    title,
    progress,
    level,
    nextMilestone,
    xpNeeded
}: ProgressCardProps) {
    return (
        <Card>
            <Box p="4">
                <Flex justify="between" align="start" mb="4">
                    <Box>
                        <Heading size="3">{title}</Heading>
                        <Text size="2" color="gray">Nivel actual: {level}</Text>
                    </Box>
                    <Flex align="center" gap="1">
                        <IconStar className="w-5 h-5 text-yellow-500 fill-current" />
                        <Text weight="medium">2,450 XP</Text>
                    </Flex>
                </Flex>

                <Box className="space-y-4">
                    <Box>
                        <Flex justify="between" mb="2">
                            <Text size="2" color="gray">Progreso hacia {nextMilestone}</Text>
                            <Text size="2" weight="medium">{progress}%</Text>
                        </Flex>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            <Progress value={progress} />
                        </motion.div>
                    </Box>

                    <Card variant="surface">
                        <Flex justify="between" align="center" p="4">
                            <Box>
                                <Text weight="medium" color="blue">¡Casi llegas!</Text>
                                <Text size="2" color="gray">Te faltan {xpNeeded} XP para el siguiente nivel</Text>
                            </Box>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Practicar
                            </motion.button>
                        </Flex>
                    </Card>

                    <Flex gap="4">
                        {[
                            { label: "Racha", value: "5 días" },
                            { label: "Precisión", value: "92%" },
                            { label: "Completado", value: "65%" }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                style={{ flex: 1 }}
                            >
                                <Card variant="surface">
                                    <Box p="3" className="text-center">
                                        <Text size="2" color="gray">{stat.label}</Text>
                                        <Text size="5" weight="bold">{stat.value}</Text>
                                    </Box>
                                </Card>
                            </motion.div>
                        ))}
                    </Flex>
                </Box>
            </Box>
        </Card>
    );
}