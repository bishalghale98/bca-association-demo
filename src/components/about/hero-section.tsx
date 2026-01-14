import React from 'react';
import { cn } from "@/lib/utils";
import { Shield, Users, Calendar, Award } from "lucide-react";

const HeroSection = () => {
    return (
        <section className={cn(
            "relative overflow-hidden pt-16 pb-12 px-4",
            "sm:pt-20 sm:pb-16 lg:pt-28 lg:pb-20",
            "bg-gradient-to-b from-[#2563EB]/5 via-white to-[#38BDF8]/5",
            "dark:from-[#020617] dark:via-[#0F172A] dark:to-[#1E293B]"
        )}>
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="max-w-7xl mx-auto relative">
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2563EB]/10 dark:bg-[#2563EB]/20 mb-4">
                        <Shield className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#38BDF8]" />
                        <span className="text-xs font-medium text-[#2563EB] dark:text-[#38BDF8]">
                            About BCA Association
                        </span>
                    </div>
                    <h1 className={cn(
                        "text-3xl font-bold mb-4 leading-tight",
                        "sm:text-4xl lg:text-6xl sm:mb-6",
                        "text-[#0F172A] dark:text-[#E5E7EB]"
                    )}>
                        Our Journey, Vision &<br />
                        <span className="text-[#2563EB] dark:text-[#3B82F6]">Community</span>
                    </h1>
                    <p className={cn(
                        "text-base mb-6 px-2",
                        "sm:text-lg lg:text-xl sm:max-w-3xl sm:mx-auto sm:mb-8",
                        "text-[#475569] dark:text-[#94A3B8]"
                    )}>
                        Since 2015, the BCA Association at MMMC College has been empowering students
                        to excel in technology, innovation, and leadership.
                    </p>
                    <div className="flex flex-col gap-3 mb-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
                        <div className={cn(
                            "flex items-center justify-center space-x-2 px-4 py-2.5 rounded-full",
                            "bg-white dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#1E293B]"
                        )}>
                            <Users className="w-4 h-4 text-[#2563EB] dark:text-[#38BDF8]" />
                            <span className="font-semibold text-sm text-[#0F172A] dark:text-[#E5E7EB]">150+ Members</span>
                        </div>
                        <div className={cn(
                            "flex items-center justify-center space-x-2 px-4 py-2.5 rounded-full",
                            "bg-white dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#1E293B]"
                        )}>
                            <Calendar className="w-4 h-4 text-[#2563EB] dark:text-[#38BDF8]" />
                            <span className="font-semibold text-sm text-[#0F172A] dark:text-[#E5E7EB]">50+ Events</span>
                        </div>
                        <div className={cn(
                            "flex items-center justify-center space-x-2 px-4 py-2.5 rounded-full",
                            "bg-white dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#1E293B]"
                        )}>
                            <Award className="w-4 h-4 text-[#2563EB] dark:text-[#38BDF8]" />
                            <span className="font-semibold text-sm text-[#0F172A] dark:text-[#E5E7EB]">10+ Awards</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;