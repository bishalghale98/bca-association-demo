import React from 'react';
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

const boardMember = [
    {
        name: "John Doe",
        role: "President",
        batch: "2022-2025",
        avatar: "JD",
        responsibilities: ["Overall Management", "Strategy Planning", "External Relations"],
    },
    {
        name: "Jane Smith",
        role: "Vice President",
        batch: "2022-2025",
        avatar: "JS",
        responsibilities: ["Event Coordination", "Team Management", "Academic Support"],
    },
    {
        name: "Robert Johnson",
        role: "Secretary",
        batch: "2023-2026",
        avatar: "RJ",
        responsibilities: ["Documentation", "Communication", "Record Keeping"],
    },
    {
        name: "Sarah Williams",
        role: "Treasurer",
        batch: "2023-2026",
        avatar: "SW",
        responsibilities: ["Budget Management", "Fund Allocation", "Financial Reports"],
    },
    {
        name: "Michael Brown",
        role: "Technical Head",
        batch: "2022-2025",
        avatar: "MB",
        responsibilities: ["Tech Workshops", "Hackathons", "Technical Support"],
    },
    {
        name: "Emily Davis",
        role: "Cultural Head",
        batch: "2023-2026",
        avatar: "ED",
        responsibilities: ["Cultural Events", "Social Activities", "Team Building"],
    },
];

const BoardMembersSection = () => {
    return (
        <section className="py-12 px-4 sm:py-16 lg:py-24">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className={cn(
                        "text-2xl font-bold mb-3 sm:text-3xl lg:text-5xl sm:mb-4",
                        "text-[#0F172A] dark:text-[#E5E7EB]"
                    )}>
                        Board Members 2024-25
                    </h2>
                    <p className={cn(
                        "text-base mb-6 px-2 sm:text-lg sm:max-w-3xl sm:mx-auto sm:mb-8",
                        "text-[#475569] dark:text-[#94A3B8]"
                    )}>
                        Meet the dedicated team driving the BCA Association forward
                    </p>
                    <div className="inline-flex flex-col sm:flex-row items-center gap-2 px-3 py-2 rounded-full bg-[#2563EB]/10 dark:bg-[#2563EB]/20">
                        <Badge variant="secondary" className="bg-[#2563EB] text-white text-xs">
                            Academic Year 2024-25
                        </Badge>
                        <span className="text-xs font-medium text-[#2563EB] dark:text-[#38BDF8]">
                            Term: June 2024 - May 2025
                        </span>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-8">
                    {boardMember.map((member, index) => (
                        <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                            <CardContent className="pt-5 sm:pt-6">
                                <div className="flex flex-col items-center text-center">
                                    <Avatar className="w-20 h-20 mb-3 border-4 border-[#2563EB]/10 dark:border-[#2563EB]/20 group-hover:border-[#2563EB]/30 transition-colors sm:w-24 sm:h-24 sm:mb-4">
                                        <AvatarFallback className={cn(
                                            "text-lg font-bold sm:text-xl",
                                            "bg-[#2563EB] text-white",
                                            "dark:bg-[#3B82F6]"
                                        )}>
                                            {member.avatar}
                                        </AvatarFallback>
                                    </Avatar>
                                    <h3 className={cn(
                                        "text-lg font-bold mb-1 sm:text-xl",
                                        "text-[#0F172A] dark:text-[#E5E7EB]"
                                    )}>
                                        {member.name}
                                    </h3>
                                    <div className="flex flex-col sm:flex-row items-center gap-2 mb-3">
                                        <Badge variant="outline" className="border-[#2563EB] text-[#2563EB] dark:border-[#38BDF8] dark:text-[#38BDF8] text-xs">
                                            {member.role}
                                        </Badge>
                                        <span className="text-xs text-[#475569] dark:text-[#94A3B8]">
                                            Batch: {member.batch}
                                        </span>
                                    </div>

                                    {/* Mobile: Expandable */}
                                    <div className="w-full sm:hidden">
                                        <button
                                            className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-[#2563EB] dark:text-[#38BDF8]"
                                        >
                                            {/* Expand button removed but structure preserved */}
                                        </button>

                                        <>
                                            <Separator className="my-3" />
                                            <div className="w-full">
                                                <h4 className={cn(
                                                    "text-sm font-semibold mb-2 text-left",
                                                    "text-[#0F172A] dark:text-[#E5E7EB]"
                                                )}>
                                                    Responsibilities:
                                                </h4>
                                                <ul className="space-y-2 text-left">
                                                    {member.responsibilities.map((resp, idx) => (
                                                        <li key={idx} className="flex items-start space-x-2">
                                                            <ChevronRight className="w-4 h-4 text-[#2563EB] dark:text-[#38BDF8] mt-0.5 flex-shrink-0" />
                                                            <span className={cn(
                                                                "text-sm",
                                                                "text-[#475569] dark:text-[#94A3B8]"
                                                            )}>
                                                                {resp}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </>
                                    </div>

                                    {/* Desktop: Always visible */}
                                    <div className="hidden sm:block w-full">
                                        <Separator className="my-4" />
                                        <div className="w-full">
                                            <h4 className={cn(
                                                "text-sm font-semibold mb-3 text-left",
                                                "text-[#0F172A] dark:text-[#E5E7EB]"
                                            )}>
                                                Responsibilities:
                                            </h4>
                                            <ul className="space-y-2 text-left">
                                                {member.responsibilities.map((resp, idx) => (
                                                    <li key={idx} className="flex items-start space-x-2">
                                                        <ChevronRight className="w-4 h-4 text-[#2563EB] dark:text-[#38BDF8] mt-0.5 flex-shrink-0" />
                                                        <span className={cn(
                                                            "text-sm",
                                                            "text-[#475569] dark:text-[#94A3B8]"
                                                        )}>
                                                            {resp}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BoardMembersSection;