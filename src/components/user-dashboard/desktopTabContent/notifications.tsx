import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Clock } from 'lucide-react'
import React from 'react'

interface NotificationsTabContentProps {
    notifications: any[]
    markNotificationAsRead: (notificationId: string) => void
    unreadNotifications: any
}

const NotificationsTabContent = ({ notifications, markNotificationAsRead, unreadNotifications }: NotificationsTabContentProps) => {
    return (
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
    )
}

export default NotificationsTabContent