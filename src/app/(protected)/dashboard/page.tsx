"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
    User,
    Bell,
    Calendar,
    BookOpen,
    Award,
    FileText,
    Users,
    TrendingUp,
    CheckCircle,
    Clock,
    Mail,
    Phone,
    Edit,
    CalendarDays,
    GraduationCap,
    Lock,
    Trophy,
    Home,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import UserDashboardLayout from '@/components/layout/user-dashboard';
import DesktopTabs from '@/components/user-dashboard/desktop-tabs';
import renderMobileTabContent from '@/components/user-dashboard/mobile-tabs';

export type UserRole = 'member' | 'admin' | 'super_admin';
export type EventStatus = 'registered' | 'attended' | 'completed' | 'upcoming';
export type NotificationType = 'event' | 'academic' | 'system' | 'membership';
export type EventType = 'all' | 'competition' | 'workshop' | 'seminar';

export interface UserProfile {
    id: number;
    name: string;
    email: string;
    phone: string;
    studentId: string;
    course: string;
    semester: number;
    role: UserRole;
    joinDate: string;
    membershipStatus: 'active' | 'expired' | 'pending';
    avatarUrl?: string;
    points: number;
    level: number;
    nextLevelPoints: number;
}

export interface UserEvent {
    id: number;
    title: string;
    date: string;
    type: string;
    status: EventStatus;
    certificateUrl?: string;
}

export interface Notification {
    id: number;
    title: string;
    message: string;
    type: NotificationType;
    time: string;
    read: boolean;
}

export interface Document {
    id: number;
    title: string;
    type: string;
    uploadedDate: string;
    downloadUrl: string;
}

export default function UserDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('overview');
    const [searchQuery, setSearchQuery] = useState('');
    const [eventType, setEventType] = useState<EventType>('all');

    const [user, setUser] = useState<UserProfile>({
        id: 1,
        name: "John Doe",
        email: "john.doe@mmmc.edu",
        phone: "+1 (555) 123-4567",
        studentId: "BCA20240123",
        course: "Bachelor of Computer Applications",
        semester: 5,
        role: 'member',
        joinDate: "2023-08-15",
        membershipStatus: 'active',
        points: 850,
        level: 3,
        nextLevelPoints: 1000,
    });

    const userEvents: UserEvent[] = [
        { id: 1, title: "Annual BCA Hackathon 2024", date: "Dec 15-16, 2024", type: "Competition", status: "registered" },
        { id: 2, title: "AI & ML Workshop", date: "Nov 30, 2024", type: "Workshop", status: "attended", certificateUrl: "#" },
        { id: 3, title: "Cybersecurity Seminar", date: "Oct 25, 2024", type: "Seminar", status: "completed", certificateUrl: "#" },
        { id: 4, title: "Web Development Bootcamp", date: "Jan 15-20, 2025", type: "Workshop", status: "upcoming" },
        { id: 5, title: "Data Science Symposium", date: "Feb 28, 2025", type: "Seminar", status: "registered" },
    ];

    const notifications: Notification[] = [
        { id: 1, title: "Event Registration Confirmed", message: "Your registration for Annual Hackathon is confirmed", type: "event", time: "2 hours ago", read: false },
        { id: 2, title: "Certificate Available", message: "Download your certificate for AI Workshop", type: "academic", time: "1 day ago", read: false },
        { id: 3, title: "Membership Renewal", message: "Your membership expires in 15 days", type: "membership", time: "2 days ago", read: true },
        { id: 4, title: "System Maintenance", message: "Portal will be down for maintenance", type: "system", time: "3 days ago", read: true },
    ];

    const documents: Document[] = [
        { id: 1, title: "Academic Calendar 2024-25", type: "Academic", uploadedDate: "2024-08-01", downloadUrl: "#" },
        { id: 2, title: "Code of Conduct", type: "Association", uploadedDate: "2024-07-15", downloadUrl: "#" },
        { id: 3, title: "Event Guidelines", type: "Event", uploadedDate: "2024-09-10", downloadUrl: "#" },
        { id: 4, title: "Membership Benefits", type: "Membership", uploadedDate: "2024-06-20", downloadUrl: "#" },
    ];

    const achievements = [
        { id: 1, title: "Perfect Attendance", description: "Attended 10+ events", icon: CalendarDays, achieved: true },
        { id: 2, title: "Active Participant", description: "Participated in 5+ competitions", icon: Trophy, achieved: true },
        { id: 3, title: "Skill Master", description: "Complete 3 workshops", icon: GraduationCap, achieved: false },
        { id: 4, title: "Community Leader", description: "Refer 5+ new members", icon: Users, achieved: false },
    ];

    const quickActions = [
        { id: 1, title: "Register for Events", description: "Browse and register for upcoming events", icon: Calendar, href: "/events" },
        { id: 2, title: "View Certificates", description: "Access your participation certificates", icon: Award, href: "/dashboard/certificates" },
        { id: 3, title: "Update Profile", description: "Edit your personal information", icon: Edit, href: "/dashboard/profile" },
        { id: 4, title: "Contact Support", description: "Get help from association team", icon: Mail, href: "/contact" },
    ];

    const eventTypes = [
        { id: 'all', label: 'All Events', icon: Calendar },
        { id: 'competition', label: 'Competitions', icon: Trophy },
        { id: 'workshop', label: 'Workshops', icon: BookOpen },
        { id: 'seminar', label: 'Seminars', icon: Users },
    ];

    const handleLogout = () => {
        router.push('/login');
    };

    const markNotificationAsRead = (id: number) => {
        console.log(`Mark notification ${id} as read`);
    };

    const unreadNotifications = notifications.filter(n => !n.read).length;
    const progressPercentage = (user.points / user.nextLevelPoints) * 100;

    const mobileTabConfig = [
        { id: 'overview', label: 'Overview', icon: Home },
        { id: 'events', label: 'Events', icon: Calendar },
        { id: 'documents', label: 'Docs', icon: FileText },
        { id: 'notifications', label: 'Alerts', icon: Bell },
        { id: 'achievements', label: 'Badges', icon: Award },
    ];

    const filteredEvents = userEvents.filter(event => {
        const matchesSearch = searchQuery === '' ||
            event.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = eventType === 'all' ||
            event.type.toLowerCase().includes(eventType);
        return matchesSearch && matchesType;
    });

    return (
        <UserDashboardLayout unreadNotifications={unreadNotifications} user={user} handleLogout={handleLogout}>
            {/* Main Content Area */}
            <div className="flex-1">
                <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-4 lg:px-0">
                    {/* Desktop Sidebar - Hidden on mobile */}
                    <div className="hidden lg:block space-y-4 lg:space-y-6 lg:col-span-1">
                        {/* User Profile Card */}
                        <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                            <CardContent className="p-4 sm:p-5 lg:p-6">
                                <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                                    <Avatar className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 border-2 sm:border-3 lg:border-4 border-white dark:border-[#0F172A]">
                                        <AvatarFallback className="bg-[#2563EB] text-white text-lg sm:text-xl lg:text-2xl">
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="w-full">
                                        <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB] truncate">
                                            {user.name}
                                        </h2>
                                        <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] truncate">
                                            {user.course}
                                        </p>
                                        <Badge className={cn(
                                            "mt-2 text-xs sm:text-sm",
                                            user.membershipStatus === 'active'
                                                ? "bg-[#22C55E]/10 text-[#22C55E] hover:bg-[#22C55E]/20"
                                                : user.membershipStatus === 'expired'
                                                    ? "bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444]/20"
                                                    : "bg-[#F59E0B]/10 text-[#F59E0B] hover:bg-[#F59E0B]/20"
                                        )}>
                                            {user.membershipStatus === 'active' ? (
                                                <>
                                                    <CheckCircle className="w-3 h-3 mr-1" />
                                                    Active
                                                </>
                                            ) : user.membershipStatus === 'expired' ? (
                                                <>
                                                    <Lock className="w-3 h-3 mr-1" />
                                                    Expired
                                                </>
                                            ) : (
                                                <>
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    Pending
                                                </>
                                            )}
                                        </Badge>
                                    </div>

                                    <Separator className="w-full" />

                                    <div className="space-y-2 sm:space-y-3 w-full">
                                        <div className="flex items-center text-xs sm:text-sm">
                                            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-[#475569] dark:text-[#94A3B8] shrink-0" />
                                            <span className="text-[#475569] dark:text-[#94A3B8] truncate">{user.email}</span>
                                        </div>
                                        <div className="flex items-center text-xs sm:text-sm">
                                            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-[#475569] dark:text-[#94A3B8] shrink-0" />
                                            <span className="text-[#475569] dark:text-[#94A3B8] truncate">{user.phone}</span>
                                        </div>
                                        <div className="flex items-center text-xs sm:text-sm">
                                            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-[#475569] dark:text-[#94A3B8] shrink-0" />
                                            <span className="text-[#475569] dark:text-[#94A3B8] truncate">ID: {user.studentId}</span>
                                        </div>
                                    </div>

                                    <Link href="/dashboard/profile" className="w-full">
                                        <Button variant="outline" className="w-full gap-1.5 sm:gap-2 text-xs sm:text-sm h-8 sm:h-9 lg:h-10">
                                            <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                            Edit Profile
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Level & Progress */}
                        <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                            <CardHeader className="pb-2 sm:pb-3 p-4 sm:p-5 lg:p-6">
                                <CardTitle className="text-sm sm:text-base lg:text-lg font-bold text-[#0F172A] dark:text-[#E5E7EB] flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB] dark:text-[#3B82F6]" />
                                    Member Level
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-5 lg:p-6 pt-0">
                                <div className="text-center">
                                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0F172A] dark:text-[#E5E7EB] mb-1">
                                        Level {user.level}
                                    </div>
                                    <div className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">
                                        {user.points} / {user.nextLevelPoints} points
                                    </div>
                                </div>

                                <Progress value={progressPercentage} className="h-1.5 sm:h-2" />

                                <div className="text-center">
                                    <div className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">
                                        {user.nextLevelPoints - user.points} points to Level {user.level + 1}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-center">
                                    <div className="p-2 rounded-lg bg-[#F8FAFC] dark:bg-[#0F172A]">
                                        <div className="text-sm sm:text-base lg:text-lg font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                            {userEvents.filter(e => e.status === 'attended' || e.status === 'completed').length}
                                        </div>
                                        <div className="text-[10px] sm:text-xs text-[#475569] dark:text-[#94A3B8]">
                                            Events Attended
                                        </div>
                                    </div>
                                    <div className="p-2 rounded-lg bg-[#F8FAFC] dark:bg-[#0F172A]">
                                        <div className="text-sm sm:text-base lg:text-lg font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                            {userEvents.filter(e => e.certificateUrl).length}
                                        </div>
                                        <div className="text-[10px] sm:text-xs text-[#475569] dark:text-[#94A3B8]">
                                            Certificates
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                            <CardHeader className="px-4 sm:px-5 lg:px-6 pt-4 sm:pt-5 lg:pt-6 pb-1">

                                <CardTitle className="text-sm sm:text-base lg:text-lg font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-1 sm:space-y-2 px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6 pt-1">

                                {quickActions.map((action) => (
                                    <Link key={action.id} href={action.href}>
                                        <Button variant="ghost" className="w-full justify-start h-auto py-2 sm:py-2.5 lg:py-3 px-2 sm:px-3">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#2563EB]/10 dark:bg-[#2563EB]/20 flex items-center justify-center shrink-0">
                                                    <action.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563EB] dark:text-[#3B82F6]" />
                                                </div>
                                                <div className="text-left min-w-0 flex-1">
                                                    <div className="font-medium text-xs sm:text-sm text-[#0F172A] dark:text-[#E5E7EB] truncate">
                                                        {action.title}
                                                    </div>
                                                    <div className="text-[10px] sm:text-xs text-[#475569] dark:text-[#94A3B8] text-wrap">
                                                        {action.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </Button>
                                    </Link>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content - Takes full width on mobile, 3 cols on desktop */}
                    <div className="lg:col-span-3 space-y-4 sm:space-y-6 lg:space-y-8">
                        {/* Dashboard Tabs - Desktop */}
                        <DesktopTabs
                            achievements={achievements}
                            activeTab={activeTab}
                            documents={documents}
                            markNotificationAsRead={markNotificationAsRead}
                            notifications={notifications}
                            setActiveTab={setActiveTab}
                            unreadNotifications={unreadNotifications}
                            user={user}
                            userEvents={userEvents}
                        />

                        {/* Mobile Content */}
                        <div className="lg:hidden">
                            {/* Mobile Profile Summary */}
                            <Card className="border-[#E5E7EB] dark:border-[#1E293B] mb-3 sm:mb-4">
                                <CardContent className="p-3 sm:p-4">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-white dark:border-[#0F172A] shrink-0">
                                            <AvatarFallback className="bg-[#2563EB] text-white text-sm sm:text-base">
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <h2 className="font-bold text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB] truncate">
                                                {user.name}
                                            </h2>
                                            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                                <Badge className={cn(
                                                    "text-[10px] sm:text-xs px-1.5 py-0",
                                                    user.membershipStatus === 'active'
                                                        ? "bg-[#22C55E]/10 text-[#22C55E]"
                                                        : user.membershipStatus === 'expired'
                                                            ? "bg-[#EF4444]/10 text-[#EF4444]"
                                                            : "bg-[#F59E0B]/10 text-[#F59E0B]"
                                                )}>
                                                    {user.membershipStatus === 'active' ? 'Active' :
                                                        user.membershipStatus === 'expired' ? 'Expired' : 'Pending'}
                                                </Badge>
                                                <div className="text-[10px] sm:text-xs text-[#475569] dark:text-[#94A3B8]">
                                                    Level {user.level}
                                                </div>
                                            </div>
                                        </div>

                                        <Link href="/dashboard/profile">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="border-[#2563EB]/30 text-[#2563EB] dark:border-[#60A5FA]/30 dark:text-[#60A5FA] h-7 sm:h-8 text-[10px] sm:text-xs px-2 sm:px-3 shrink-0"
                                            >
                                                <Edit className="w-3 h-3 sm:w-3.5 sm:h-3.5 sm:mr-1" />
                                                <span className="hidden sm:inline">Edit</span>
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Mobile Tab Selector */}
                            <div className="mb-4 sm:mb-6">
                                <div className="flex items-center justify-between mb-2 sm:mb-3 px-1">
                                    <h2 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                        Dashboard
                                    </h2>
                                    <div className="flex items-center gap-1">
                                        <div className="text-xs text-[#475569] dark:text-[#94A3B8]">
                                            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile Tab Navigation */}
                                <div className="flex items-center justify-between bg-[#F8FAFC] dark:bg-[#0F172A] rounded-lg p-1">
                                    {mobileTabConfig.map((tab) => {
                                        const Icon = tab.icon;
                                        const isActive = activeTab === tab.id;
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={cn(
                                                    "flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-md flex-1 transition-all",
                                                    isActive
                                                        ? "bg-white dark:bg-[#1E293B] shadow-sm"
                                                        : "hover:bg-white/50 dark:hover:bg-[#1E293B]/50"
                                                )}
                                            >
                                                <Icon className={cn(
                                                    "w-4 h-4 sm:w-5 sm:h-5 mb-0.5 sm:mb-1",
                                                    isActive
                                                        ? "text-[#2563EB] dark:text-[#3B82F6]"
                                                        : "text-[#94A3B8] dark:text-[#64748B]"
                                                )} />
                                                <span className={cn(
                                                    "text-[10px] sm:text-xs font-medium truncate max-w-full px-0.5",
                                                    isActive
                                                        ? "text-[#2563EB] dark:text-[#3B82F6]"
                                                        : "text-[#64748B] dark:text-[#94A3B8]"
                                                )}>
                                                    {tab.label}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Mobile Tab Content */}
                            <div className="mt-3 sm:mt-4">
                                {renderMobileTabContent({
                                    activeTab,
                                    user,
                                    userEvents,
                                    documents,
                                    notifications,
                                    achievements,
                                    unreadNotifications,
                                    searchQuery,
                                    setSearchQuery,
                                    eventType,
                                    setEventType,
                                    eventTypes,
                                    filteredEvents,
                                    markNotificationAsRead,
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserDashboardLayout>
    );
}