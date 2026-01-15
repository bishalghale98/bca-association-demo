"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
    Users,
    Calendar,
    FileText,
    BarChart3,
    Settings,
    Bell,
    UserPlus,
    UserCheck,
    UserX,
    TrendingUp,
    Download,
    Eye,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    Clock,
    Search,
    Filter,
    Plus,
    MoreVertical,
    Shield,
    Building,
    LogOut,
    Mail,
    Phone,
    AlertCircle,
    PieChart,
    DollarSign,
    MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type UserRole = 'member' | 'admin' | 'super_admin';
type UserStatus = 'active' | 'inactive' | 'pending';
type EventStatus = 'draft' | 'published' | 'cancelled' | 'completed';
type AnnouncementType = 'general' | 'important' | 'urgent';

interface AdminUser {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    joinDate: string;
    lastActive: string;
    eventsAttended: number;
    points: number;
}

interface AdminEvent {
    id: number;
    title: string;
    date: string;
    type: string;
    status: EventStatus;
    registered: number;
    capacity: number;
    organizer: string;
}

interface Announcement {
    id: number;
    title: string;
    type: AnnouncementType;
    content: string;
    createdAt: string;
    createdBy: string;
    status: 'published' | 'draft';
}

interface DashboardStats {
    totalUsers: number;
    activeUsers: number;
    totalEvents: number;
    upcomingEvents: number;
    pendingRegistrations: number;
    revenue: number;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('overview');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUserType, setSelectedUserType] = useState<UserStatus | 'all'>('all');

    const adminProfile = {
        name: "Admin User",
        email: "admin@bca-association.edu",
        role: 'super_admin' as UserRole,
        avatarUrl: undefined,
    };

    const stats: DashboardStats = {
        totalUsers: 156,
        activeUsers: 142,
        totalEvents: 48,
        upcomingEvents: 8,
        pendingRegistrations: 23,
        revenue: 12500,
    };

    const users: AdminUser[] = [
        { id: 1, name: "John Doe", email: "john@example.com", role: 'member', status: 'active', joinDate: "2023-08-15", lastActive: "2024-12-01", eventsAttended: 12, points: 850 },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: 'member', status: 'active', joinDate: "2023-09-20", lastActive: "2024-12-01", eventsAttended: 8, points: 620 },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", role: 'member', status: 'inactive', joinDate: "2023-07-10", lastActive: "2024-11-15", eventsAttended: 5, points: 350 },
        { id: 4, name: "Alice Brown", email: "alice@example.com", role: 'member', status: 'pending', joinDate: "2024-11-25", lastActive: "2024-11-25", eventsAttended: 0, points: 0 },
        { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: 'admin', status: 'active', joinDate: "2023-06-05", lastActive: "2024-12-01", eventsAttended: 20, points: 1200 },
        { id: 6, name: "Diana Miller", email: "diana@example.com", role: 'member', status: 'active', joinDate: "2024-01-15", lastActive: "2024-12-01", eventsAttended: 6, points: 480 },
    ];

    const events: AdminEvent[] = [
        { id: 1, title: "Annual BCA Hackathon 2024", date: "Dec 15-16, 2024", type: "Competition", status: "published", registered: 45, capacity: 60, organizer: "Tech Club" },
        { id: 2, title: "AI & ML Workshop", date: "Nov 30, 2024", type: "Workshop", status: "published", registered: 85, capacity: 100, organizer: "Google Developers" },
        { id: 3, title: "Cybersecurity Seminar", date: "Oct 25, 2024", type: "Seminar", status: "completed", registered: 120, capacity: 150, organizer: "Security Dept" },
        { id: 4, title: "Web Dev Bootcamp", date: "Jan 15-20, 2025", type: "Workshop", status: "draft", registered: 0, capacity: 60, organizer: "Web Dev Community" },
        { id: 5, title: "Data Science Symposium", date: "Feb 28, 2025", type: "Seminar", status: "published", registered: 35, capacity: 100, organizer: "Data Science Club" },
    ];

    const announcements: Announcement[] = [
        { id: 1, title: "System Maintenance", type: "important", content: "Portal will be down for maintenance on Sunday", createdAt: "2024-12-01", createdBy: "Admin User", status: "published" },
        { id: 2, title: "New Event Registration", type: "general", content: "Registration for Annual Hackathon is now open", createdAt: "2024-11-30", createdBy: "Event Manager", status: "published" },
        { id: 3, title: "Membership Renewal Reminder", type: "urgent", content: "Membership renewal deadline approaching", createdAt: "2024-11-28", createdBy: "Admin User", status: "draft" },
        { id: 4, title: "Holiday Schedule", type: "general", content: "Association office will be closed during holidays", createdAt: "2024-11-25", createdBy: "Admin User", status: "published" },
    ];

    const handleLogout = () => {
        // Implement logout logic
        router.push('/login');
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedUserType === 'all' || user.status === selectedUserType;
        return matchesSearch && matchesType;
    });

    const getStatusColor = (status: UserStatus) => {
        switch (status) {
            case 'active': return "bg-[#22C55E]/10 text-[#22C55E]";
            case 'inactive': return "bg-[#EF4444]/10 text-[#EF4444]";
            case 'pending': return "bg-[#F59E0B]/10 text-[#F59E0B]";
            default: return "bg-[#94A3B8]/10 text-[#475569]";
        }
    };

    const getRoleColor = (role: UserRole) => {
        switch (role) {
            case 'super_admin': return "bg-[#8B5CF6]/10 text-[#8B5CF6]";
            case 'admin': return "bg-[#2563EB]/10 text-[#2563EB]";
            case 'member': return "bg-[#38BDF8]/10 text-[#38BDF8]";
            default: return "bg-[#94A3B8]/10 text-[#475569]";
        }
    };

    const getEventStatusColor = (status: EventStatus) => {
        switch (status) {
            case 'published': return "bg-[#22C55E]/10 text-[#22C55E]";
            case 'draft': return "bg-[#F59E0B]/10 text-[#F59E0B]";
            case 'cancelled': return "bg-[#EF4444]/10 text-[#EF4444]";
            case 'completed': return "bg-[#38BDF8]/10 text-[#38BDF8]";
            default: return "bg-[#94A3B8]/10 text-[#475569]";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white dark:from-[#020617] dark:to-[#0F172A]">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-[#E5E7EB] dark:border-[#1E293B] bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Building className="w-6 h-6 text-[#2563EB] dark:text-[#3B82F6]" />
                                <span className="text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                    BCA Association
                                </span>
                            </div>
                            <Badge variant="outline" className="border-[#8B5CF6] text-[#8B5CF6] dark:border-[#8B5CF6] dark:text-[#8B5CF6]">
                                Admin Panel
                            </Badge>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback className="bg-[#8B5CF6] text-white">
                                        {adminProfile.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="hidden md:block">
                                    <div className="text-sm font-medium text-[#0F172A] dark:text-[#E5E7EB]">
                                        {adminProfile.name}
                                    </div>
                                    <div className="text-xs text-[#475569] dark:text-[#94A3B8]">
                                        {adminProfile.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                                    </div>
                                </div>
                            </div>

                            <Button variant="ghost" size="icon">
                                <Bell className="w-5 h-5" />
                            </Button>

                            <Link href="/dashboard">
                                <Button variant="outline" className="gap-2">
                                    <Users className="w-4 h-4" />
                                    User View
                                </Button>
                            </Link>

                            <Button variant="outline" onClick={handleLogout} className="gap-2">
                                <LogOut className="w-4 h-4" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-[#2563EB]", change: "+12%" },
                        { label: "Active Events", value: stats.upcomingEvents, icon: Calendar, color: "text-[#22C55E]", change: "+3" },
                        { label: "Pending Registrations", value: stats.pendingRegistrations, icon: UserPlus, color: "text-[#F59E0B]", change: "+5" },
                        { label: "Total Revenue", value: `$${stats.revenue.toLocaleString()}`, icon: DollarSign, color: "text-[#8B5CF6]", change: "+8%" },
                    ].map((stat, index) => (
                        <Card key={index} className="border-[#E5E7EB] dark:border-[#1E293B]">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-[#475569] dark:text-[#94A3B8]">{stat.label}</p>
                                        <p className="text-2xl font-bold text-[#0F172A] dark:text-[#E5E7EB] mt-1">
                                            {stat.value}
                                        </p>
                                        <div className="flex items-center gap-1 mt-2">
                                            <TrendingUp className="w-4 h-4 text-[#22C55E]" />
                                            <span className="text-xs text-[#22C55E]">{stat.change}</span>
                                            <span className="text-xs text-[#475569] dark:text-[#94A3B8] ml-1">from last month</span>
                                        </div>
                                    </div>
                                    <div className={`w-12 h-12 rounded-full ${stat.color}/10 flex items-center justify-center`}>
                                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Main Content */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="events">Events</TabsTrigger>
                        <TabsTrigger value="announcements">Announcements</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Recent Activity */}
                            <Card className="lg:col-span-2 border-[#E5E7EB] dark:border-[#1E293B]">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                        Recent Activity
                                    </CardTitle>
                                    <CardDescription className="text-[#475569] dark:text-[#94A3B8]">
                                        Latest activities in the system
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[
                                            { action: "New user registration", user: "Alice Brown", time: "2 hours ago", type: "user" },
                                            { action: "Event registration", user: "John Doe", time: "4 hours ago", type: "event" },
                                            { action: "Certificate generated", user: "Jane Smith", time: "1 day ago", type: "certificate" },
                                            { action: "Membership renewed", user: "Bob Johnson", time: "2 days ago", type: "membership" },
                                            { action: "New event created", user: "Admin", time: "3 days ago", type: "event" },
                                        ].map((activity, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-[#E5E7EB] dark:border-[#1E293B]">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-[#2563EB]/10 dark:bg-[#2563EB]/20 flex items-center justify-center">
                                                        {activity.type === 'user' ? (
                                                            <UserPlus className="w-5 h-5 text-[#2563EB]" />
                                                        ) : activity.type === 'event' ? (
                                                            <Calendar className="w-5 h-5 text-[#22C55E]" />
                                                        ) : activity.type === 'certificate' ? (
                                                            <FileText className="w-5 h-5 text-[#F59E0B]" />
                                                        ) : (
                                                            <DollarSign className="w-5 h-5 text-[#8B5CF6]" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-[#0F172A] dark:text-[#E5E7EB]">
                                                            {activity.action}
                                                        </div>
                                                        <div className="text-sm text-[#475569] dark:text-[#94A3B8]">
                                                            by {activity.user} • {activity.time}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="sm">
                                                    View
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Actions */}
                            <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                        Quick Actions
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {[
                                        { label: "Create New Event", icon: Calendar, action: () => console.log("Create event") },
                                        { label: "Send Announcement", icon: MessageSquare, action: () => console.log("Send announcement") },
                                        { label: "Add New User", icon: UserPlus, action: () => console.log("Add user") },
                                        { label: "Generate Reports", icon: FileText, action: () => console.log("Generate reports") },
                                        { label: "Manage Settings", icon: Settings, action: () => setActiveTab('settings') },
                                    ].map((action, index) => (
                                        <Button
                                            key={index}
                                            variant="outline"
                                            className="w-full justify-start gap-3 h-auto py-3"
                                            onClick={action.action}
                                        >
                                            <action.icon className="w-4 h-4" />
                                            {action.label}
                                        </Button>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Users Tab */}
                    <TabsContent value="users" className="space-y-6">
                        <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                            <CardHeader>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <CardTitle className="text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                            User Management
                                        </CardTitle>
                                        <CardDescription className="text-[#475569] dark:text-[#94A3B8]">
                                            Manage all association members and administrators
                                        </CardDescription>
                                    </div>
                                    <Button className="gap-2">
                                        <UserPlus className="w-4 h-4" />
                                        Add New User
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {/* Search and Filter */}
                                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                    <div className="flex-1 relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#475569] dark:text-[#94A3B8]" />
                                        <Input
                                            placeholder="Search users by name or email..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                    <Select value={selectedUserType} onValueChange={(value: any) => setSelectedUserType(value)}>
                                        <SelectTrigger className="w-[180px]">
                                            <Filter className="w-4 h-4 mr-2" />
                                            <SelectValue placeholder="Filter by status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Users</SelectItem>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Users Table */}
                                <div className="rounded-lg border border-[#E5E7EB] dark:border-[#1E293B] overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-[#F8FAFC] dark:bg-[#0F172A]">
                                                <tr>
                                                    <th className="text-left p-4 text-sm font-medium text-[#475569] dark:text-[#94A3B8]">User</th>
                                                    <th className="text-left p-4 text-sm font-medium text-[#475569] dark:text-[#94A3B8]">Role</th>
                                                    <th className="text-left p-4 text-sm font-medium text-[#475569] dark:text-[#94A3B8]">Status</th>
                                                    <th className="text-left p-4 text-sm font-medium text-[#475569] dark:text-[#94A3B8]">Events</th>
                                                    <th className="text-left p-4 text-sm font-medium text-[#475569] dark:text-[#94A3B8]">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#E5E7EB] dark:divide-[#1E293B]">
                                                {filteredUsers.map((user) => (
                                                    <tr key={user.id} className="hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]">
                                                        <td className="p-4">
                                                            <div className="flex items-center gap-3">
                                                                <Avatar className="w-8 h-8">
                                                                    <AvatarFallback className="bg-[#2563EB] text-white">
                                                                        {user.name.split(' ').map(n => n[0]).join('')}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <div className="font-medium text-[#0F172A] dark:text-[#E5E7EB]">
                                                                        {user.name}
                                                                    </div>
                                                                    <div className="text-sm text-[#475569] dark:text-[#94A3B8]">
                                                                        {user.email}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="p-4">
                                                            <Badge className={getRoleColor(user.role)}>
                                                                {user.role === 'super_admin' ? 'Super Admin' :
                                                                    user.role === 'admin' ? 'Admin' : 'Member'}
                                                            </Badge>
                                                        </td>
                                                        <td className="p-4">
                                                            <Badge className={getStatusColor(user.status)}>
                                                                {user.status === 'active' ? (
                                                                    <CheckCircle className="w-3 h-3 mr-1" />
                                                                ) : user.status === 'inactive' ? (
                                                                    <XCircle className="w-3 h-3 mr-1" />
                                                                ) : (
                                                                    <Clock className="w-3 h-3 mr-1" />
                                                                )}
                                                                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                                            </Badge>
                                                        </td>
                                                        <td className="p-4">
                                                            <div className="text-sm text-[#0F172A] dark:text-[#E5E7EB]">
                                                                {user.eventsAttended} events
                                                            </div>
                                                            <div className="text-xs text-[#475569] dark:text-[#94A3B8]">
                                                                {user.points} points
                                                            </div>
                                                        </td>
                                                        <td className="p-4">
                                                            <div className="flex items-center gap-2">
                                                                <Button variant="ghost" size="sm">
                                                                    <Eye className="w-4 h-4" />
                                                                </Button>
                                                                <Button variant="ghost" size="sm">
                                                                    <Edit className="w-4 h-4" />
                                                                </Button>
                                                                <Button variant="ghost" size="sm">
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Events Tab */}
                    <TabsContent value="events" className="space-y-6">
                        <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                            <CardHeader>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <CardTitle className="text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                            Event Management
                                        </CardTitle>
                                        <CardDescription className="text-[#475569] dark:text-[#94A3B8]">
                                            Create and manage all association events
                                        </CardDescription>
                                    </div>
                                    <Button className="gap-2">
                                        <Plus className="w-4 h-4" />
                                        Create New Event
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {events.map((event) => (
                                        <Card key={event.id} className="border-[#E5E7EB] dark:border-[#1E293B]">
                                            <CardContent className="p-4">
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <Badge className={getEventStatusColor(event.status)}>
                                                            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                                        </Badge>
                                                        <div className="text-sm text-[#475569] dark:text-[#94A3B8]">
                                                            {event.registered}/{event.capacity}
                                                        </div>
                                                    </div>
                                                    <h4 className="font-bold text-[#0F172A] dark:text-[#E5E7EB] line-clamp-2">
                                                        {event.title}
                                                    </h4>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center text-sm text-[#475569] dark:text-[#94A3B8]">
                                                            <Calendar className="w-4 h-4 mr-1" />
                                                            {event.date}
                                                        </div>
                                                        <div className="text-sm text-[#475569] dark:text-[#94A3B8]">
                                                            Organizer: {event.organizer}
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 pt-2">
                                                        <Button size="sm" variant="outline" className="flex-1">
                                                            <Eye className="w-4 h-4 mr-1" />
                                                            View
                                                        </Button>
                                                        <Button size="sm" variant="outline" className="flex-1">
                                                            <Edit className="w-4 h-4 mr-1" />
                                                            Edit
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

                    {/* Announcements Tab */}
                    <TabsContent value="announcements" className="space-y-6">
                        <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                            <CardHeader>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <CardTitle className="text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                            Announcements
                                        </CardTitle>
                                        <CardDescription className="text-[#475569] dark:text-[#94A3B8]">
                                            Create and manage system announcements
                                        </CardDescription>
                                    </div>
                                    <Button className="gap-2">
                                        <Plus className="w-4 h-4" />
                                        New Announcement
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {announcements.map((announcement) => (
                                        <Card key={announcement.id} className="border-[#E5E7EB] dark:border-[#1E293B]">
                                            <CardContent className="p-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="space-y-2 flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <h4 className="font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                                                {announcement.title}
                                                            </h4>
                                                            <Badge variant="outline" className={
                                                                announcement.type === 'urgent' ? "border-[#EF4444] text-[#EF4444]" :
                                                                    announcement.type === 'important' ? "border-[#F59E0B] text-[#F59E0B]" :
                                                                        "border-[#2563EB] text-[#2563EB]"
                                                            }>
                                                                {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                                                            </Badge>
                                                            <Badge className={
                                                                announcement.status === 'published' ? "bg-[#22C55E]/10 text-[#22C55E]" :
                                                                    "bg-[#F59E0B]/10 text-[#F59E0B]"
                                                            }>
                                                                {announcement.status}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-[#475569] dark:text-[#94A3B8]">
                                                            {announcement.content}
                                                        </p>
                                                        <div className="text-xs text-[#475569] dark:text-[#94A3B8]">
                                                            Created by {announcement.createdBy} on {announcement.createdAt}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 ml-4">
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            <Trash2 className="w-4 h-4" />
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

                    {/* Analytics Tab */}
                    <TabsContent value="analytics" className="space-y-6">
                        <div className="grid lg:grid-cols-2 gap-6">
                            <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                        User Growth
                                    </CardTitle>
                                    <CardDescription className="text-[#475569] dark:text-[#94A3B8]">
                                        Monthly user registration trends
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-64 flex items-center justify-center border border-[#E5E7EB] dark:border-[#1E293B] rounded-lg">
                                        <div className="text-center">
                                            <BarChart3 className="w-16 h-16 mx-auto mb-2 text-[#94A3B8]" />
                                            <p className="text-[#475569] dark:text-[#94A3B8]">
                                                Chart visualization would appear here
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                        Event Participation
                                    </CardTitle>
                                    <CardDescription className="text-[#475569] dark:text-[#94A3B8]">
                                        Most popular event categories
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-64 flex items-center justify-center border border-[#E5E7EB] dark:border-[#1E293B] rounded-lg">
                                        <div className="text-center">
                                            <PieChart className="w-16 h-16 mx-auto mb-2 text-[#94A3B8]" />
                                            <p className="text-[#475569] dark:text-[#94A3B8]">
                                                Pie chart visualization would appear here
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                    Export Data
                                </CardTitle>
                                <CardDescription className="text-[#475569] dark:text-[#94A3B8]">
                                    Download reports and analytics data
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {[
                                        { label: "User List", format: "CSV" },
                                        { label: "Event Registrations", format: "Excel" },
                                        { label: "Financial Reports", format: "PDF" },
                                        { label: "System Logs", format: "CSV" },
                                    ].map((report, index) => (
                                        <Card key={index} className="border-[#E5E7EB] dark:border-[#1E293B]">
                                            <CardContent className="p-4">
                                                <div className="space-y-3">
                                                    <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 dark:bg-[#2563EB]/20 flex items-center justify-center">
                                                        <FileText className="w-5 h-5 text-[#2563EB]" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                                            {report.label}
                                                        </h4>
                                                        <p className="text-sm text-[#475569] dark:text-[#94A3B8]">
                                                            {report.format} Format
                                                        </p>
                                                    </div>
                                                    <Button variant="outline" size="sm" className="w-full gap-2">
                                                        <Download className="w-4 h-4" />
                                                        Download
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Settings Tab */}
                    <TabsContent value="settings" className="space-y-6">
                        <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                    System Settings
                                </CardTitle>
                                <CardDescription className="text-[#475569] dark:text-[#94A3B8]">
                                    Configure system preferences and features
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
                                        General Settings
                                    </h3>
                                    <div className="space-y-4">
                                        {[
                                            { label: "Enable User Registration", description: "Allow new users to register", enabled: true },
                                            { label: "Email Notifications", description: "Send email notifications to users", enabled: true },
                                            { label: "Maintenance Mode", description: "Put system in maintenance mode", enabled: false },
                                            { label: "Event Registration", description: "Allow event registration", enabled: true },
                                        ].map((setting, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <div>
                                                    <div className="font-medium text-[#0F172A] dark:text-[#E5E7EB]">
                                                        {setting.label}
                                                    </div>
                                                    <div className="text-sm text-[#475569] dark:text-[#94A3B8]">
                                                        {setting.description}
                                                    </div>
                                                </div>
                                                <Switch checked={setting.enabled} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
                                        Security Settings
                                    </h3>
                                    <div className="space-y-4">
                                        {[
                                            { label: "Two-Factor Authentication", description: "Require 2FA for admin access", enabled: false },
                                            { label: "Session Timeout", description: "Auto logout after 30 minutes", enabled: true },
                                            { label: "IP Whitelisting", description: "Restrict access to specific IPs", enabled: false },
                                        ].map((setting, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <div>
                                                    <div className="font-medium text-[#0F172A] dark:text-[#E5E7EB]">
                                                        {setting.label}
                                                    </div>
                                                    <div className="text-sm text-[#475569] dark:text-[#94A3B8]">
                                                        {setting.description}
                                                    </div>
                                                </div>
                                                <Switch checked={setting.enabled} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex gap-4">
                                    <Button>Save Settings</Button>
                                    <Button variant="outline">Reset to Default</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}