import React from 'react';
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const milestones = [
    { year: "2015", event: "BCA Association Founded", description: "Established with 50 founding members" },
    { year: "2017", event: "First Annual Hackathon", description: "Successfully conducted college's first hackathon" },
    { year: "2019", event: "Industry Connect Program", description: "Started partnership with tech companies" },
    { year: "2021", event: "Digital Platform Launch", description: "Launched online portal for members" },
    { year: "2023", event: "100+ Active Members", description: "Reached milestone of 100+ verified members" },
    { year: "2024", event: "International Recognition", description: "Won national level tech competition" },
];

const TimelineSection = () => {
    return (
        <section className="py-12 px-4 sm:py-16 lg:py-24 bg-[#F8FAFC] dark:bg-[#0F172A]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className={cn(
                        "text-2xl font-bold mb-3 sm:text-3xl lg:text-5xl sm:mb-4",
                        "text-[#0F172A] dark:text-[#E5E7EB]"
                    )}>
                        Our Journey Through Time
                    </h2>
                    <p className={cn(
                        "text-base px-2 sm:text-lg max-w-3xl mx-auto",
                        "text-[#475569] dark:text-[#94A3B8]"
                    )}>
                        Key milestones that shaped the BCA Association
                    </p>
                </div>

                {/* Mobile Timeline - Left aligned */}
                <div className="relative sm:hidden">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#2563EB]/20 dark:bg-[#38BDF8]/20"></div>

                    <div className="space-y-6">
                        {milestones.map((milestone, index) => (
                            <div key={index} className="relative pl-10">
                                <div className={cn(
                                    "absolute left-2.5 top-0 w-3 h-3 rounded-full",
                                    "bg-[#2563EB] dark:bg-[#3B82F6]",
                                    "border-2 border-white dark:border-[#0F172A]"
                                )}></div>

                                <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                                    <CardContent className="p-4">
                                        <Badge className="bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] mb-2 text-xs">
                                            {milestone.year}
                                        </Badge>
                                        <h3 className={cn(
                                            "text-base font-bold mb-1",
                                            "text-[#0F172A] dark:text-[#E5E7EB]"
                                        )}>
                                            {milestone.event}
                                        </h3>
                                        <p className={cn(
                                            "text-sm",
                                            "text-[#475569] dark:text-[#94A3B8]"
                                        )}>
                                            {milestone.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop Timeline - Centered */}
                <div className="relative hidden sm:block">
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#2563EB]/20 dark:bg-[#38BDF8]/20"></div>

                    <div className="space-y-12">
                        {milestones.map((milestone, index) => (
                            <div
                                key={index}
                                className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                            >
                                <div className={cn(
                                    "absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full z-10",
                                    "bg-[#2563EB] dark:bg-[#3B82F6]",
                                    "border-4 border-white dark:border-[#0F172A]"
                                )}></div>

                                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                                    <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <Badge className="bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6]">
                                                    {milestone.year}
                                                </Badge>
                                            </div>
                                            <h3 className={cn(
                                                "text-xl font-bold mb-2",
                                                "text-[#0F172A] dark:text-[#E5E7EB]"
                                            )}>
                                                {milestone.event}
                                            </h3>
                                            <p className={cn(
                                                "text-[#475569] dark:text-[#94A3B8]"
                                            )}>
                                                {milestone.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TimelineSection;