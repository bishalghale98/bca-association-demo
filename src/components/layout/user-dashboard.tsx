'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import BottomNav from '../user-dashboard/bottom-nav'
import { Bell, BookOpen, Building, Calendar, ChevronLeft, ChevronRight, FileText, LayoutDashboard, LogOut, Mail, MessageSquare, Settings, Shield, Trophy, Users } from 'lucide-react'
import Header from '../user-dashboard/header'

interface UserDashboardLayoutProps {
    children: React.ReactNode
    unreadNotifications: number
    user: any
    handleLogout: () => void
}

const UserDashboardLayout = ({
    children,
    unreadNotifications,
    user,
    handleLogout,
}: UserDashboardLayoutProps) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const pathname = usePathname()

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
        { id: 'form', label: 'form', icon: Users, href: '/dashboard/form' },
    ]

    const footerItems = [
        { id: 'resources', label: 'Resources', icon: BookOpen, href: '/resources', external: true },
        { id: 'help', label: 'Help Center', icon: Mail, href: '/help', external: true },
    ]

    // Find current page title based on pathname
    const getCurrentPageTitle = () => {
        const currentItem = menuItems.find(item =>
            pathname === item.href || pathname.startsWith(`${item.href}/`)
        )
        return currentItem?.label || 'Dashboard'
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white dark:from-[#020617] dark:to-[#0F172A]">
            {/* Desktop Sidebar - Hidden on mobile, shown on md and above */}
            <aside
                className={`hidden md:block fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'w-16' : 'w-64'
                    } border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg`}
            >
                <div className="flex h-full flex-col">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                        <Link href="/dashboard" className="flex items-center gap-2">
                            {!sidebarCollapsed && (
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-md">
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
                                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

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

                    {/* Sidebar Footer - User Profile */}
                    <div className="p-3 border-t border-slate-200 dark:border-slate-800">
                        <div className={`flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer ${sidebarCollapsed ? 'justify-center' : ''
                            }`}>
                            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 text-white font-semibold text-sm shadow-md">
                                {user.avatar}
                            </div>
                            {!sidebarCollapsed && (
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                        {user.email}
                                    </p>
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
                className={`transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
                    }`}
            >
                {/* Top Header */}
                <Header getCurrentPageTitle={getCurrentPageTitle} handleLogout={handleLogout} unreadNotifications={unreadNotifications} user={user} />

                {/* Main Content Area */}
                <div className="max-w-7xl mb-20 md:mb-0 mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-4 sm:py-6 md:py-8">
                    {children}
                </div>

                {/* Mobile Bottom Navigation */}
                <BottomNav />
            </div>
        </div>
    )
}

export default UserDashboardLayout