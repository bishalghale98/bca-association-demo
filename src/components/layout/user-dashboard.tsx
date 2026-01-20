'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import BottomNav from '../user-dashboard/bottom-nav'
import { BookOpen, ChevronLeft, ChevronRight, LayoutDashboard, LogOut, Mail, Shield, Users } from 'lucide-react'
import Header from '../user-dashboard/header'
import { Notification } from '@/app/(protected)/dashboard/page'
import { signOut, useSession } from 'next-auth/react'

interface UserDashboardLayoutProps {
    children?: React.ReactNode
}

const UserDashboardLayout = ({
    children,
}: UserDashboardLayoutProps) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const pathname = usePathname()

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
        { id: 'profile', label: 'profile', icon: Users, href: '/dashboard/profile' },
        { id: 'Events', label: 'Events', icon: Users, href: '/dashboard/events' },

    ]

    const footerItems = [
        { id: 'resources', label: 'Resources', icon: BookOpen, href: '/resources', external: true },
        { id: 'help', label: 'Help Center', icon: Mail, href: '/help', external: true },
    ]

    const notifications: Notification[] = [
        { id: 1, title: "Event Registration Confirmed", message: "Your registration for Annual Hackathon is confirmed", type: "event", time: "2 hours ago", read: false },
        { id: 2, title: "Certificate Available", message: "Download your certificate for AI Workshop", type: "academic", time: "1 day ago", read: false },
        { id: 3, title: "Membership Renewal", message: "Your membership expires in 15 days", type: "membership", time: "2 days ago", read: true },
        { id: 4, title: "System Maintenance", message: "Portal will be down for maintenance", type: "system", time: "3 days ago", read: true },
    ];

    const unreadNotifications = notifications.filter(n => !n.read).length;

    const { data: session, status } = useSession();

    const handleLogout = async () => {
        await signOut()
    }

    // Find current page title based on pathname
    const getCurrentPageTitle = () => {
        const currentItem = menuItems.find(item =>
            pathname === item.href || pathname.startsWith(`${item.href}/`)
        )
        return currentItem?.label || 'Dashboard'
    }


    // Redirect to login if unauthenticated
    if (status === "unauthenticated") {
        return (
            <div className="min-h-screen bg-linear-to-b from-[#F8FAFC] to-white dark:from-[#020617] dark:to-[#0F172A] flex items-center justify-center">
                <div className="text-center max-w-md mx-4">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-lg">
                        <Shield className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                        Session Expired
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        Your session has expired. Please log in again to continue.
                    </p>
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
                    >
                        <LogOut className="w-5 h-5" />
                        Go to Login
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-[#F8FAFC] to-white dark:from-[#020617] dark:to-[#0F172A]">
            {/* Desktop Sidebar - Hidden on mobile, shown on md and above */}
            <aside
                className={`hidden lg:block fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'w-16' : 'w-64'
                    } border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg`}
            >
                <div className="flex h-full flex-col">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                        <Link href="/dashboard" className="flex items-center gap-2">
                            {!sidebarCollapsed && (
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-blue-600 to-blue-700 shadow-md">
                                        <Shield className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                            BCA Association
                                        </span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">
                                            Student Portal
                                        </span>
                                    </div>
                                </div>
                            )}
                            {sidebarCollapsed && (
                                <div className="flex items-center justify-center w-full">
                                    <Shield className="w-6 h-6 text-blue-600" />
                                </div>
                            )}
                        </Link>
                    </div>

                    {/* Sidebar Content */}
                    <div className="flex-1 overflow-y-auto py-4 px-2">
                        {/* Main Navigation */}
                        <div className="space-y-1">
                            <div className={`px-3 py-2 ${sidebarCollapsed ? 'hidden' : 'block'}`}>
                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    Main Menu
                                </p>
                            </div>
                            {menuItems.map((item) => {
                                const Icon = item.icon
                                const isActive =
                                    pathname === item.href ||
                                    (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`))
                                return (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive
                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                                            } ${sidebarCollapsed ? 'justify-center' : ''}`}
                                        title={sidebarCollapsed ? item.label : ''}
                                    >
                                        <Icon className={`${sidebarCollapsed ? 'w-5 h-5' : 'w-5 h-5'} shrink-0`} />
                                        {!sidebarCollapsed && (
                                            <span className="text-sm font-medium">{item.label}</span>
                                        )}
                                    </Link>
                                )
                            })}
                        </div>

                        {/* Footer Links */}
                        <div className="mt-6 space-y-1">
                            <div className={`px-3 py-2 ${sidebarCollapsed ? 'hidden' : 'block'}`}>
                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    Support
                                </p>
                            </div>
                            {footerItems.map((item) => {
                                const Icon = item.icon
                                return (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        target={item.external ? "_blank" : undefined}
                                        rel={item.external ? "noopener noreferrer" : undefined}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 ${sidebarCollapsed ? 'justify-center' : ''
                                            }`}
                                        title={sidebarCollapsed ? item.label : ''}
                                    >
                                        <Icon className="w-5 h-5 shrink-0" />
                                        {!sidebarCollapsed && (
                                            <span className="text-sm font-medium">{item.label}</span>
                                        )}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    {/* Sidebar Footer - User Profile with Loading State */}
                    <div className="p-3 border-t border-slate-200 dark:border-slate-800">
                        <div className={`flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer ${sidebarCollapsed ? 'justify-center' : ''}`}>
                            {status === "authenticated" && session ? (
                                <>
                                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-linear-to-br from-violet-600 to-purple-600 text-white font-semibold text-sm shadow-md">
                                        {session.user.avatarUrl || session.user.name?.charAt(0) || 'U'}
                                    </div>
                                    {!sidebarCollapsed && (
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                                                {session.user.name || 'User'}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                                {session.user?.email || 'No email'}
                                            </p>
                                        </div>
                                    )}
                                </>
                            ) : (
                                // Loading skeleton for user profile
                                <div className="flex items-center gap-3 w-full">
                                    <div className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
                                    {!sidebarCollapsed && (
                                        <div className="flex-1 min-w-0 space-y-1">
                                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/4"></div>
                                            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/2"></div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Collapse Toggle - Only on desktop */}
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-md"
                    >
                        {sidebarCollapsed ? (
                            <ChevronRight className="w-4 h-4" />
                        ) : (
                            <ChevronLeft className="w-4 h-4" />
                        )}
                    </button>
                </div>
            </aside>

            {/* Main Content - Adjust margin based on sidebar state and screen size */}
            <div
                className={`transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
                    }`}
            >
                {/* Top Header - Pass session and status to handle loading there too */}
                <Header
                    getCurrentPageTitle={getCurrentPageTitle}
                    handleLogout={handleLogout}
                    unreadNotifications={unreadNotifications}
                    session={session}
                />

                {/* Main Content Area */}
                <div className="max-w-7xl mb-20 lg:mb-0 mx-auto px-3 sm:px-4  lg:px-8 xl:px-10 py-4 sm:py-6 lg:py-8">
                    {children}
                </div>

                {/* Mobile Bottom Navigation */}
                <BottomNav />
            </div>
        </div>
    )
}

export default UserDashboardLayout