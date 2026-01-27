import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge, CheckCircle } from 'lucide-react';
import React from 'react'
import { cn } from '@/lib/utils';

interface AchievementsTabContentProps {
    achievements: any[]
}

const AchievementsTabContent = ({ achievements }: AchievementsTabContentProps) => {
    return (
        <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
            <CardHeader>
                <CardTitle className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                    Achievements & Badges
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-[#475569] dark:text-[#94A3B8]">
                    Complete tasks to earn badges and level up
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {achievements.map((achievement) => {
                        const Icon = achievement.icon;
                        return (
                            <div
                                key={achievement.id}
                                className={cn(
                                    "p-3 sm:p-4 rounded-lg border flex items-center gap-2 sm:gap-3",
                                    achievement.achieved
                                        ? "border-[#22C55E]/30 bg-[#22C55E]/5"
                                        : "border-[#E5E7EB] dark:border-[#1E293B] bg-transparent opacity-60"
                                )}
                            >
                                <div className={cn(
                                    "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0",
                                    achievement.achieved
                                        ? "bg-[#22C55E]/20 text-[#22C55E]"
                                        : "bg-[#E5E7EB] dark:bg-[#1E293B] text-[#94A3B8]"
                                )}>
                                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">
                                        {achievement.title}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">
                                        {achievement.description}
                                    </p>
                                </div>
                                {achievement.achieved && (
                                    <Badge className="ml-2 bg-[#22C55E] text-white text-xs">
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Earned
                                    </Badge>
                                )}
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    )
}

export default AchievementsTabContent