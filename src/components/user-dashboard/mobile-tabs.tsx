import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "../ui/select";
import {
    Calendar,
    ChevronRight,
    Download,
    FileText,
    Filter,
    Clock,
    CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ================= PROPS ================= */

interface RenderMobileTabContentProps {
    activeTab: string;

    user: any;
    userEvents: any[];
    documents: any[];
    notifications: any[];
    achievements: any[];

    unreadNotifications: any;

    searchQuery: string;
    setSearchQuery: any;

    eventType: any;
    setEventType: any;

    eventTypes: any[];
    filteredEvents: any[];

    markNotificationAsRead: any
}

/* ================= FUNCTION ================= */

const renderMobileTabContent = ({
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
}: RenderMobileTabContentProps) => {
    switch (activeTab) {
        case 'overview':
            return (
                <div className="space-y-3 sm:space-y-4 px-2 sm:px-0">
                    {/* Welcome Card for Mobile */}
                    <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                        <CardContent className="p-3 sm:p-4">
                            <h2 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#E5E7EB] mb-1.5 sm:mb-2">
                                Welcome back, {user.name.split(' ')[0]}! 👋
                            </h2>
                            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mb-2.5 sm:mb-3">
                                Here&apos;s what&apos;s happening with your membership today.
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="p-2 sm:p-3 rounded-lg bg-[#F8FAFC] dark:bg-[#0F172A] text-center">
                                    <div className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                        {userEvents.filter(e => e.status === 'registered' || e.status === 'upcoming').length}
                                    </div>
                                    <div className="text-[10px] sm:text-xs text-[#475569] dark:text-[#94A3B8] mt-0.5">
                                        Upcoming Events
                                    </div>
                                </div>
                                <div className="p-2 sm:p-3 rounded-lg bg-[#F8FAFC] dark:bg-[#0F172A] text-center">
                                    <div className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                        {unreadNotifications}
                                    </div>
                                    <div className="text-[10px] sm:text-xs text-[#475569] dark:text-[#94A3B8] mt-0.5">
                                        New Notifications
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Upcoming Events for Mobile */}
                    <div>
                        <div className="flex items-center justify-between mb-2 sm:mb-3 px-1">
                            <h3 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                Upcoming Events
                            </h3>
                            <Link href="/events">
                                <Button variant="ghost" size="sm" className="gap-0.5 sm:gap-1 text-[11px] sm:text-xs h-7 sm:h-8 px-2">
                                    View All
                                    <ChevronRight className="w-3 h-3" />
                                </Button>
                            </Link>
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                            {userEvents
                                .filter(event => event.status === 'registered' || event.status === 'upcoming')
                                .slice(0, 2)
                                .map((event) => (
                                    <Card key={event.id} className="border-[#E5E7EB] dark:border-[#1E293B]">
                                        <CardContent className="p-2.5 sm:p-3">
                                            <div className="space-y-1.5 sm:space-y-2">
                                                <div className="flex items-center justify-between gap-2">
                                                    <Badge variant="outline" className="border-[#2563EB] text-[#2563EB] text-[10px] sm:text-xs px-1.5 sm:px-2 py-0">
                                                        {event.type}
                                                    </Badge>
                                                    <Badge className={cn(
                                                        "border-0 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0",
                                                        event.status === 'registered' ? "bg-[#2563EB]/10 text-[#2563EB]" :
                                                            event.status === 'upcoming' ? "bg-[#F59E0B]/10 text-[#F59E0B]" :
                                                                "bg-[#22C55E]/10 text-[#22C55E]"
                                                    )}>
                                                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                                    </Badge>
                                                </div>
                                                <h4 className="font-bold text-xs sm:text-sm text-[#0F172A] dark:text-[#E5E7EB] line-clamp-2">
                                                    {event.title}
                                                </h4>
                                                <div className="flex items-center text-[11px] sm:text-xs text-[#475569] dark:text-[#94A3B8]">
                                                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
                                                    {event.date}
                                                </div>
                                                <Button size="sm" variant="outline" className="w-full text-[11px] sm:text-xs h-7 sm:h-8">
                                                    View Details
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    </div>

                    {/* Recent Documents for Mobile */}
                    <div>
                        <div className="flex items-center justify-between mb-2 sm:mb-3 px-1">
                            <h3 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                Recent Documents
                            </h3>
                            <Link href="/dashboard/documents">
                                <Button variant="ghost" size="sm" className="gap-0.5 sm:gap-1 text-[11px] sm:text-xs h-7 sm:h-8 px-2">
                                    View All
                                    <ChevronRight className="w-3 h-3" />
                                </Button>
                            </Link>
                        </div>
                        <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                            <CardContent className="p-0">
                                {documents.slice(0, 3).map((doc) => (
                                    <div key={doc.id} className="flex items-center justify-between p-2.5 sm:p-3 border-b border-[#E5E7EB] dark:border-[#1E293B] last:border-0">
                                        <div className="flex items-center gap-2 min-w-0 flex-1">
                                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#2563EB]/10 dark:bg-[#2563EB]/20 flex items-center justify-center flex-shrink-0">
                                                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563EB] dark:text-[#3B82F6]" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="font-medium text-xs sm:text-sm text-[#0F172A] dark:text-[#E5E7EB] truncate">
                                                    {doc.title}
                                                </div>
                                                <div className="text-[10px] sm:text-xs text-[#475569] dark:text-[#94A3B8] truncate">
                                                    {doc.type} • {doc.uploadedDate}
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
                                            <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            );

        case 'events':
            return (
                <div className="space-y-3 sm:space-y-4 px-2 sm:px-0">
                    <div className="flex flex-col gap-2">
                        <Input
                            placeholder="Search events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 text-xs sm:text-sm h-9"
                        />
                        <Select value={eventType} onValueChange={(value) => setEventType(value as EventType)}>
                            <SelectTrigger className="w-full text-xs sm:text-sm h-9">
                                <Filter className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-2" />
                                <SelectValue placeholder="Filter by type" />
                            </SelectTrigger>
                            <SelectContent>
                                {eventTypes.map((type) => {
                                    const Icon = type.icon;
                                    return (
                                        <SelectItem key={type.id} value={type.id} className="text-xs sm:text-sm">
                                            <div className="flex items-center gap-2">
                                                <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                                {type.label}
                                            </div>
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                        {filteredEvents.map((event) => (
                            <Card key={event.id} className="border-[#E5E7EB] dark:border-[#1E293B]">
                                <CardContent className="p-2.5 sm:p-3">
                                    <div className="space-y-1.5 sm:space-y-2">
                                        <div className="flex items-center justify-between gap-2">
                                            <Badge variant="outline" className="border-[#2563EB] text-[#2563EB] text-[10px] sm:text-xs px-1.5 sm:px-2 py-0">
                                                {event.type}
                                            </Badge>
                                            <Badge className={cn(
                                                "border-0 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0",
                                                event.status === 'registered' ? "bg-[#2563EB]/10 text-[#2563EB]" :
                                                    event.status === 'attended' ? "bg-[#22C55E]/10 text-[#22C55E]" :
                                                        event.status === 'completed' ? "bg-[#8B5CF6]/10 text-[#8B5CF6]" :
                                                            "bg-[#F59E0B]/10 text-[#F59E0B]"
                                            )}>
                                                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                            </Badge>
                                        </div>
                                        <h4 className="font-bold text-xs sm:text-sm text-[#0F172A] dark:text-[#E5E7EB] line-clamp-2">
                                            {event.title}
                                        </h4>
                                        <div className="flex items-center text-[11px] sm:text-xs text-[#475569] dark:text-[#94A3B8]">
                                            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
                                            {event.date}
                                        </div>
                                        <div className="flex gap-2">
                                            {event.certificateUrl && (
                                                <Link href={event.certificateUrl} className="flex-1">
                                                    <Button size="sm" variant="outline" className="w-full text-[11px] sm:text-xs h-7 sm:h-8">
                                                        <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
                                                        Certificate
                                                    </Button>
                                                </Link>
                                            )}
                                            <Button size="sm" variant="default" className="flex-1 text-[11px] sm:text-xs h-7 sm:h-8">
                                                Details
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            );

        case 'documents':
            return (
                <div className="space-y-3 sm:space-y-4 px-2 sm:px-0">
                    <div className="grid grid-cols-1 gap-2 sm:gap-3">
                        {documents.map((doc) => (
                            <Card key={doc.id} className="border-[#E5E7EB] dark:border-[#1E293B]">
                                <CardContent className="p-2.5 sm:p-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2 min-w-0 flex-1">
                                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#2563EB]/10 dark:bg-[#2563EB]/20 flex items-center justify-center flex-shrink-0">
                                                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB] dark:text-[#3B82F6]" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="font-bold text-xs sm:text-sm text-[#0F172A] dark:text-[#E5E7EB] truncate">
                                                    {doc.title}
                                                </h4>
                                                <div className="text-[10px] sm:text-xs text-[#475569] dark:text-[#94A3B8] truncate">
                                                    {doc.type} • {doc.uploadedDate}
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
                                            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            );

        case 'notifications':
            return (
                <div className="space-y-3 sm:space-y-4 px-2 sm:px-0">
                    <div className="space-y-2 sm:space-y-3">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={cn(
                                    "p-2.5 sm:p-3 rounded-lg border cursor-pointer transition-colors active:scale-[0.98]",
                                    notification.read
                                        ? "border-[#E5E7EB] dark:border-[#1E293B] bg-transparent"
                                        : "border-[#2563EB]/30 dark:border-[#2563EB]/50 bg-[#2563EB]/5 dark:bg-[#2563EB]/10"
                                )}
                                onClick={() => markNotificationAsRead(notification.id)}
                            >
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <h4 className="font-bold text-xs sm:text-sm text-[#0F172A] dark:text-[#E5E7EB] line-clamp-1">
                                            {notification.title}
                                        </h4>
                                        {!notification.read && (
                                            <div className="w-2 h-2 rounded-full bg-[#2563EB] flex-shrink-0"></div>
                                        )}
                                    </div>
                                    <p className="text-[11px] sm:text-xs text-[#475569] dark:text-[#94A3B8] line-clamp-2">
                                        {notification.message}
                                    </p>
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center text-[10px] sm:text-xs text-[#475569] dark:text-[#94A3B8]">
                                            <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                                            <span className="truncate">{notification.time}</span>
                                        </div>
                                        <Badge variant="outline" className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0 flex-shrink-0">
                                            {notification.type}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );

        case 'achievements':
            return (
                <div className="space-y-3 sm:space-y-4 px-2 sm:px-0">
                    <div className="grid grid-cols-1 gap-2 sm:gap-3">
                        {achievements.map((achievement) => {
                            const Icon = achievement.icon;
                            return (
                                <div
                                    key={achievement.id}
                                    className={cn(
                                        "p-2.5 sm:p-3 rounded-lg border flex items-center gap-2 sm:gap-3",
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
                                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-xs sm:text-sm text-[#0F172A] dark:text-[#E5E7EB] truncate">
                                            {achievement.title}
                                        </h4>
                                        <p className="text-[11px] sm:text-xs text-[#475569] dark:text-[#94A3B8] line-clamp-2">
                                            {achievement.description}
                                        </p>
                                    </div>
                                    {achievement.achieved && (
                                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#22C55E] flex-shrink-0" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            );

        default:
            return null;
    }
};

export default renderMobileTabContent