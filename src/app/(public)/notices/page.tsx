"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Bell,
    BellRing,
    AlertCircle,
    Calendar,
    Clock,
    User,
    Download,
    Share2,
    Bookmark,
    BookmarkCheck,
    Filter,
    Search,
    Eye,
    Pin,
    FileText,
    ExternalLink,
    ChevronRight,
    CheckCircle,
    XCircle,
    Info,
    Megaphone,
    GraduationCap,
    Shield,
    Users,
    Mail,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type NoticeType = 'all' | 'important' | 'academic' | 'event' | 'general' | 'member-only';
type NoticeStatus = 'active' | 'expired' | 'draft';

interface Notice {
    id: number;
    title: string;
    description: string;
    content: string;
    date: string;
    time: string;
    author: string;
    type: 'important' | 'academic' | 'event' | 'general' | 'member-only';
    status: NoticeStatus;
    priority: 'high' | 'medium' | 'low';
    views: number;
    attachments?: string[];
    isPinned?: boolean;
    expiresAt?: string;
    isPublic: boolean;
}

export default function NoticesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [noticeType, setNoticeType] = useState<NoticeType>('all');
    const [bookmarkedNotices, setBookmarkedNotices] = useState<number[]>([1, 3, 5]);
    const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

    const notices: Notice[] = [
        {
            id: 1,
            title: "Annual BCA Association Meeting",
            description: "Important meeting for all BCA Association members to discuss upcoming events and initiatives.",
            content: "All verified members of BCA Association are requested to attend the annual meeting. Agenda includes budget review, event planning for next semester, and election of new committee members.",
            date: "Dec 15, 2024",
            time: "2:00 PM",
            author: "Association President",
            type: "important",
            status: "active",
            priority: "high",
            views: 245,
            attachments: ["Agenda.pdf", "Previous_Minutes.pdf"],
            isPinned: true,
            expiresAt: "Dec 20, 2024",
            isPublic: true,
        },
        {
            id: 2,
            title: "Mid-Semester Exam Schedule",
            description: "Schedule for mid-semester examinations for all BCA students.",
            content: "The mid-semester examinations will be conducted from January 10-20, 2025. Detailed timetable will be shared soon. Students are advised to start their preparations.",
            date: "Dec 10, 2024",
            time: "10:00 AM",
            author: "Academic Office",
            type: "academic",
            status: "active",
            priority: "high",
            views: 512,
            attachments: ["Schedule.pdf"],
            isPublic: true,
        },
        {
            id: 3,
            title: "Hackathon Registration Deadline Extended",
            description: "Last date for Annual Hackathon registration extended by 3 days.",
            content: "Due to popular demand, the registration deadline for Annual BCA Hackathon 2024 has been extended to December 18, 2024. Register now to secure your spot!",
            date: "Dec 12, 2024",
            time: "11:00 AM",
            author: "Tech Club Coordinator",
            type: "event",
            status: "active",
            priority: "medium",
            views: 189,
            isPublic: true,
        },
        {
            id: 4,
            title: "Library Maintenance",
            description: "Central library will remain closed for maintenance work.",
            content: "The central library will be closed from December 20-22, 2024 for annual maintenance. Digital resources will remain accessible through the online portal.",
            date: "Dec 8, 2024",
            time: "9:00 AM",
            author: "Library Department",
            type: "general",
            status: "active",
            priority: "medium",
            views: 156,
            isPublic: true,
        },
        {
            id: 5,
            title: "Member-Only: Exclusive Workshop Access",
            description: "Invitation for exclusive AI workshop for verified BCA Association members.",
            content: "Verified members are invited to attend an exclusive workshop on 'AI in Web Development' conducted by industry experts. Limited seats available. Register through your member dashboard.",
            date: "Dec 5, 2024",
            time: "3:00 PM",
            author: "Association Secretary",
            type: "member-only",
            status: "active",
            priority: "high",
            views: 98,
            attachments: ["Workshop_Details.pdf"],
            isPinned: true,
            isPublic: false,
        },
        {
            id: 6,
            title: "Sports Week 2024 Results",
            description: "Results and winners of BCA Department Sports Week 2024.",
            content: "Congratulations to all participants! The sports week concluded successfully. Check the attached document for winners and prize distribution details.",
            date: "Nov 30, 2024",
            time: "4:00 PM",
            author: "Sports Committee",
            type: "general",
            status: "active",
            priority: "low",
            views: 210,
            attachments: ["Results.pdf"],
            isPublic: true,
        },
        {
            id: 7,
            title: "Academic Calendar 2024-25",
            description: "Official academic calendar for the academic year 2024-25.",
            content: "The academic calendar for 2024-25 has been finalized. Important dates include semester breaks, examination schedules, and cultural events.",
            date: "Nov 25, 2024",
            time: "2:30 PM",
            author: "Academic Office",
            type: "academic",
            status: "active",
            priority: "medium",
            views: 345,
            attachments: ["Calendar.pdf"],
            isPublic: true,
        },
        {
            id: 8,
            title: "Industry Visit Registration",
            description: "Registration open for industry visit to Tech Park.",
            content: "BCA students can register for industry visit scheduled on January 15, 2025. Limited seats available. First come first serve basis.",
            date: "Nov 20, 2024",
            time: "10:00 AM",
            author: "Placement Cell",
            type: "event",
            status: "expired",
            priority: "medium",
            views: 178,
            isPublic: true,
        },
    ];

    const noticeTypes = [
        { id: 'all', label: 'All Notices', icon: Bell },
        { id: 'important', label: 'Important', icon: AlertCircle },
        { id: 'academic', label: 'Academic', icon: GraduationCap },
        { id: 'event', label: 'Event Related', icon: Calendar },
        { id: 'general', label: 'General', icon: Info },
        { id: 'member-only', label: 'Member Only', icon: Shield },
    ];

    const getTypeColor = (type: Notice['type']) => {
        switch (type) {
            case 'important': return { bg: 'bg-[#EF4444]/10', text: 'text-[#EF4444]', border: 'border-[#EF4444]/20' };
            case 'academic': return { bg: 'bg-[#2563EB]/10', text: 'text-[#2563EB]', border: 'border-[#2563EB]/20' };
            case 'event': return { bg: 'bg-[#22C55E]/10', text: 'text-[#22C55E]', border: 'border-[#22C55E]/20' };
            case 'general': return { bg: 'bg-[#F59E0B]/10', text: 'text-[#F59E0B]', border: 'border-[#F59E0B]/20' };
            case 'member-only': return { bg: 'bg-[#8B5CF6]/10', text: 'text-[#8B5CF6]', border: 'border-[#8B5CF6]/20' };
            default: return { bg: 'bg-[#94A3B8]/10', text: 'text-[#475569]', border: 'border-[#94A3B8]/20' };
        }
    };

    const getPriorityColor = (priority: Notice['priority']) => {
        switch (priority) {
            case 'high': return { bg: 'bg-[#EF4444]/10', text: 'text-[#EF4444]', icon: AlertCircle };
            case 'medium': return { bg: 'bg-[#F59E0B]/10', text: 'text-[#F59E0B]', icon: AlertCircle };
            case 'low': return { bg: 'bg-[#22C55E]/10', text: 'text-[#22C55E]', icon: CheckCircle };
            default: return { bg: 'bg-[#94A3B8]/10', text: 'text-[#475569]', icon: Info };
        }
    };

    const filteredNotices = notices.filter(notice => {
        const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notice.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesType = noticeType === 'all' || notice.type === noticeType;

        return matchesSearch && matchesType;
    });

    const pinnedNotices = notices.filter(n => n.isPinned);
    const importantNotices = notices.filter(n => n.type === 'important');
    const memberOnlyNotices = notices.filter(n => n.type === 'member-only');

    const toggleBookmark = (noticeId: number) => {
        setBookmarkedNotices(prev =>
            prev.includes(noticeId)
                ? prev.filter(id => id !== noticeId)
                : [...prev, noticeId]
        );
    };

    const openNoticeModal = (notice: Notice) => {
        setSelectedNotice(notice);
    };

    const closeNoticeModal = () => {
        setSelectedNotice(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white dark:from-[#020617] dark:to-[#0F172A]">
            {/* Hero Section - Responsive */}
            <section className="relative overflow-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/5 via-transparent to-[#38BDF8]/5"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#2563EB]/10 dark:bg-[#2563EB]/20 mb-4 sm:mb-6">
                            <BellRing className="w-3 h-3 sm:w-4 sm:h-4 text-[#2563EB] dark:text-[#38BDF8]" />
                            <span className="text-xs sm:text-sm font-medium text-[#2563EB] dark:text-[#38BDF8]">
                                BCA Association Notices
                            </span>
                        </div>
                        <h1 className={cn(
                            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6",
                            "text-[#0F172A] dark:text-[#E5E7EB]"
                        )}>
                            Stay Updated with
                            <br className="sm:hidden" />
                            <span className="text-[#2563EB] dark:text-[#3B82F6]"> Latest Notices</span>
                        </h1>
                        <p className={cn(
                            "text-base sm:text-lg md:text-xl max-w-2xl sm:max-w-3xl mx-auto mb-6 sm:mb-8",
                            "text-[#475569] dark:text-[#94A3B8]"
                        )}>
                            Important announcements, academic updates, event information, and association news.
                            Never miss any important update from BCA Association.
                        </p>
                    </div>
                </div>
            </section>

            {/* Quick Stats - Responsive Grid */}
            <section className="py-6 sm:py-8 md:py-10 lg:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                        {[
                            { label: "Total Notices", value: notices.length, icon: FileText, color: "text-[#2563EB]" },
                            { label: "Important", value: importantNotices.length, icon: AlertCircle, color: "text-[#EF4444]" },
                            { label: "Pinned", value: pinnedNotices.length, icon: Pin, color: "text-[#F59E0B]" },
                            { label: "Member Only", value: memberOnlyNotices.length, icon: Shield, color: "text-[#8B5CF6]" },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "p-3 sm:p-4 rounded-lg sm:rounded-xl text-center",
                                    "bg-white border border-[#E5E7EB]",
                                    "dark:bg-[#0F172A] dark:border-[#1E293B]"
                                )}
                            >
                                <div className={cn(
                                    "w-8 h-8 sm:w-10 sm:h-10 rounded-md sm:rounded-lg flex items-center justify-center mx-auto mb-1.5 sm:mb-2",
                                    `${stat.color}/10 dark:${stat.color}/20`
                                )}>
                                    <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
                                </div>
                                <div className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                    {stat.value}
                                </div>
                                <div className={cn(
                                    "text-xs sm:text-sm",
                                    "text-[#475569] dark:text-[#94A3B8]"
                                )}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
                    {/* Search and Filter Bar - Responsive */}
                    <div className={cn(
                        "mb-6 sm:mb-8 p-3 sm:p-4 rounded-lg sm:rounded-xl",
                        "bg-white border border-[#E5E7EB]",
                        "dark:bg-[#0F172A] dark:border-[#1E293B]"
                    )}>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#475569] dark:text-[#94A3B8]" />
                                <Input
                                    placeholder="Search notices by title or description..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 sm:pl-10 text-sm sm:text-base"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                <Select value={noticeType} onValueChange={(value) => setNoticeType(value as NoticeType)}>
                                    <SelectTrigger className="w-full sm:w-[180px] text-sm sm:text-base">
                                        <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                        <SelectValue placeholder="Filter by type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {noticeTypes.map((type) => {
                                            const Icon = type.icon;
                                            return (
                                                <SelectItem key={type.id} value={type.id} className="text-sm sm:text-base">
                                                    <div className="flex items-center gap-2">
                                                        <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                                                        {type.label}
                                                    </div>
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSearchQuery('');
                                        setNoticeType('all');
                                    }}
                                    className="text-sm sm:text-base"
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Notice Type Tabs - Responsive */}
                    <div className="mb-6 sm:mb-8 overflow-x-auto">
                        <Tabs defaultValue="all" value={noticeType} onValueChange={(value) => setNoticeType(value as NoticeType)}>
                            <TabsList className="flex-nowrap sm:flex-wrap h-auto p-1 sm:p-2">
                                {noticeTypes.map((type) => {
                                    const Icon = type.icon;
                                    return (
                                        <TabsTrigger
                                            key={type.id}
                                            value={type.id}
                                            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap"
                                        >
                                            <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                                            <span className="hidden xs:inline">{type.label}</span>
                                            <span className="xs:hidden">{type.id === 'all' ? 'All' :
                                                type.id === 'important' ? 'Imp' :
                                                    type.id === 'academic' ? 'Acad' :
                                                        type.id === 'event' ? 'Event' :
                                                            type.id === 'general' ? 'Gen' : 'Member'}</span>
                                        </TabsTrigger>
                                    );
                                })}
                            </TabsList>
                        </Tabs>
                    </div>

                    {/* Pinned Notices Section - Responsive */}
                    {pinnedNotices.length > 0 && noticeType === 'all' && (
                        <div className="mb-6 sm:mb-8">
                            <h2 className={cn(
                                "text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2",
                                "text-[#0F172A] dark:text-[#E5E7EB]"
                            )}>
                                <Pin className="w-4 h-4 sm:w-5 sm:h-5 text-[#F59E0B]" />
                                Pinned Notices
                            </h2>
                            <div className="space-y-3 sm:space-y-4">
                                {pinnedNotices.map((notice) => {
                                    const typeColor = getTypeColor(notice.type);
                                    const priorityColor = getPriorityColor(notice.priority);
                                    const PriorityIcon = priorityColor.icon;
                                    const isBookmarked = bookmarkedNotices.includes(notice.id);

                                    return (
                                        <Card key={notice.id} className={cn(
                                            "border-2 border-[#F59E0B]/30",
                                            "bg-gradient-to-r from-[#F59E0B]/5 to-transparent",
                                            "dark:border-[#F59E0B]/40 dark:from-[#F59E0B]/10"
                                        )}>
                                            <CardContent className="p-4 sm:p-6">
                                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6">
                                                    <div className="space-y-2 sm:space-y-3 flex-1">
                                                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                                            <Badge className={cn("border-0 text-xs sm:text-sm", typeColor.bg, typeColor.text)}>
                                                                {notice.type.toUpperCase()}
                                                            </Badge>
                                                            <Badge className={cn("border-0 text-xs sm:text-sm", priorityColor.bg, priorityColor.text)}>
                                                                <PriorityIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                                                                {notice.priority.toUpperCase()} PRIORITY
                                                            </Badge>
                                                            {!notice.isPublic && (
                                                                <Badge variant="outline" className="border-[#8B5CF6] text-[#8B5CF6] text-xs sm:text-sm">
                                                                    <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                                                                    Member Only
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                                            {notice.title}
                                                        </h3>
                                                        <p className="text-sm sm:text-base text-[#475569] dark:text-[#94A3B8] line-clamp-2">
                                                            {notice.description}
                                                        </p>
                                                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">
                                                            <div className="flex items-center gap-1">
                                                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                                                {notice.date}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                                                {notice.time}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <User className="w-3 h-3 sm:w-4 sm:h-4" />
                                                                {notice.author}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                                                {notice.views} views
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-row sm:flex-col gap-2 justify-end">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 sm:h-10 sm:w-10"
                                                            onClick={() => toggleBookmark(notice.id)}
                                                        >
                                                            {isBookmarked ? (
                                                                <BookmarkCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB]" />
                                                            ) : (
                                                                <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-[#475569]" />
                                                            )}
                                                        </Button>
                                                        <Button
                                                            onClick={() => openNoticeModal(notice)}
                                                            size="sm"
                                                            className="sm:w-full"
                                                        >
                                                            View Details
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* All Notices Grid - Responsive Columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                        {filteredNotices
                            .filter(notice => !notice.isPinned || noticeType !== 'all')
                            .map((notice) => {
                                const typeColor = getTypeColor(notice.type);
                                const priorityColor = getPriorityColor(notice.priority);
                                const PriorityIcon = priorityColor.icon;
                                const isBookmarked = bookmarkedNotices.includes(notice.id);

                                return (
                                    <Card key={notice.id} className={cn(
                                        "group hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 h-full flex flex-col",
                                        "border-[#E5E7EB] dark:border-[#1E293B]"
                                    )}>
                                        <CardHeader className="pb-2 sm:pb-3">
                                            <div className="flex items-center justify-between mb-2 sm:mb-3">
                                                <Badge
                                                    variant="outline"
                                                    className={cn(
                                                        "border text-xs sm:text-sm",
                                                        typeColor.border,
                                                        typeColor.text,
                                                        typeColor.bg
                                                    )}
                                                >
                                                    {notice.type.toUpperCase()}
                                                </Badge>
                                                {notice.isPinned && (
                                                    <Pin className="w-3 h-3 sm:w-4 sm:h-4 text-[#F59E0B]" />
                                                )}
                                            </div>
                                            <CardTitle className={cn(
                                                "text-base sm:text-lg font-bold group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] line-clamp-2",
                                                "text-[#0F172A] dark:text-[#E5E7EB]"
                                            )}>
                                                {notice.title}
                                            </CardTitle>
                                            <CardDescription className="line-clamp-2 text-sm sm:text-base text-[#475569] dark:text-[#94A3B8]">
                                                {notice.description}
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="flex-1 space-y-3 sm:space-y-4">
                                            {/* Notice Details */}
                                            <div className="space-y-1.5 sm:space-y-2">
                                                <div className="flex items-center justify-between text-xs sm:text-sm">
                                                    <div className="flex items-center gap-1 text-[#475569] dark:text-[#94A3B8]">
                                                        <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                                        {notice.date}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-[#475569] dark:text-[#94A3B8]">
                                                        <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                                        {notice.time}
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">
                                                    <User className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                                                    By: {notice.author}
                                                </div>
                                            </div>

                                            {/* Priority Indicator */}
                                            <div className={cn(
                                                "p-1.5 sm:p-2 rounded text-xs flex items-center gap-1.5 sm:gap-2",
                                                priorityColor.bg,
                                                priorityColor.text
                                            )}>
                                                <PriorityIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                                {notice.priority.toUpperCase()} Priority
                                            </div>

                                            {/* Member Only Badge */}
                                            {!notice.isPublic && (
                                                <Badge variant="outline" className="border-[#8B5CF6] text-[#8B5CF6] w-fit text-xs">
                                                    <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                                                    Member Only
                                                </Badge>
                                            )}

                                            {/* Attachments */}
                                            {notice.attachments && notice.attachments.length > 0 && (
                                                <div className="space-y-1">
                                                    <p className="text-xs text-[#475569] dark:text-[#94A3B8]">Attachments:</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {notice.attachments.map((file, index) => (
                                                            <Badge key={index} variant="secondary" className="text-xs">
                                                                <FileText className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                                                                <span className="truncate max-w-[80px] sm:max-w-[100px]">{file}</span>
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>

                                        <CardFooter className="pt-3 sm:pt-4 border-t border-[#E5E7EB] dark:border-[#1E293B]">
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center gap-1.5 sm:gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 sm:h-8 sm:w-8"
                                                        onClick={() => toggleBookmark(notice.id)}
                                                    >
                                                        {isBookmarked ? (
                                                            <BookmarkCheck className="w-3 h-3 sm:w-4 sm:h-4 text-[#2563EB]" />
                                                        ) : (
                                                            <Bookmark className="w-3 h-3 sm:w-4 sm:h-4 text-[#475569]" />
                                                        )}
                                                    </Button>
                                                    <div className="flex items-center gap-1 text-xs text-[#475569] dark:text-[#94A3B8]">
                                                        <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                                        {notice.views}
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="group text-xs sm:text-sm"
                                                    onClick={() => openNoticeModal(notice)}
                                                >
                                                    Read More
                                                    <ChevronRight className="ml-1 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-0.5 sm:group-hover:translate-x-1 transition-transform" />
                                                </Button>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                );
                            })}
                    </div>

                    {/* Empty State - Responsive */}
                    {filteredNotices.length === 0 && (
                        <div className={cn(
                            "py-12 sm:py-16 text-center rounded-xl",
                            "bg-white border border-[#E5E7EB]",
                            "dark:bg-[#0F172A] dark:border-[#1E293B]"
                        )}>
                            <Bell className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-[#94A3B8]" />
                            <h3 className={cn(
                                "text-lg sm:text-xl md:text-2xl font-bold mb-2",
                                "text-[#0F172A] dark:text-[#E5E7EB]"
                            )}>
                                No notices found
                            </h3>
                            <p className={cn(
                                "text-sm sm:text-base text-[#475569] dark:text-[#94A3B8] mb-3 sm:mb-4"
                            )}>
                                Try adjusting your search or filter criteria
                            </p>
                            <Button
                                onClick={() => {
                                    setSearchQuery('');
                                    setNoticeType('all');
                                }}
                                size="sm"
                                className="text-sm sm:text-base"
                            >
                                Show All Notices
                            </Button>
                        </div>
                    )}

                    {/* Member Benefits Section - Responsive */}
                    <div className={cn(
                        "mt-8 sm:mt-12 md:mt-16 p-4 sm:p-6 rounded-xl",
                        "bg-gradient-to-r from-[#2563EB] to-[#38BDF8]",
                        "dark:from-[#1D4ED8] dark:to-[#3B82F6]"
                    )}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
                            <div>
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                                    Exclusive Notices for Verified Members
                                </h3>
                                <ul className="space-y-2 sm:space-y-3">
                                    {[
                                        "Access to member-only notices and announcements",
                                        "Early notification about important updates",
                                        "Exclusive workshop and event invitations",
                                        "Priority registration for limited-seat events",
                                        "Direct communication with association committee"
                                    ].map((benefit, index) => (
                                        <li key={index} className="flex items-start text-white/90 text-sm sm:text-base">
                                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 flex-shrink-0 text-white" />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="text-center">
                                <div className="inline-flex flex-col items-center space-y-3 sm:space-y-4">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 flex items-center justify-center">
                                        <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                    </div>
                                    <p className="text-white/80 text-sm sm:text-base">
                                        Become a verified BCA Association member to access exclusive notices
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                                        <Link href="/register" className="w-full sm:w-auto">
                                            <Button className="bg-white text-[#2563EB] hover:bg-white/90 w-full sm:w-auto text-sm sm:text-base">
                                                Register Now
                                            </Button>
                                        </Link>
                                        <Link href="/login" className="w-full sm:w-auto">
                                            <Button variant="outline" className="border-white text-[#2563EB] hover:bg-white/10 w-full sm:w-auto text-sm sm:text-base">
                                                Member Login
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Notice Modal - Responsive */}
            {selectedNotice && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50">
                    <div className={cn(
                        "relative w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto",
                        "bg-white dark:bg-[#0F172A]",
                        "rounded-lg sm:rounded-xl border border-[#E5E7EB] dark:border-[#1E293B]"
                    )}>
                        <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 border-b border-[#E5E7EB] dark:border-[#1E293B] bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur">
                            <div className="flex-1 min-w-0">
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0F172A] dark:text-[#E5E7EB] truncate">
                                    {selectedNotice.title}
                                </h2>
                                <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-1">
                                    Published on {selectedNotice.date} at {selectedNotice.time}
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={closeNoticeModal}
                                className="h-8 w-8 sm:h-10 sm:w-10 ml-2 flex-shrink-0"
                            >
                                <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Button>
                        </div>

                        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                            {/* Notice Header */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <Badge className={cn(
                                    "border-0 text-xs sm:text-sm",
                                    getTypeColor(selectedNotice.type).bg,
                                    getTypeColor(selectedNotice.type).text
                                )}>
                                    {selectedNotice.type.toUpperCase()}
                                </Badge>
                                <Badge variant="outline" className={cn(
                                    "text-xs sm:text-sm",
                                    getPriorityColor(selectedNotice.priority).text,
                                )}>
                                    {getPriorityColor(selectedNotice.priority).icon({ className: "w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" })}
                                    {selectedNotice.priority.toUpperCase()} PRIORITY
                                </Badge>
                                {selectedNotice.isPinned && (
                                    <Badge variant="outline" className="border-[#F59E0B] text-[#F59E0B] text-xs sm:text-sm">
                                        <Pin className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                                        Pinned
                                    </Badge>
                                )}
                                {!selectedNotice.isPublic && (
                                    <Badge variant="outline" className="border-[#8B5CF6] text-[#8B5CF6] text-xs sm:text-sm">
                                        <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                                        Member Only
                                    </Badge>
                                )}
                            </div>

                            {/* Author Info */}
                            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-[#F8FAFC] dark:bg-[#1E293B]">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#2563EB]/10 dark:bg-[#2563EB]/20 flex items-center justify-center flex-shrink-0">
                                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB] dark:text-[#38BDF8]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB] truncate">
                                        {selectedNotice.author}
                                    </p>
                                    <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">
                                        Published this notice
                                    </p>
                                </div>
                                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] whitespace-nowrap">
                                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                    {selectedNotice.views} views
                                </div>
                            </div>

                            {/* Notice Content */}
                            <div className="space-y-2 sm:space-y-4">
                                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
                                    Notice Details
                                </h3>
                                <div className="prose prose-sm dark:prose-invert max-w-none">
                                    <p className="text-sm sm:text-base text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                                        {selectedNotice.content}
                                    </p>
                                </div>
                            </div>

                            {/* Attachments */}
                            {selectedNotice.attachments && selectedNotice.attachments.length > 0 && (
                                <div className="space-y-2 sm:space-y-3">
                                    <h3 className="text-base sm:text-lg font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
                                        Attachments
                                    </h3>
                                    <div className="grid gap-2">
                                        {selectedNotice.attachments.map((file, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-[#E5E7EB] dark:border-[#1E293B] gap-3"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#2563EB]/10 dark:bg-[#2563EB]/20 flex items-center justify-center flex-shrink-0">
                                                        <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB] dark:text-[#38BDF8]" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB] truncate">
                                                            {file}
                                                        </p>
                                                        <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
                                                            PDF Document
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button variant="outline" size="sm" className="w-full sm:w-auto mt-2 sm:mt-0">
                                                    <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                                                    Download
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Expiration Info */}
                            {selectedNotice.expiresAt && (
                                <div className="p-3 sm:p-4 rounded-lg bg-[#F59E0B]/5 border border-[#F59E0B]/20">
                                    <div className="flex items-start gap-2 sm:gap-3">
                                        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">
                                                This notice expires on {selectedNotice.expiresAt}
                                            </p>
                                            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-1">
                                                Make sure to take necessary action before the deadline
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-[#E5E7EB] dark:border-[#1E293B]">
                                <Button
                                    onClick={() => toggleBookmark(selectedNotice.id)}
                                    variant="outline"
                                    className="flex-1 text-sm sm:text-base"
                                >
                                    {bookmarkedNotices.includes(selectedNotice.id) ? (
                                        <>
                                            <BookmarkCheck className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                                            <span className="hidden xs:inline">Remove Bookmark</span>
                                            <span className="xs:hidden">Remove</span>
                                        </>
                                    ) : (
                                        <>
                                            <Bookmark className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                                            <span className="hidden xs:inline">Bookmark Notice</span>
                                            <span className="xs:hidden">Bookmark</span>
                                        </>
                                    )}
                                </Button>
                                <Button variant="outline" className="flex-1 text-sm sm:text-base">
                                    <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                                    <span className="hidden xs:inline">Share</span>
                                    <span className="xs:hidden">Share</span>
                                </Button>
                                <Link href="/contact" className="flex-1">
                                    <Button className="w-full text-sm sm:text-base">
                                        <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                                        <span className="hidden xs:inline">Contact Author</span>
                                        <span className="xs:hidden">Contact</span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}