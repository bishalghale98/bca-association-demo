'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { UserRole } from '@/types/user/enums'
import {
    BookOpen, ChevronLeft, ChevronRight, LayoutDashboard,
    LogOut, Mail, Shield, Users, Settings, FileText,
    BarChart3, Bell, Calendar, Database, Home, Menu, X,
    UserCog, Settings as SettingsIcon, FileArchive, AlertCircle,
    ChevronDown, Search, HelpCircle, Download, Upload,
    ShieldCheck, Server, Globe, Key, Cpu, Zap,
    Activity, Lock, Eye, Filter, Grid, Layers,
    RefreshCw, CheckCircle, XCircle, AlertTriangle
} from 'lucide-react'

// ShadCN Components
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Custom Components
import { SystemHealthChart } from '@/components/super-admin/system-health-chart'
import { RecentActivities } from '@/components/super-admin/recent-activities'
import { AdminList } from '@/components/super-admin/admin-list'
import { ApiUsageChart } from '@/components/super-admin/api-usage-chart'

interface SuperAdminDashboardProps {
    children?: React.ReactNode
}

interface SystemMetric {
    id: string
    name: string
    value: number
    max: number
    unit: string
    status: 'healthy' | 'warning' | 'critical'
    trend: 'up' | 'down' | 'stable'
}

export interface AdminUser {
    id: string
    name: string
    email: string
    role: UserRole
    lastActive: string
    status: 'active' | 'inactive' | 'suspended'
    permissions: string[]
}

// Mobile Bottom Navigation Component
const SuperAdminBottomNav = () => {
    const pathname = usePathname()

    const navItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard, href: '/super-admin' },
        { id: 'system', label: 'System', icon: Server, href: '/super-admin/system' },
        { id: 'admins', label: 'Admins', icon: ShieldCheck, href: '/super-admin/admins' },
        { id: 'audit', label: 'Audit', icon: Eye, href: '/super-admin/audit' },
        { id: 'profile', label: 'Profile', icon: UserCog, href: '/super-admin/profile' },
    ]

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
            <div className="flex items-center justify-around h-16 px-2">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

                    return (
                        <TooltipProvider key={item.id}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={item.href}
                                        className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 relative group ${isActive
                                            ? 'text-primary'
                                            : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        <div className="relative p-2">
                                            <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                                            {isActive && (
                                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                                            )}
                                        </div>
                                        <span className="text-xs font-medium transition-all duration-300 group-hover:font-semibold">
                                            {item.label}
                                        </span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                    <p>{item.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )
                })}
            </div>
        </nav>
    )
}

// Mobile Header Component
const MobileHeader = ({
    getCurrentPageTitle,
    handleLogout,
    session,
    unreadNotifications,
    systemStatus
}: any) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const mobileMenuItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard, href: '/super-admin' },
        { id: 'system', label: 'System Health', icon: Server, href: '/super-admin/system' },
        { id: 'admins', label: 'Admin Management', icon: ShieldCheck, href: '/super-admin/admins' },
        { id: 'audit', label: 'Audit Logs', icon: Eye, href: '/super-admin/audit' },
        { id: 'api', label: 'API Management', icon: Cpu, href: '/super-admin/api' },
        { id: 'security', label: 'Security', icon: Lock, href: '/super-admin/security' },
        { id: 'settings', label: 'Settings', icon: SettingsIcon, href: '/super-admin/settings' },
    ]

    const quickAccessItems = [
        { id: 'monitoring', label: 'Live Monitoring', icon: Activity, href: '/super-admin/monitoring' },
        { id: 'backup', label: 'Backup & Restore', icon: FileArchive, href: '/super-admin/backup' },
        { id: 'maintenance', label: 'Maintenance', icon: Settings, href: '/super-admin/maintenance' },
    ]

    const pathname = usePathname()

    return (
        <header className="lg:hidden sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
                {/* Left side - Menu button and title */}
                <div className="flex items-center gap-3">
                    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent
                            side="left"
                            className="w-[280px] sm:w-[320px] p-0 h-screen flex flex-col"
                        >
                            {/* Fixed Header */}
                            <SheetHeader className="p-6 pb-4 text-left border-b">
                                <SheetTitle className="flex items-center gap-2">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-400">
                                        <ShieldCheck className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">Super Admin</p>
                                        <p className="text-xs text-muted-foreground">System Control</p>
                                    </div>
                                </SheetTitle>
                            </SheetHeader>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto px-4 py-2">
                                {/* System Status */}
                                <Card className="mb-4">
                                    <CardContent className="p-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-medium">System Status</span>
                                            <Badge variant={systemStatus === 'healthy' ? 'default' : 'destructive'} className="text-xs">
                                                {systemStatus === 'healthy' ? 'Healthy' : 'Issues'}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${systemStatus === 'healthy' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                                            <span className="text-xs text-muted-foreground">All systems operational</span>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* User info */}
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted mb-4">
                                    <Avatar>
                                        <AvatarImage src={session?.user?.image} />
                                        <AvatarFallback className="bg-gradient-to-br from-purple-600 to-purple-400">
                                            {session?.user?.name?.charAt(0) || 'SA'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">
                                            {session?.user?.name || 'Super Admin'}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {session?.user?.email || 'superadmin@example.com'}
                                        </p>
                                        <Badge variant="outline" className="mt-1 text-[10px]">SUPER ADMIN</Badge>
                                    </div>
                                </div>

                                {/* Navigation */}
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
                                        Control Panel
                                    </p>

                                    {mobileMenuItems.map((item) => {
                                        const Icon = item.icon
                                        const isActive =
                                            pathname === item.href ||
                                            pathname.startsWith(`${item.href}/`)

                                        return (
                                            <Link
                                                key={item.id}
                                                href={item.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive
                                                    ? 'bg-purple-600 text-white'
                                                    : 'hover:bg-accent'
                                                    }`}
                                            >
                                                <Icon className="w-4 h-4" />
                                                <span className="text-sm">{item.label}</span>
                                            </Link>
                                        )
                                    })}
                                </div>

                                {/* Quick Access */}
                                <div className="mt-6 space-y-1">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
                                        Quick Access
                                    </p>

                                    {quickAccessItems.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={item.href}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-accent"
                                        >
                                            <item.icon className="w-4 h-4" />
                                            <span className="text-sm">{item.label}</span>
                                        </Link>
                                    ))}
                                </div>

                                {/* Emergency Actions */}
                                <div className="mt-6 pt-4 border-t">
                                    <div className="space-y-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full justify-start text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                                            onClick={() => {
                                                // Emergency maintenance mode
                                                setMobileMenuOpen(false)
                                            }}
                                        >
                                            <AlertTriangle className="w-4 h-4 mr-2" />
                                            Maintenance Mode
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                                            onClick={() => {
                                                // Emergency shutdown
                                                setMobileMenuOpen(false)
                                            }}
                                        >
                                            <XCircle className="w-4 h-4 mr-2" />
                                            Emergency Shutdown
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                                            onClick={handleLogout}
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>

                    <div>
                        <h1 className="text-lg font-semibold">{getCurrentPageTitle()}</h1>
                        <p className="text-xs text-muted-foreground hidden sm:block">Super Admin Panel</p>
                    </div>
                </div>

                {/* Right side - System status and user */}
                <div className="flex items-center gap-2">
                    {/* System Status Indicator */}
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-muted">
                        <div className={`w-2 h-2 rounded-full ${systemStatus === 'healthy' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                        <span className="text-xs font-medium">
                            {systemStatus === 'healthy' ? 'All Systems OK' : 'System Alert'}
                        </span>
                    </div>

                    {/* User dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={session?.user?.image} />
                                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-purple-400">
                                        {session?.user?.name?.charAt(0) || 'SA'}
                                    </AvatarFallback>
                                </Avatar>
                                {systemStatus !== 'healthy' && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background"></div>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-purple-600 text-white">SUPER ADMIN</Badge>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <UserCog className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Key className="mr-2 h-4 w-4" />
                                <span>Security</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>System Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}

// Desktop Sidebar Component
const DesktopSidebar = ({
    sidebarCollapsed,
    setSidebarCollapsed,
    pathname,
    menuItems,
    footerItems,
    session,
    systemMetrics
}: any) => {
    return (
        <aside
            className={`hidden lg:block fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out border-r bg-background shadow-lg ${sidebarCollapsed ? 'w-[70px]' : 'w-64'
                }`}
        >
            <div className="flex h-full flex-col">
                {/* Sidebar Header */}
                <div className={`flex items-center justify-between p-4 border-b transition-all duration-300 ${sidebarCollapsed ? 'px-3' : ''
                    }`}>
                    <Link href="/super-admin" className="flex items-center gap-2">
                        {!sidebarCollapsed ? (
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 shadow-sm">
                                    <ShieldCheck className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex flex-col transition-all duration-300 overflow-hidden">
                                    <span className="text-sm font-bold whitespace-nowrap">Super Admin</span>
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">System Control</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center w-full">
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 shadow-sm">
                                    <ShieldCheck className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        )}
                    </Link>
                </div>

                {/* System Metrics */}
                {!sidebarCollapsed && systemMetrics && (
                    <Card className="mx-3 mt-4 transition-all duration-300">
                        <CardContent className="p-3">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium">System Health</span>
                                    <Badge variant={
                                        systemMetrics.overallHealth > 80 ? 'default' :
                                            systemMetrics.overallHealth > 60 ? 'secondary' : 'destructive'
                                    } className="text-xs">
                                        {systemMetrics.overallHealth}%
                                    </Badge>
                                </div>
                                <Progress value={systemMetrics.overallHealth} className="h-1.5" />
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="text-center">
                                        <p className="text-xs text-muted-foreground">CPU</p>
                                        <p className="text-xs font-semibold">{systemMetrics.cpu}%</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-muted-foreground">Memory</p>
                                        <p className="text-xs font-semibold">{systemMetrics.memory}%</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Sidebar Content */}
                <div className="flex-1 overflow-y-auto py-4 px-2">
                    {/* Main Navigation */}
                    <div className="space-y-1">
                        <div className={`px-3 py-2 transition-all duration-300 ${sidebarCollapsed ? 'opacity-0 h-0 py-0 overflow-hidden' : 'opacity-100'}`}>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                                Control Panel
                            </p>
                        </div>
                        {menuItems.map((item: any) => {
                            const Icon = item.icon
                            const isActive =
                                pathname === item.href ||
                                (item.href !== "/super-admin" && pathname.startsWith(`${item.href}/`))

                            return (
                                <TooltipProvider key={item.id}>
                                    <Tooltip delayDuration={0}>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href={item.href}
                                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive
                                                    ? 'bg-purple-600 text-white shadow-sm'
                                                    : 'hover:bg-accent'
                                                    } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                                            >
                                                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : ''}`} />
                                                {!sidebarCollapsed && (
                                                    <span className="text-sm font-medium whitespace-nowrap transition-all duration-300">
                                                        {item.label}
                                                    </span>
                                                )}
                                                {isActive && !sidebarCollapsed && (
                                                    <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
                                                )}
                                                {!sidebarCollapsed && item.badge && (
                                                    <Badge variant="outline" className="ml-auto text-[10px] px-1.5 py-0">{item.badge}</Badge>
                                                )}
                                            </Link>
                                        </TooltipTrigger>
                                        {sidebarCollapsed && (
                                            <TooltipContent side="right">
                                                <p>{item.label}</p>
                                            </TooltipContent>
                                        )}
                                    </Tooltip>
                                </TooltipProvider>
                            )
                        })}
                    </div>

                    {/* Emergency Actions */}
                    {!sidebarCollapsed && (
                        <div className="mt-6 space-y-1 transition-all duration-300">
                            <div className="px-3 py-2">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                                    Emergency
                                </p>
                            </div>
                            <div className="space-y-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full justify-start text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                                >
                                    <AlertTriangle className="w-3 h-3 mr-2" />
                                    <span className="whitespace-nowrap">Maintenance Mode</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                                >
                                    <XCircle className="w-3 h-3 mr-2" />
                                    <span className="whitespace-nowrap">Emergency Stop</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full justify-start text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                >
                                    <RefreshCw className="w-3 h-3 mr-2" />
                                    <span className="whitespace-nowrap">Force Restart</span>
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Footer Links */}
                    <div className="mt-6 space-y-1">
                        <div className={`px-3 py-2 transition-all duration-300 ${sidebarCollapsed ? 'opacity-0 h-0 py-0 overflow-hidden' : 'opacity-100'}`}>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                                Support
                            </p>
                        </div>
                        {footerItems.map((item: any) => {
                            const Icon = item.icon
                            return (
                                <TooltipProvider key={item.id}>
                                    <Tooltip delayDuration={0}>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-accent transition-all duration-200 ${sidebarCollapsed ? 'justify-center px-0' : ''
                                                    }`}
                                            >
                                                <Icon className="w-4 h-4" />
                                                {!sidebarCollapsed && (
                                                    <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                                                )}
                                            </Link>
                                        </TooltipTrigger>
                                        {sidebarCollapsed && (
                                            <TooltipContent side="right">
                                                <p>{item.label}</p>
                                            </TooltipContent>
                                        )}
                                    </Tooltip>
                                </TooltipProvider>
                            )
                        })}
                    </div>
                </div>

                {/* Sidebar Footer - User Profile */}
                <div className={`p-3 border-t transition-all duration-300 ${sidebarCollapsed ? 'px-2' : ''}`}>
                    <div className={`flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-all cursor-pointer ${sidebarCollapsed ? 'justify-center' : ''
                        }`}>
                        <div className="relative">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={session?.user?.image} />
                                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-purple-400">
                                    {session?.user?.name?.charAt(0) || 'SA'}
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                        </div>
                        {!sidebarCollapsed && (
                            <div className="flex-1 min-w-0 transition-all duration-300 overflow-hidden">
                                <p className="text-sm font-medium truncate whitespace-nowrap">{session?.user?.name || 'Super Admin'}</p>
                                <p className="text-xs text-muted-foreground truncate whitespace-nowrap">SUPER ADMIN</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Collapse Toggle */}
                <Button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    variant="outline"
                    size="icon"
                    className={`absolute -right-3 top-6 h-6 w-6 rounded-full border shadow-md bg-background transition-all duration-300 ${sidebarCollapsed ? '' : ''
                        }`}
                >
                    {sidebarCollapsed ? (
                        <ChevronRight className="h-3 w-3" />
                    ) : (
                        <ChevronLeft className="h-3 w-3" />
                    )}
                </Button>
            </div>
        </aside>
    )
}

// Desktop Header Component
const DesktopHeader = ({
    getCurrentPageTitle,
    handleLogout,
    session,
    sidebarCollapsed,
    systemMetrics
}: any) => {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <header className="hidden lg:block fixed top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out"
            style={{
                left: sidebarCollapsed ? '70px' : '256px',
                width: sidebarCollapsed ? 'calc(100% - 70px)' : 'calc(100% - 256px)'
            }}
        >
            <div className="h-14 flex items-center justify-between px-6">
                {/* Left side */}
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-lg font-semibold transition-all duration-300">{getCurrentPageTitle()}</h1>
                        <p className="text-sm text-muted-foreground hidden md:block transition-all duration-300">
                            Complete system control and monitoring
                        </p>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    {/* Search bar */}
                    <div className="hidden md:block relative transition-all duration-300"
                        style={{ width: sidebarCollapsed ? '280px' : '256px' }}>
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search system logs, users, or actions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 bg-muted/50 transition-all duration-300"
                        />
                    </div>

                    {/* System Stats */}
                    <div className="hidden md:flex items-center gap-6 transition-all duration-300">
                        <div className="flex items-center gap-2">
                            <div className="text-center">
                                <p className="text-xs text-muted-foreground">CPU</p>
                                <div className="flex items-center gap-1">
                                    <Cpu className="w-3 h-3" />
                                    <p className="text-sm font-semibold">{systemMetrics?.cpu || 0}%</p>
                                </div>
                            </div>
                            <Progress value={systemMetrics?.cpu || 0} className="w-16 h-1.5" />
                        </div>
                        <Separator orientation="vertical" className="h-6" />
                        <div className="flex items-center gap-2">
                            <div className="text-center">
                                <p className="text-xs text-muted-foreground">Memory</p>
                                <div className="flex items-center gap-1">
                                    <Database className="w-3 h-3" />
                                    <p className="text-sm font-semibold">{systemMetrics?.memory || 0}%</p>
                                </div>
                            </div>
                            <Progress value={systemMetrics?.memory || 0} className="w-16 h-1.5" />
                        </div>
                        <Separator orientation="vertical" className="h-6" />
                        <div className="text-center">
                            <p className="text-xs text-muted-foreground">Active Admins</p>
                            <p className="text-sm font-semibold">12</p>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Zap className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                <span>Clear Cache</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <FileArchive className="mr-2 h-4 w-4" />
                                <span>Create Backup</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Activity className="mr-2 h-4 w-4" />
                                <span>Run Diagnostics</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                <span>System Check</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* User Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="gap-2 px-2">
                                <div className="relative">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={session?.user?.image} />
                                        <AvatarFallback className="bg-gradient-to-br from-purple-600 to-purple-400">
                                            {session?.user?.name?.charAt(0) || 'SA'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background"></div>
                                </div>
                                <div className="hidden md:block text-left transition-all duration-300">
                                    <p className="text-sm font-medium truncate">{session?.user?.name || 'Super Admin'}</p>
                                    <p className="text-xs text-muted-foreground truncate">System Administrator</p>
                                </div>
                                <ChevronDown className="h-4 w-4 opacity-50 hidden md:block transition-all duration-300" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel className="flex items-center justify-between">
                                <span>System Admin</span>
                                <Badge variant="outline" className="bg-purple-600 text-white">SUPER</Badge>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <UserCog className="mr-2 h-4 w-4" />
                                <span>My Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Key className="mr-2 h-4 w-4" />
                                <span>Security Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Global Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>Audit Logs</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}


const SuperAdminDashboard = ({ children }: SuperAdminDashboardProps) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const pathname = usePathname()

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard, href: '/super-admin' },
        { id: 'system', label: 'System Health', icon: Server, href: '/super-admin/system', badge: '3' },
        { id: 'admins', label: 'Admin Management', icon: ShieldCheck, href: '/super-admin/admins' },
        { id: 'audit', label: 'Audit Logs', icon: Eye, href: '/super-admin/audit', badge: 'New' },
        { id: 'api', label: 'API Management', icon: Cpu, href: '/super-admin/api' },
        { id: 'security', label: 'Security', icon: Lock, href: '/super-admin/security' },
        { id: 'database', label: 'Database', icon: Database, href: '/super-admin/database' },
        { id: 'settings', label: 'Global Settings', icon: Settings, href: '/super-admin/settings' },
    ]

    const footerItems = [
        { id: 'documentation', label: 'Documentation', icon: BookOpen, href: '/docs/super-admin', external: true },
        { id: 'support', label: 'Support', icon: Mail, href: '/support', external: true },
        { id: 'status', label: 'Status Page', icon: Globe, href: '/status', external: true },
    ]

    const systemMetrics = {
        overallHealth: 94,
        cpu: 65,
        memory: 78,
        storage: 45,
        network: 92,
        uptime: 99.9
    }

    const unreadNotifications = 3
    const { data: session, status } = useSession()

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/login' })
    }

    const getCurrentPageTitle = () => {
        const currentItem = menuItems.find(item =>
            pathname === item.href || pathname.startsWith(`${item.href}/`)
        )
        return currentItem?.label || 'Super Admin Dashboard'
    }

    // Auth checks
    if (status === "unauthenticated") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
                <Card className="max-w-md w-full">
                    <CardContent className="pt-6 text-center space-y-4">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center">
                            <ShieldCheck className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Super Admin Access Required</h2>
                            <p className="text-muted-foreground mt-2">
                                You need super administrator privileges to access this panel.
                            </p>
                        </div>
                        <Button asChild className="w-full">
                            <Link href="/login">
                                <LogOut className="mr-2 h-4 w-4" />
                                Go to Login
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const isSuperAdmin = session?.user?.role === UserRole.SUPER_ADMIN

    if (!isSuperAdmin && status === "authenticated") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
                <Card className="max-w-md w-full">
                    <CardContent className="pt-6 text-center space-y-4">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-600 to-amber-400 flex items-center justify-center">
                            <AlertCircle className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Access Denied</h2>
                            <p className="text-muted-foreground mt-2">
                                You don't have super administrator permissions.
                            </p>
                        </div>
                        <Button asChild className="w-full">
                            <Link href="/admin">
                                Go to Admin Panel
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const systemStatus = systemMetrics.overallHealth > 80 ? 'healthy' : 'warning'

    return (
        <TooltipProvider>
            <div className="min-h-screen bg-background">
                {/* Mobile Header */}
                <MobileHeader
                    getCurrentPageTitle={getCurrentPageTitle}
                    handleLogout={handleLogout}
                    session={session}
                    unreadNotifications={unreadNotifications}
                    systemStatus={systemStatus}
                />

                {/* Desktop Sidebar */}
                <DesktopSidebar
                    sidebarCollapsed={sidebarCollapsed}
                    setSidebarCollapsed={setSidebarCollapsed}
                    pathname={pathname}
                    menuItems={menuItems}
                    footerItems={footerItems}
                    session={session}
                    systemMetrics={systemMetrics}
                />

                {/* Desktop Header */}
                <DesktopHeader
                    getCurrentPageTitle={getCurrentPageTitle}
                    handleLogout={handleLogout}
                    session={session}
                    sidebarCollapsed={sidebarCollapsed}
                    systemMetrics={systemMetrics}
                />

                {/* Main Content */}
                <div
                    className={`pt-14 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'lg:ml-[70px]' : 'lg:ml-64'
                        }`}
                >
                    <main className="min-h-screen">
                        {/* Content area with responsive padding */}
                        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 mb-16 lg:mb-0">
                            <div className="max-w-7xl mx-auto">
                                {/* Page header with breadcrumb for desktop */}
                                <div className="hidden lg:block mt-4 mb-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Link href="/super-admin" className="hover:text-foreground transition-colors">
                                                Super Admin
                                            </Link>
                                            <ChevronRight className="h-3 w-3" />
                                            <span className="text-foreground font-medium">{getCurrentPageTitle()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Select defaultValue="today">
                                                <SelectTrigger className="w-[140px]">
                                                    <SelectValue placeholder="Time range" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="today">Today</SelectItem>
                                                    <SelectItem value="week">This Week</SelectItem>
                                                    <SelectItem value="month">This Month</SelectItem>
                                                    <SelectItem value="year">This Year</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Button variant="outline" size="sm">
                                                <Download className="h-3 w-3 mr-2" />
                                                Export
                                            </Button>
                                            <Button size="sm">
                                                <RefreshCw className="h-3 w-3 mr-2" />
                                                Refresh
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Main content */}
                                <div className="rounded-lg">
                                    {children}
                                </div>
                            </div>
                        </div>

                        {/* Mobile Bottom Navigation */}
                        <SuperAdminBottomNav />

                        {/* Footer - Desktop only */}
                        <footer className="hidden lg:block border-t py-4 mt-8">
                            <div className="max-w-7xl mx-auto px-8">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">
                                            © {new Date().getFullYear()} BCA Association. Super Admin v2.0
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-sm text-muted-foreground">System: {systemStatus === 'healthy' ? 'Operational' : 'Attention Required'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                            <span className="text-sm text-muted-foreground">Uptime: {systemMetrics.uptime}%</span>
                                        </div>
                                        <Link
                                            href="/super-admin/status"
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            System Status
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </main>
                </div>
            </div>
        </TooltipProvider>
    )
}

export default SuperAdminDashboard