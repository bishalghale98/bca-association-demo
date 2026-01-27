"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Calendar,
    MapPin,
    Users,
    Clock,
    Search,
    Filter,
    CalendarDays,
    Trophy,
    BookOpen,
    Microscope,
    Code,
    Star,
    Shield,
    CheckCircle,
    XCircle,
    AlertCircle,
    ChevronRight,
    CalendarClock,
    Download,
    Bookmark,
    BookmarkCheck,
    Percent,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type EventType = 'all' | 'upcoming' | 'past' | 'technical' | 'workshop' | 'seminar' | 'competition';

interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    venue: string;
    type: 'technical' | 'workshop' | 'seminar' | 'competition' | 'cultural';
    status?: 'ongoing' | 'completed' | 'cancelled' | string;
    registeredUsers: number;
    maxCapacity: number;
    organizer: string;
    imageUrl?: string;
    isRegistered?: boolean;
    isFeatured?: boolean;
    hasCertificate?: boolean;
    resources?: string[];
}

export default function EventsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [eventType, setEventType] = useState<EventType>('all');
    const [bookmarkedEvents, setBookmarkedEvents] = useState<number[]>([1, 3]);

    const events: Event[] = [
        {
            id: 1,
            title: "Annual BCA Hackathon 2024",
            description: "24-hour coding competition for BCA students. Solve real-world problems with innovative solutions.",
            date: "Dec 15-16, 2024",
            time: "9:00 AM - 9:00 AM",
            venue: "Computer Lab, Block B",
            type: "technical",
            status: "upcoming",
            registeredUsers: 45,
            maxCapacity: 60,
            organizer: "BCA Tech Club",
            isFeatured: true,
            hasCertificate: true,
        },
        {
            id: 2,
            title: "Industry Workshop: AI & Machine Learning",
            description: "Hands-on workshop on AI/ML concepts with industry experts from leading tech companies.",
            date: "Nov 30, 2024",
            time: "10:00 AM - 4:00 PM",
            venue: "Seminar Hall, Main Building",
            type: "workshop",
            status: "upcoming",
            registeredUsers: 85,
            maxCapacity: 100,
            organizer: "Association with Google Developers",
            isRegistered: true,
            hasCertificate: true,
        },
        {
            id: 3,
            title: "Guest Lecture: Cybersecurity Trends",
            description: "Learn about latest cybersecurity threats and prevention techniques from industry professionals.",
            date: "Oct 25, 2024",
            time: "2:00 PM - 4:00 PM",
            venue: "Auditorium",
            type: "seminar",
            status: "completed",
            registeredUsers: 120,
            maxCapacity: 150,
            organizer: "Cyber Security Department",
            resources: ["Slides.pdf", "Recording.mp4"],
        },
        {
            id: 4,
            title: "Coding Competition: CodeRush",
            description: "Intra-college coding competition with exciting prizes and recognition.",
            date: "Sep 18, 2024",
            time: "10:00 AM - 2:00 PM",
            venue: "Computer Lab, Block A",
            type: "competition",
            status: "completed",
            registeredUsers: 75,
            maxCapacity: 80,
            organizer: "Programming Club",
            hasCertificate: true,
        },
        {
            id: 5,
            title: "Web Development Bootcamp",
            description: "Comprehensive web development training covering HTML, CSS, JavaScript, and React.",
            date: "Jan 15-20, 2024",
            time: "9:00 AM - 5:00 PM",
            venue: "Computer Lab, Block C",
            type: "workshop",
            status: "completed",
            registeredUsers: 60,
            maxCapacity: 60,
            organizer: "Web Dev Community",
            resources: ["Materials.zip", "Projects.zip"],
        },
        {
            id: 6,
            title: "Data Science Symposium",
            description: "Exploring data science applications and career opportunities in modern industry.",
            date: "Feb 28, 2024",
            time: "11:00 AM - 3:00 PM",
            venue: "Conference Room",
            type: "seminar",
            status: "completed",
            registeredUsers: 95,
            maxCapacity: 100,
            organizer: "Data Science Club",
        },
        {
            id: 7,
            title: "Blockchain Workshop",
            description: "Introduction to blockchain technology and cryptocurrency fundamentals.",
            date: "Mar 10, 2024",
            time: "10:00 AM - 1:00 PM",
            venue: "Seminar Hall",
            type: "workshop",
            status: "completed",
            registeredUsers: 70,
            maxCapacity: 80,
            organizer: "Blockchain Enthusiasts",
        },
        {
            id: 8,
            title: "Annual Tech Fest: TechnoVision",
            description: "Multi-day tech festival with competitions, workshops, and guest lectures.",
            date: "Apr 5-7, 2024",
            time: "9:00 AM - 6:00 PM",
            venue: "Campus Ground & Labs",
            type: "technical",
            status: "completed",
            registeredUsers: 200,
            maxCapacity: 250,
            organizer: "BCA Association",
            isFeatured: true,
        },
    ];

    const eventTypes = [
        { id: 'all', label: 'All Events', icon: CalendarDays },
        { id: 'upcoming', label: 'Upcoming', icon: CalendarClock },
        { id: 'past', label: 'Past Events', icon: Calendar },
        { id: 'technical', label: 'Technical', icon: Code },
        { id: 'workshop', label: 'Workshops', icon: Microscope },
        { id: 'seminar', label: 'Seminars', icon: BookOpen },
        { id: 'competition', label: 'Competitions', icon: Trophy },
    ];

    const getTypeColor = (type: Event['type']) => {
        switch (type) {
            case 'technical': return { bg: 'bg-[#2563EB]/10', text: 'text-[#2563EB]', border: 'border-[#2563EB]/20' };
            case 'workshop': return { bg: 'bg-[#38BDF8]/10', text: 'text-[#38BDF8]', border: 'border-[#38BDF8]/20' };
            case 'seminar': return { bg: 'bg-[#22C55E]/10', text: 'text-[#22C55E]', border: 'border-[#22C55E]/20' };
            case 'competition': return { bg: 'bg-[#F59E0B]/10', text: 'text-[#F59E0B]', border: 'border-[#F59E0B]/20' };
            default: return { bg: 'bg-[#8B5CF6]/10', text: 'text-[#8B5CF6]', border: 'border-[#8B5CF6]/20' };
        }
    };

    const getStatusColor = (status: Event['status']) => {
        switch (status) {
            case 'upcoming': return { bg: 'bg-[#22C55E]/10', text: 'text-[#22C55E]', icon: CheckCircle };
            case 'ongoing': return { bg: 'bg-[#F59E0B]/10', text: 'text-[#F59E0B]', icon: AlertCircle };
            case 'completed': return { bg: 'bg-[#94A3B8]/10', text: 'text-[#475569]', icon: CheckCircle };
            case 'cancelled': return { bg: 'bg-[#EF4444]/10', text: 'text-[#EF4444]', icon: XCircle };
            default: return { bg: 'bg-[#94A3B8]/10', text: 'text-[#475569]', icon: CheckCircle };
        }
    };

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesType = (() => {
            if (eventType === 'all') return true;

            if (eventType === 'upcoming') {
                return event.status === 'upcoming' || event.status === 'ongoing';
            }

            if (eventType === 'past') {
                return event.status === 'completed' || event.status === 'cancelled';
            }

            return event.type === eventType;
        })();



        return matchesSearch && matchesType;
    });

    const toggleBookmark = (eventId: number) => {
        setBookmarkedEvents(prev =>
            prev.includes(eventId)
                ? prev.filter(id => id !== eventId)
                : [...prev, eventId]
        );
    };

    const upcomingEvents = events.filter(e => e.status === 'upcoming' || e.status === 'ongoing');
    const pastEvents = events.filter(e => e.status === 'completed' || e.status === 'cancelled');

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white dark:from-[#020617] dark:to-[#0F172A]">
            {/* Hero Section - Responsive */}
            <section className="relative overflow-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/5 via-transparent to-[#38BDF8]/5"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#2563EB]/10 dark:bg-[#2563EB]/20 mb-4 sm:mb-6">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-[#2563EB] dark:text-[#38BDF8]" />
                            <span className="text-xs sm:text-sm font-medium text-[#2563EB] dark:text-[#38BDF8]">
                                BCA Association Events
                            </span>
                        </div>
                        <h1 className={cn(
                            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6",
                            "text-[#0F172A] dark:text-[#E5E7EB]"
                        )}>
                            Discover & Participate in
                            <br className="sm:hidden" />
                            <span className="text-[#2563EB] dark:text-[#3B82F6]"> Exciting Events</span>
                        </h1>
                        <p className={cn(
                            "text-base sm:text-lg md:text-xl max-w-2xl sm:max-w-3xl mx-auto mb-6 sm:mb-8",
                            "text-[#475569] dark:text-[#94A3B8]"
                        )}>
                            Join workshops, competitions, seminars, and technical events organized by BCA Association
                            to enhance your skills, network with peers, and grow professionally.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section - Responsive */}
            <section className="py-6 sm:py-8 md:py-10 lg:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                        {[
                            { label: "Total Events", value: events.length, icon: CalendarDays, color: "text-[#2563EB]" },
                            { label: "Upcoming", value: upcomingEvents.length, icon: CalendarClock, color: "text-[#22C55E]" },
                            { label: "Workshops", value: events.filter(e => e.type === 'workshop').length, icon: Microscope, color: "text-[#38BDF8]" },
                            { label: "Participants", value: events.reduce((sum, e) => sum + e.registeredUsers, 0), icon: Users, color: "text-[#F59E0B]" },
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
                                    placeholder="Search events by title, description, or organizer..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 sm:pl-10 text-sm sm:text-base"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                <Select value={eventType} onValueChange={(value) => setEventType(value as EventType)}>
                                    <SelectTrigger className="w-full sm:w-[180px] text-sm sm:text-base">
                                        <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                        <SelectValue placeholder="Filter by type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {eventTypes.map((type) => {
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
                                        setEventType('all');
                                    }}
                                    className="text-sm sm:text-base"
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Event Type Tabs - Responsive */}
                    <div className="mb-6 sm:mb-8 overflow-x-auto">
                        <div className="flex gap-2 pb-2 min-w-max sm:min-w-0">
                            {eventTypes.map((type) => {
                                const Icon = type.icon;
                                const isActive = eventType === type.id;
                                return (
                                    <Button
                                        key={type.id}
                                        variant={isActive ? "default" : "outline"}
                                        className={cn(
                                            "flex items-center gap-1.5 sm:gap-2 whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm",
                                            isActive && "bg-[#2563EB] hover:bg-[#1D4ED8]"
                                        )}
                                        onClick={() => setEventType(type.id as EventType)}
                                    >
                                        <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                                        <span className="hidden xs:inline">{type.label}</span>
                                        <span className="xs:hidden">
                                            {type.id === 'all' ? 'All' :
                                                type.id === 'upcoming' ? 'Upcoming' :
                                                    type.id === 'past' ? 'Past' :
                                                        type.id === 'technical' ? 'Tech' :
                                                            type.id === 'workshop' ? 'Workshop' :
                                                                type.id === 'seminar' ? 'Seminar' : 'Comp'}
                                        </span>
                                    </Button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Events Grid - Responsive Columns */}
                    {filteredEvents.length === 0 ? (
                        <div className={cn(
                            "py-12 sm:py-16 text-center rounded-xl",
                            "bg-white border border-[#E5E7EB]",
                            "dark:bg-[#0F172A] dark:border-[#1E293B]"
                        )}>
                            <Calendar className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-[#94A3B8]" />
                            <h3 className={cn(
                                "text-lg sm:text-xl md:text-2xl font-bold mb-2",
                                "text-[#0F172A] dark:text-[#E5E7EB]"
                            )}>
                                No events found
                            </h3>
                            <p className={cn(
                                "text-sm sm:text-base text-[#475569] dark:text-[#94A3B8] mb-3 sm:mb-4"
                            )}>
                                Try adjusting your search or filter criteria
                            </p>
                            <Button
                                onClick={() => {
                                    setSearchQuery('');
                                    setEventType('all');
                                }}
                                size="sm"
                                className="text-sm sm:text-base"
                            >
                                Show All Events
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                            {filteredEvents.map((event) => {
                                const typeColor = getTypeColor(event.type);
                                const statusColor = getStatusColor(event.status);
                                const StatusIcon = statusColor.icon;
                                const isBookmarked = bookmarkedEvents.includes(event.id);
                                const registrationPercentage = (event.registeredUsers / event.maxCapacity) * 100;

                                return (
                                    <Card
                                        key={event.id}
                                        className={cn(
                                            "group hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 overflow-hidden relative",
                                            event.isFeatured && "border-2 border-[#2563EB]",
                                            "border-[#E5E7EB] dark:border-[#1E293B]"
                                        )}
                                    >
                                        {/* Featured Badge - Responsive */}
                                        {event.isFeatured && (
                                            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
                                                <Badge className="bg-[#2563EB] text-white text-xs">
                                                    <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                                                    <span className="hidden sm:inline">Featured</span>
                                                    <span className="sm:hidden">⭐</span>
                                                </Badge>
                                            </div>
                                        )}

                                        {/* Bookmark Button - Responsive */}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-sm h-7 w-7 sm:h-8 sm:w-8"
                                            onClick={() => toggleBookmark(event.id)}
                                        >
                                            {isBookmarked ? (
                                                <BookmarkCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563EB]" />
                                            ) : (
                                                <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#475569]" />
                                            )}
                                        </Button>

                                        <CardHeader className="pb-2 sm:pb-3">
                                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                                                <Badge
                                                    variant="outline"
                                                    className={cn(
                                                        "border text-xs sm:text-sm",
                                                        typeColor.border,
                                                        typeColor.text,
                                                        typeColor.bg
                                                    )}
                                                >
                                                    <span className="hidden xs:inline">
                                                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                                    </span>
                                                    <span className="xs:hidden">
                                                        {event.type === 'technical' ? 'Tech' :
                                                            event.type === 'workshop' ? 'Workshop' :
                                                                event.type === 'seminar' ? 'Seminar' :
                                                                    event.type === 'competition' ? 'Comp' : event.type.charAt(0).toUpperCase()}
                                                    </span>
                                                </Badge>
                                                <Badge
                                                    variant="outline"
                                                    className={cn(
                                                        "border text-xs sm:text-sm",
                                                        statusColor.text,
                                                        statusColor.bg
                                                    )}
                                                >
                                                    <StatusIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                                                    <span className="hidden xs:inline">
                                                        {event.status ? event.status.charAt(0).toUpperCase() + event.status.slice(1) : ''}

                                                    </span>
                                                    <span className="xs:hidden">
                                                        {event.status === 'ongoing' ? 'Ongoing' :
                                                            event.status === 'completed' ? 'Past' :
                                                                event.status === 'cancelled' ? 'Cancelled' :
                                                                    event.status ? event.status.charAt(0).toUpperCase() + event.status.slice(1) : ''}
                                                    </span>
                                                </Badge>
                                            </div>
                                            <CardTitle className={cn(
                                                "text-base sm:text-lg lg:text-xl font-bold group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] line-clamp-2",
                                                "text-[#0F172A] dark:text-[#E5E7EB]"
                                            )}>
                                                {event.title}
                                            </CardTitle>
                                            <CardDescription className="line-clamp-2 text-sm sm:text-base text-[#475569] dark:text-[#94A3B8]">
                                                {event.description}
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="space-y-3 sm:space-y-4">
                                            {/* Event Details - Responsive */}
                                            <div className="space-y-2 sm:space-y-3">
                                                <div className="flex items-center text-xs sm:text-sm">
                                                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-[#475569] dark:text-[#94A3B8] flex-shrink-0" />
                                                    <span className="text-[#0F172A] dark:text-[#E5E7EB] truncate">
                                                        {event.date} • {event.time}
                                                    </span>
                                                </div>
                                                <div className="flex items-center text-xs sm:text-sm">
                                                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-[#475569] dark:text-[#94A3B8] flex-shrink-0" />
                                                    <span className="text-[#0F172A] dark:text-[#E5E7EB] line-clamp-1">
                                                        {event.venue}
                                                    </span>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <div className="flex items-center text-xs sm:text-sm">
                                                        <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-[#475569] dark:text-[#94A3B8] flex-shrink-0" />
                                                        <span className="text-[#0F172A] dark:text-[#E5E7EB]">
                                                            {event.registeredUsers}/{event.maxCapacity} Registered
                                                        </span>
                                                        <span className="ml-1.5 text-xs text-[#475569] dark:text-[#94A3B8]">
                                                            ({Math.round(registrationPercentage)}%)
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1 bg-[#E5E7EB] dark:bg-[#334155] rounded-full h-1.5 sm:h-2">
                                                            <div
                                                                className={cn(
                                                                    "rounded-full h-full",
                                                                    registrationPercentage >= 90 ? "bg-[#22C55E]" :
                                                                        registrationPercentage >= 50 ? "bg-[#F59E0B]" :
                                                                            registrationPercentage >= 25 ? "bg-[#2563EB]" :
                                                                                "bg-[#94A3B8]"
                                                                )}
                                                                style={{ width: `${Math.min(registrationPercentage, 100)}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-xs sm:text-sm">
                                                    <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-[#475569] dark:text-[#94A3B8] flex-shrink-0" />
                                                    <span className="text-[#0F172A] dark:text-[#E5E7EB] truncate">
                                                        By: {event.organizer}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Event Badges - Responsive */}
                                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                {event.hasCertificate && (
                                                    <Badge variant="secondary" className="bg-[#22C55E]/10 text-[#22C55E] text-xs">
                                                        <span className="hidden sm:inline">Certificate</span>
                                                        <span className="sm:hidden">Cert</span>
                                                    </Badge>
                                                )}
                                                {event.isRegistered && (
                                                    <Badge variant="secondary" className="bg-[#2563EB]/10 text-[#2563EB] text-xs">
                                                        Registered
                                                    </Badge>
                                                )}
                                                {event.resources && event.resources.length > 0 && (
                                                    <Badge variant="secondary" className="bg-[#F59E0B]/10 text-[#F59E0B] text-xs">
                                                        <span className="hidden sm:inline">Resources</span>
                                                        <span className="sm:hidden">Files</span>
                                                    </Badge>
                                                )}
                                            </div>
                                        </CardContent>

                                        <CardFooter className="pt-3 sm:pt-4 border-t border-[#E5E7EB] dark:border-[#1E293B]">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-3 sm:gap-0">
                                                <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto">
                                                    {event.status === 'upcoming' && (
                                                        <Button
                                                            variant={event.isRegistered ? "outline" : "default"}
                                                            size="sm"
                                                            className={cn(
                                                                "w-full sm:w-auto text-xs sm:text-sm",
                                                                event.isRegistered ? "border-[#22C55E] text-[#22C55E]" : ""
                                                            )}
                                                        >
                                                            {event.isRegistered ? "Registered ✓" : "Register Now"}
                                                        </Button>
                                                    )}
                                                    {event.status === 'completed' && event.resources && (
                                                        <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs sm:text-sm">
                                                            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                                            <span className="hidden sm:inline">Resources</span>
                                                            <span className="sm:hidden">Files</span>
                                                        </Button>
                                                    )}
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="group text-xs sm:text-sm w-full sm:w-auto justify-between sm:justify-center"
                                                >
                                                    <span>Details</span>
                                                    <ChevronRight className="ml-1 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-0.5 sm:group-hover:translate-x-1 transition-transform" />
                                                </Button>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                );
                            })}
                        </div>
                    )}

                    {/* Upcoming Highlight Section - Responsive */}
                    {upcomingEvents.length > 0 && eventType !== 'past' && (
                        <div className="mt-8 sm:mt-12 md:mt-16">
                            <h2 className={cn(
                                "text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6",
                                "text-[#0F172A] dark:text-[#E5E7EB]"
                            )}>
                                <span className="text-[#2563EB] dark:text-[#3B82F6]">Upcoming</span> Events
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                {upcomingEvents.slice(0, 2).map((event) => {
                                    const typeColor = getTypeColor(event.type);
                                    const registrationPercentage = (event.registeredUsers / event.maxCapacity) * 100;

                                    return (
                                        <Card key={event.id} className={cn(
                                            "bg-gradient-to-r from-[#2563EB]/5 to-[#38BDF8]/5",
                                            "border-2 border-[#2563EB]/20",
                                            "dark:from-[#2563EB]/10 dark:to-[#38BDF8]/10 dark:border-[#2563EB]/30"
                                        )}>
                                            <CardContent className="p-4 sm:p-6">
                                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6">
                                                    <div className="space-y-2 sm:space-y-3 flex-1">
                                                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                                            <Badge className={cn(
                                                                "border-0 text-xs sm:text-sm",
                                                                typeColor.bg,
                                                                typeColor.text
                                                            )}>
                                                                {event.type.toUpperCase()}
                                                            </Badge>
                                                            <Badge variant="outline" className="bg-white/50 dark:bg-[#0F172A]/50 text-xs sm:text-sm">
                                                                {event.date}
                                                            </Badge>
                                                        </div>
                                                        <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB] line-clamp-2">
                                                            {event.title}
                                                        </h3>
                                                        <p className="text-sm sm:text-base text-[#475569] dark:text-[#94A3B8] line-clamp-2">
                                                            {event.description}
                                                        </p>
                                                        <div className="flex items-center text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">
                                                            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" />
                                                            {event.venue} • {event.time}
                                                        </div>
                                                        {/* Registration Progress - Mobile Optimized */}
                                                        <div className="space-y-1">
                                                            <div className="flex items-center justify-between text-xs sm:text-sm">
                                                                <span className="text-[#0F172A] dark:text-[#E5E7EB]">
                                                                    {event.registeredUsers}/{event.maxCapacity} spots filled
                                                                </span>
                                                                <span className="text-[#475569] dark:text-[#94A3B8]">
                                                                    {Math.round(registrationPercentage)}%
                                                                </span>
                                                            </div>
                                                            <div className="w-full bg-[#E5E7EB] dark:bg-[#334155] rounded-full h-1.5 sm:h-2">
                                                                <div
                                                                    className={cn(
                                                                        "rounded-full h-full",
                                                                        registrationPercentage >= 90 ? "bg-[#22C55E]" :
                                                                            registrationPercentage >= 50 ? "bg-[#F59E0B]" :
                                                                                registrationPercentage >= 25 ? "bg-[#2563EB]" :
                                                                                    "bg-[#94A3B8]"
                                                                    )}
                                                                    style={{ width: `${Math.min(registrationPercentage, 100)}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button className="whitespace-nowrap text-xs sm:text-sm w-full sm:w-auto">
                                                        {event.isRegistered ? "Registered ✓" : "Register Now"}
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
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
                                    Exclusive Event Benefits for Members
                                </h3>
                                <ul className="space-y-2 sm:space-y-3">
                                    {[
                                        "Priority registration for popular events",
                                        "Free access to workshop resources",
                                        "Eligibility for participation certificates",
                                        "Networking opportunities with industry experts",
                                        "Chance to win exciting prizes in competitions"
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
                                        Become a verified BCA Association member to unlock all benefits
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
        </div>
    );
}