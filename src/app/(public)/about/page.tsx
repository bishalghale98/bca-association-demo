"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
    GraduationCap,
    Shield,
    Users,
    Trophy,
    Target,
    Heart,
    Award,
    Calendar,
    BookOpen,
    MapPin,
    Mail,
    Phone,
    Globe,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    ChevronRight,
    Star,
    CheckCircle,
    Lightbulb,
    HandHeart,
    Zap,
    UserPlus,
    ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AboutUsPage() {

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

    const milestones = [
        { year: "2015", event: "BCA Association Founded", description: "Established with 50 founding members" },
        { year: "2017", event: "First Annual Hackathon", description: "Successfully conducted college's first hackathon" },
        { year: "2019", event: "Industry Connect Program", description: "Started partnership with tech companies" },
        { year: "2021", event: "Digital Platform Launch", description: "Launched online portal for members" },
        { year: "2023", event: "100+ Active Members", description: "Reached milestone of 100+ verified members" },
        { year: "2024", event: "International Recognition", description: "Won national level tech competition" },
    ];

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

    return (
        <div className="min-h-screen">
            {/* Hero Section - Mobile First */}
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

            {/* Mission & Vision - Stacked on Mobile */}
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

            {/* Core Values - 1 Column Mobile, 2 Tablet, 3 Desktop */}
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

            {/* Board Members - Expandable on Mobile */}
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

            {/* Timeline - Mobile Optimized */}
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

            {/* Contact Section - Mobile Optimized */}
            <section className="py-12 px-4 sm:py-16 lg:py-24">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-12">
                        <div>
                            <h2 className={cn(
                                "text-2xl font-bold mb-4 sm:text-3xl lg:text-5xl sm:mb-6",
                                "text-[#0F172A] dark:text-[#E5E7EB]"
                            )}>
                                Get in Touch
                            </h2>
                            <p className={cn(
                                "text-base mb-6 sm:text-lg sm:mb-8",
                                "text-[#475569] dark:text-[#94A3B8]"
                            )}>
                                Have questions or want to collaborate? Reach out to us through any of the following channels.
                            </p>

                            <div className="space-y-5 sm:space-y-6">
                                <div className="flex items-start space-x-3 sm:space-x-4">
                                    <div className={cn(
                                        "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                                        "sm:w-12 sm:h-12",
                                        "bg-[#2563EB]/10 dark:bg-[#2563EB]/20"
                                    )}>
                                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563EB] dark:text-[#38BDF8]" />
                                    </div>
                                    <div>
                                        <h4 className={cn(
                                            "font-bold mb-1 text-sm sm:text-base",
                                            "text-[#0F172A] dark:text-[#E5E7EB]"
                                        )}>
                                            Visit Us
                                        </h4>
                                        <p className={cn(
                                            "text-sm leading-relaxed",
                                            "text-[#475569] dark:text-[#94A3B8]"
                                        )}>
                                            Department of Computer Applications<br />
                                            MMMC College<br />
                                            City, State - 123456
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 sm:space-x-4">
                                    <div className={cn(
                                        "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                                        "sm:w-12 sm:h-12",
                                        "bg-[#38BDF8]/10 dark:bg-[#38BDF8]/20"
                                    )}>
                                        <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#38BDF8]" />
                                    </div>
                                    <div>
                                        <h4 className={cn(
                                            "font-bold mb-1 text-sm sm:text-base",
                                            "text-[#0F172A] dark:text-[#E5E7EB]"
                                        )}>
                                            Email Us
                                        </h4>
                                        <p className={cn(
                                            "text-sm leading-relaxed break-all",
                                            "text-[#475569] dark:text-[#94A3B8]"
                                        )}>
                                            bca-association@mmmc.edu<br />
                                            bca.support@mmmc.edu
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 sm:space-x-4">
                                    <div className={cn(
                                        "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                                        "sm:w-12 sm:h-12",
                                        "bg-[#22C55E]/10 dark:bg-[#22C55E]/20"
                                    )}>
                                        <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#22C55E]" />
                                    </div>
                                    <div>
                                        <h4 className={cn(
                                            "font-bold mb-1 text-sm sm:text-base",
                                            "text-[#0F172A] dark:text-[#E5E7EB]"
                                        )}>
                                            Call Us
                                        </h4>
                                        <p className={cn(
                                            "text-sm leading-relaxed",
                                            "text-[#475569] dark:text-[#94A3B8]"
                                        )}>
                                            +91 98765 43210 (President)<br />
                                            +91 87654 32109 (Secretary)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-8">
                                <h4 className={cn(
                                    "font-bold mb-4 text-sm sm:text-base",
                                    "text-[#0F172A] dark:text-[#E5E7EB]"
                                )}>
                                    Follow Us
                                </h4>
                                <div className="flex items-center gap-3">
                                    <Button variant="outline" size="icon" className="h-11 w-11 border-[#E5E7EB] dark:border-[#1E293B] hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-colors">
                                        <Facebook className="h-5 w-5" />
                                    </Button>
                                    <Button variant="outline" size="icon" className="h-11 w-11 border-[#E5E7EB] dark:border-[#1E293B] hover:bg-[#38BDF8] hover:text-white hover:border-[#38BDF8] transition-colors">
                                        <Twitter className="h-5 w-5" />
                                    </Button>
                                    <Button variant="outline" size="icon" className="h-11 w-11 border-[#E5E7EB] dark:border-[#1E293B] hover:bg-[#EC4899] hover:text-white hover:border-[#EC4899] transition-colors">
                                        <Instagram className="h-5 w-5" />
                                    </Button>
                                    <Button variant="outline" size="icon" className="h-11 w-11 border-[#E5E7EB] dark:border-[#1E293B] hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors">
                                        <Linkedin className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Join CTA - Mobile Optimized */}
                        <div className={cn(
                            "p-6 rounded-2xl sm:p-8",
                            "bg-gradient-to-br from-[#2563EB] to-[#38BDF8]",
                            "dark:from-[#1D4ED8] dark:to-[#3B82F6]"
                        )}>
                            <div className="text-center">
                                <div className={cn(
                                    "inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 sm:px-4 sm:py-2 sm:mb-6",
                                    "bg-white/20 backdrop-blur-sm"
                                )}>
                                    <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                                    <span className="text-xs sm:text-sm font-medium text-white">
                                        Become a Member
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 sm:text-2xl lg:text-3xl sm:mb-4">
                                    Ready to Join Our Community?
                                </h3>
                                <p className="text-sm text-white/90 mb-6 sm:text-base sm:mb-8 leading-relaxed">
                                    Register as a BCA Association member to access exclusive events,
                                    resources, and networking opportunities.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                                    {/* Register */}
                                    <Link href="/register" className="w-full sm:w-auto flex-1">
                                        <Button
                                            size="lg"
                                            className={cn(
                                                "w-full h-12 sm:h-14 px-4 sm:px-6",
                                                "bg-white text-[#2563EB] font-semibold",
                                                "hover:bg-white/90",
                                                "transition-all"
                                            )}
                                        >
                                            <UserPlus className="mr-2 h-5 w-5" />
                                            Register Now
                                        </Button>
                                    </Link>

                                    {/* Login */}
                                    <Link href="/login" className="w-full sm:w-auto flex-1">
                                        <Button
                                            size="lg"
                                            className={cn(
                                                "w-full h-12 sm:h-14 px-4 sm:px-6",
                                                "border-white text-white font-semibold",
                                                "hover:bg-white/10",
                                                "transition-all"
                                            )}
                                        >
                                            Member Login
                                        </Button>
                                    </Link>
                                </div>

                                <p className="text-xs text-white/80 mt-4 sm:text-sm sm:mt-6">
                                    Already registered? Login to access your dashboard and member features.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}