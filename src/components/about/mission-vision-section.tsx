import React from 'react';
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Trophy, CheckCircle } from "lucide-react";

const MissionVisionSection = () => {
    return (
        <section className="py-12 px-4 sm:py-16 lg:py-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-12">
                    {/* Mission Card */}
                    <Card className="border-2 border-[#2563EB]/20 dark:border-[#2563EB]/30">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className={cn(
                                    "w-10 h-10 rounded-lg flex items-center justify-center",
                                    "sm:w-12 sm:h-12",
                                    "bg-[#2563EB]/10 dark:bg-[#2563EB]/20"
                                )}>
                                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563EB] dark:text-[#38BDF8]" />
                                </div>
                                <CardTitle className={cn(
                                    "text-xl sm:text-2xl",
                                    "text-[#0F172A] dark:text-[#E5E7EB]"
                                )}>
                                    Our Mission
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className={cn(
                                "text-base sm:text-lg leading-relaxed",
                                "text-[#475569] dark:text-[#94A3B8]"
                            )}>
                                To create a dynamic platform that empowers BCA students with technical expertise,
                                leadership skills, and industry exposure, fostering innovation and preparing them
                                for successful careers in the ever-evolving technology landscape.
                            </CardDescription>
                            <div className="mt-6 space-y-3">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-[#22C55E] mt-0.5 flex-shrink-0" />
                                    <span className={cn(
                                        "text-sm",
                                        "text-[#475569] dark:text-[#94A3B8]"
                                    )}>
                                        Provide hands-on technical training and workshops
                                    </span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-[#22C55E] mt-0.5 flex-shrink-0" />
                                    <span className={cn(
                                        "text-sm",
                                        "text-[#475569] dark:text-[#94A3B8]"
                                    )}>
                                        Foster industry-academia collaboration
                                    </span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-[#22C55E] mt-0.5 flex-shrink-0" />
                                    <span className={cn(
                                        "text-sm",
                                        "text-[#475569] dark:text-[#94A3B8]"
                                    )}>
                                        Develop soft skills and leadership qualities
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Vision Card */}
                    <Card className="border-2 border-[#38BDF8]/20 dark:border-[#38BDF8]/30">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className={cn(
                                    "w-10 h-10 rounded-lg flex items-center justify-center",
                                    "sm:w-12 sm:h-12",
                                    "bg-[#38BDF8]/10 dark:bg-[#38BDF8]/20"
                                )}>
                                    <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#38BDF8]" />
                                </div>
                                <CardTitle className={cn(
                                    "text-xl sm:text-2xl",
                                    "text-[#0F172A] dark:text-[#E5E7EB]"
                                )}>
                                    Our Vision
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className={cn(
                                "text-base sm:text-lg leading-relaxed",
                                "text-[#475569] dark:text-[#94A3B8]"
                            )}>
                                To be recognized as a premier student-led association that produces
                                industry-ready IT professionals, innovators, and leaders who contribute
                                significantly to the technological advancement of society while upholding
                                strong ethical values.
                            </CardDescription>
                            <div className="mt-6 space-y-3">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-[#22C55E] mt-0.5 flex-shrink-0" />
                                    <span className={cn(
                                        "text-sm",
                                        "text-[#475569] dark:text-[#94A3B8]"
                                    )}>
                                        Create a vibrant community of tech enthusiasts
                                    </span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-[#22C55E] mt-0.5 flex-shrink-0" />
                                    <span className={cn(
                                        "text-sm",
                                        "text-[#475569] dark:text-[#94A3B8]"
                                    )}>
                                        Establish national recognition for excellence
                                    </span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-[#22C55E] mt-0.5 flex-shrink-0" />
                                    <span className={cn(
                                        "text-sm",
                                        "text-[#475569] dark:text-[#94A3B8]"
                                    )}>
                                        Bridge the gap between academia and industry
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default MissionVisionSection;