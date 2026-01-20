// app/components/admin/recent-activities.tsx
'use client'

import React from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Calendar,
    Clock,
    User,
    CheckCircle,
    AlertTriangle,
    XCircle,
    Shield,
    Database,
    Settings,
    Lock,
    Eye
} from 'lucide-react'

interface Activity {
    id: number
    action: string
    user: string
    time: string
    status: 'success' | 'warning' | 'error'
    details?: string
    ip?: string
    location?: string
}

interface RecentActivitiesProps {
    activities?: Activity[]
}

const defaultActivities: Activity[] = [
    {
        id: 1,
        action: 'System backup created',
        user: 'System',
        time: '2 minutes ago',
        status: 'success',
        details: 'Full system backup completed successfully',
        ip: '192.168.1.1'
    },
    {
        id: 2,
        action: 'New admin user added',
        user: 'John Doe',
        time: '15 minutes ago',
        status: 'success',
        details: 'Added new admin with limited permissions',
        ip: '10.0.0.45',
        location: 'New York'
    },
    {
        id: 3,
        action: 'Security policy updated',
        user: 'System',
        time: '1 hour ago',
        status: 'warning',
        details: 'Updated password policy to require 12 characters',
        ip: '192.168.1.1'
    },
    {
        id: 4,
        action: 'Database optimization',
        user: 'System',
        time: '3 hours ago',
        status: 'success',
        details: 'Optimized database indexes and cleaned up logs',
        ip: '192.168.1.1'
    },
    {
        id: 5,
        action: 'Failed login attempt',
        user: 'Unknown',
        time: '5 hours ago',
        status: 'error',
        details: 'Multiple failed login attempts from suspicious IP',
        ip: '45.67.89.123',
        location: 'Unknown'
    },
]

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />
        case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-500" />
        case 'error': return <XCircle className="w-4 h-4 text-red-500" />
        default: return <CheckCircle className="w-4 h-4 text-gray-500" />
    }
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'success': return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800'
        case 'warning': return 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
        case 'error': return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'
        default: return 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800'
    }
}

const getActivityIcon = (action: string) => {
    if (action.includes('backup')) return <Database className="w-4 h-4" />
    if (action.includes('admin')) return <Shield className="w-4 h-4" />
    if (action.includes('security')) return <Lock className="w-4 h-4" />
    if (action.includes('database')) return <Database className="w-4 h-4" />
    if (action.includes('login')) return <Eye className="w-4 h-4" />
    return <Settings className="w-4 h-4" />
}

const getUserInitials = (user: string) => {
    return user.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
}

const getTimeIcon = (time: string) => {
    if (time.includes('minute')) return '🕐'
    if (time.includes('hour')) return '🕑'
    if (time.includes('day')) return '📅'
    return '🕒'
}

export function RecentActivities({ activities = defaultActivities }: RecentActivitiesProps) {
    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <h3 className="font-semibold">Recent System Activities</h3>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                    View All →
                </Button>
            </div>

            {/* Activity List */}
            <div className="space-y-3">
                {activities.map((activity) => (
                    <div
                        key={activity.id}
                        className={`p-4 rounded-lg border ${getStatusColor(activity.status)} transition-all hover:shadow-sm`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                                {/* Avatar */}
                                <div className="relative">
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback className={`
                      ${activity.status === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                                activity.status === 'warning' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300' :
                                                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}
                    `}>
                                            {getUserInitials(activity.user)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -bottom-1 -right-1 p-1 bg-background rounded-full">
                                        {getActivityIcon(activity.action)}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-medium truncate">{activity.action}</h4>
                                        {getStatusIcon(activity.status)}
                                    </div>

                                    {activity.details && (
                                        <p className="text-sm text-muted-foreground mb-2">{activity.details}</p>
                                    )}

                                    {/* Metadata */}
                                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <User className="w-3 h-3" />
                                            <span className="font-medium">{activity.user}</span>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            <span>{getTimeIcon(activity.time)} {activity.time}</span>
                                        </div>

                                        {activity.ip && (
                                            <Badge variant="outline" className="text-xs font-mono">
                                                IP: {activity.ip}
                                            </Badge>
                                        )}

                                        {activity.location && (
                                            <Badge variant="outline" className="text-xs">
                                                📍 {activity.location}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="ml-4 flex flex-col gap-1">
                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                    <Eye className="w-3 h-3" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                    <Shield className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">8</div>
                    <div className="text-xs text-muted-foreground">Success</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600">2</div>
                    <div className="text-xs text-muted-foreground">Warnings</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">1</div>
                    <div className="text-xs text-muted-foreground">Errors</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold">24h</div>
                    <div className="text-xs text-muted-foreground">Period</div>
                </div>
            </div>

            {/* Filter Options */}
            <div className="flex items-center gap-2 pt-2">
                <Button variant="outline" size="sm" className="text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Success
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Warnings
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                    <XCircle className="w-3 h-3 mr-1" />
                    Errors
                </Button>
                <Button variant="outline" size="sm" className="text-xs ml-auto">
                    Export Logs
                </Button>
            </div>
        </div>
    )
}