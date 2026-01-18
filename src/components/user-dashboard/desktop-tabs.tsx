'use client'

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Award, Calendar, CheckCircle, ChevronRight, Clock, Download, Eye, FileText, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Document, Notification, UserEvent, UserProfile } from '@/app/(protected)/dashboard/page';
import { getSession, useSession } from 'next-auth/react';

interface DesktopTabsProps {
    activeTab: string
    setActiveTab: (value: string) => void


    userEvents: UserEvent[]
    documents: Document[]
    notifications: Notification[]
    unreadNotifications: number
    achievements: any[]

    markNotificationAsRead: any
}


const DesktopTabs = ({
    activeTab,
    setActiveTab,
    userEvents,
    documents,
    notifications,
    unreadNotifications,
    achievements,
    markNotificationAsRead,
}: DesktopTabsProps) => {

    const { data: session, status } = useSession()

    return (
        <div className="hidden lg:block">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
                <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 w-full">
                    <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
                    <TabsTrigger value="events" className="text-xs sm:text-sm">My Events</TabsTrigger>
                    <TabsTrigger value="documents" className="text-xs sm:text-sm">Documents</TabsTrigger>
                    <TabsTrigger value="notifications" className="text-xs sm:text-sm">Notifications</TabsTrigger>
                    <TabsTrigger value="achievements" className="text-xs sm:text-sm">Achievements</TabsTrigger>
                </TabsList>

                {/* Overview Tab Content */}
                <TabsContent value="overview" className="space-y-4 sm:space-y-6">
                    {/* Welcome Card */}
                    <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                                <div>
                                    <h2 className="text-lg sm:text-2xl font-bold text-[#0F172A] dark:text-[#E5E7EB] mb-1 sm:mb-2">
                                        Welcome back, {session?.user.name.split(' ')[0]}! 👋
                                    </h2>
                                    <p className="text-sm sm:text-base text-[#475569] dark:text-[#94A3B8]">
                                        Here&apos;s what&apos;s happening with your membership today.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                                    <Badge variant="outline" className="border-[#2563EB] text-[#2563EB] text-xs sm:text-sm w-fit">
                                        <Shield className="w-3 h-3 mr-1" />
                                        <p>
                                            Member Since:{" "}
                                            {session?.user?.joinDate
                                                ? new Date(session.user.joinDate).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                })
                                                : "N/A"}
                                        </p>

                                    </Badge>
                                    <Button size="sm" className="text-xs sm:text-sm">
                                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" />
                                        Calendar
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Upcoming Events */}
                    <div>
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <h3 className="text-base sm:text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                Upcoming Events
                            </h3>
                            <Link href="/events">
                                <Button variant="ghost" size="sm" className="gap-1 text-xs sm:text-sm">
                                    View All
                                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            {userEvents
                                .filter(event => event.status === 'registered' || event.status === 'upcoming')
                                .slice(0, 3)
                                .map((event) => (
                                    <Card key={event.id} className="border-[#E5E7EB] dark:border-[#1E293B]">
                                        <CardContent className="p-3 sm:p-4">
                                            <div className="space-y-2 sm:space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <Badge variant="outline" className="border-[#2563EB] text-[#2563EB] text-xs">
                                                        {event.type}
                                                    </Badge>
                                                    <Badge className={cn(
                                                        "border-0 text-xs",
                                                        event.status === 'registered' ? "bg-[#2563EB]/10 text-[#2563EB]" :
                                                            event.status === 'upcoming' ? "bg-[#F59E0B]/10 text-[#F59E0B]" :
                                                                "bg-[#22C55E]/10 text-[#22C55E]"
                                                    )}>
                                                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                                    </Badge>
                                                </div>
                                                <h4 className="font-bold text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB] line-clamp-2">
                                                    {event.title}
                                                </h4>
                                                <div className="flex items-center text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">
                                                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                                                    {event.date}
                                                </div>
                                                <div className="flex  flex-col  gap-2">
                                                    <Button size="sm" variant="outline" className="text-xs sm:text-sm">
                                                        View Details
                                                    </Button>
                                                    <Button size="sm" className="text-xs text-wrap sm:text-sm">
                                                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                                                        Add to Calendar
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    </div>

                    {/* Recent Documents */}
                    <div>
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <h3 className="text-base sm:text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                Recent Documents
                            </h3>
                            <Link href="/dashboard/documents">
                                <Button variant="ghost" size="sm" className="gap-1 text-xs sm:text-sm">
                                    View All
                                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                            </Link>
                        </div>
                        <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                            <CardContent className="p-0">
                                {documents.slice(0, 3).map((doc) => (
                                    <div key={doc.id} className="flex items-center justify-between p-3 sm:p-4 border-b border-[#E5E7EB] dark:border-[#1E293B] last:border-0">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#2563EB]/10 dark:bg-[#2563EB]/20 flex items-center justify-center">
                                                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB] dark:text-[#3B82F6]" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="font-medium text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB] truncate">
                                                    {doc.title}
                                                </div>
                                                <div className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">
                                                    {doc.type} • {doc.uploadedDate}
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* My Events Tab Content */}
                <TabsContent value="events" className="space-y-4 sm:space-y-6">
                    <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                        <CardHeader>
                            <CardTitle className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                My Events
                            </CardTitle>
                            <CardDescription className="text-sm sm:text-base text-[#475569] dark:text-[#94A3B8]">
                                Track all your registered and attended events
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 sm:space-y-4">
                                {userEvents.map((event) => (
                                    <div key={event.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg border border-[#E5E7EB] dark:border-[#1E293B]">
                                        <div className="space-y-1.5 sm:space-y-2 flex-1">
                                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                                <h4 className="font-bold text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">
                                                    {event.title}
                                                </h4>
                                                <Badge variant="outline" className="border-[#2563EB] text-[#2563EB] text-xs">
                                                    {event.type}
                                                </Badge>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    {event.date}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {event.status === 'registered' ? (
                                                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    ) : event.status === 'attended' ? (
                                                        <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    ) : (
                                                        <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    )}
                                                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-0">
                                            {event.certificateUrl && (
                                                <Link href={event.certificateUrl}>
                                                    <Button variant="outline" size="sm" className="gap-1 text-xs">
                                                        <Download className="w-3.5 h-3.5" />
                                                        Certificate
                                                    </Button>
                                                </Link>
                                            )}
                                            <Button variant="ghost" size="sm" className="gap-1 text-xs">
                                                Details
                                                <ChevronRight className="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Documents Tab Content */}
                <TabsContent value="documents" className="space-y-4 sm:space-y-6">
                    <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                        <CardHeader>
                            <CardTitle className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                My Documents
                            </CardTitle>
                            <CardDescription className="text-sm sm:text-base text-[#475569] dark:text-[#94A3B8]">
                                Access all your important documents and certificates
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                {documents.map((doc) => (
                                    <Card key={doc.id} className="border-[#E5E7EB] dark:border-[#1E293B] hover:shadow-lg transition-shadow">
                                        <CardContent className="p-3 sm:p-4">
                                            <div className="space-y-2 sm:space-y-3">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#2563EB]/10 dark:bg-[#2563EB]/20 flex items-center justify-center">
                                                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563EB] dark:text-[#3B82F6]" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB] line-clamp-2">
                                                        {doc.title}
                                                    </h4>
                                                    <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                                        <Badge variant="outline" className="text-xs">
                                                            {doc.type}
                                                        </Badge>
                                                        <span className="text-xs text-[#475569] dark:text-[#94A3B8]">
                                                            {doc.uploadedDate}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1.5 sm:gap-2">
                                                    <Button variant="outline" size="sm" className="flex-1 text-xs">
                                                        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                                                        View
                                                    </Button>
                                                    <Button size="sm" className="flex-1 text-xs">
                                                        <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                                                        Download
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Tab Content */}
                <TabsContent value="notifications" className="space-y-4 sm:space-y-6">
                    <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                        <CardHeader>
                            <CardTitle className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                Notifications
                            </CardTitle>
                            <CardDescription className="text-sm sm:text-base text-[#475569] dark:text-[#94A3B8]">
                                {unreadNotifications} unread notifications
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 sm:space-y-4">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={cn(
                                            "p-3 sm:p-4 rounded-lg border transition-colors cursor-pointer",
                                            notification.read
                                                ? "border-[#E5E7EB] dark:border-[#1E293B] bg-transparent"
                                                : "border-[#2563EB]/30 dark:border-[#2563EB]/50 bg-[#2563EB]/5 dark:bg-[#2563EB]/10"
                                        )}
                                        onClick={() => markNotificationAsRead(notification.id)}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-1">
                                                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                                    <h4 className="font-bold text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">
                                                        {notification.title}
                                                    </h4>
                                                    <Badge variant="outline" className="text-xs">
                                                        {notification.type}
                                                    </Badge>
                                                </div>
                                                <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">
                                                    {notification.message}
                                                </p>
                                                <div className="flex items-center text-xs text-[#475569] dark:text-[#94A3B8]">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    {notification.time}
                                                </div>
                                            </div>
                                            {!notification.read && (
                                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#2563EB] mt-1.5"></div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Achievements Tab Content */}
                <TabsContent value="achievements" className="space-y-4 sm:space-y-6">
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
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default DesktopTabs