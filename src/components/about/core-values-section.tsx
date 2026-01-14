import React from 'react';
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Users, Star, HandHeart, BookOpen, Zap } from "lucide-react";

const coreValues = [
    {
        icon: Lightbulb,
        title: "Innovation",
        description: "Fostering creativity and innovative thinking in technology",
        color: "#2563EB",
    },
    {
        icon: Users,
        title: "Collaboration",
        description: "Working together to achieve common goals and objectives",
        color: "#38BDF8",
    },
    {
        icon: Star,
        title: "Excellence",
        description: "Striving for the highest standards in all activities",
        color: "#F59E0B",
    },
    {
        icon: HandHeart,
        title: "Community",
        description: "Building a supportive and inclusive student community",
        color: "#22C55E",
    },
    {
        icon: BookOpen,
        title: "Learning",
        description: "Continuous knowledge sharing and skill development",
        color: "#8B5CF6",
    },
    {
        icon: Zap,
        title: "Leadership",
        description: "Developing future leaders in technology and management",
        color: "#EF4444",
    },
];

const CoreValuesSection = () => {
    return (
        <section className="py-12 px-4 sm:py-16 lg:py-24 bg-[#F8FAFC] dark:bg-[#0F172A]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className={cn(
                        "text-2xl font-bold mb-3 sm:text-3xl lg:text-5xl sm:mb-4",
                        "text-[#0F172A] dark:text-[#E5E7EB]"
                    )}>
                        Our Core Values
                    </h2>
                    <p className={cn(
                        "text-base sm:text-lg max-w-3xl mx-auto px-2",
                        "text-[#475569] dark:text-[#94A3B8]"
                    )}>
                        The principles that guide our every decision and action
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                    {coreValues.map((value, index) => (
                        <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader className="pb-3">
                                <div
                                    className="w-10 h-10 rounded-lg mb-3 flex items-center justify-center"
                                    style={{ backgroundColor: `${value.color}10` }}
                                >
                                    <value.icon className="w-5 h-5" style={{ color: value.color }} />
                                </div>
                                <CardTitle className={cn(
                                    "text-lg mb-2",
                                    "text-[#0F172A] dark:text-[#E5E7EB]"
                                )}>
                                    {value.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className={cn(
                                    "text-sm leading-relaxed",
                                    "text-[#475569] dark:text-[#94A3B8]"
                                )}>
                                    {value.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoreValuesSection;