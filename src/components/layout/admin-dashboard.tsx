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
    ChevronDown, Search, HelpCircle, Download, Upload
} from 'lucide-react'

// ShadCN Components
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
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

interface AdminDashboardLayoutProps {
    children?: React.ReactNode
}

interface Notification {
    id: number
    title: string
    message: string
    type: 'system' | 'user' | 'security' | 'alert'
    time: string
    read: boolean
}

// Mobile Bottom Navigation Component
const AdminBottomNav = () => {
    const pathname = usePathname()

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
        { id: 'users', label: 'Users', icon: Users, href: '/admin/users' },
        { id: 'event-register', label: 'Events', icon: Calendar, href: '/admin/event-register' },
        { id: 'content', label: 'Content', icon: FileText, href: '/admin/content' },
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
                                        <span className="text-xs text-wrap font-medium transition-all duration-300 group-hover:font-semibold">
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
    menuItems,
    pathname,
    session,
    unreadNotifications
}: any) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const mobileMenuItems = menuItems

    const supportItems = [
        { id: 'resources', label: 'Resources', icon: BookOpen, href: '/resources', external: true },
        { id: 'help', label: 'Help Center', icon: HelpCircle, href: '/help', external: true },
    ]

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
                                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80">
                                        <Shield className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">BCA Association</p>
                                        <p className="text-xs text-muted-foreground">Admin Portal</p>
                                    </div>
                                </SheetTitle>
                            </SheetHeader>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto px-4 py-2">
                                {/* User info */}
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted mb-4">
                                    <Avatar>
                                        <AvatarImage src={session?.user?.image} />
                                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80">
                                            {session?.user?.name?.charAt(0) || 'A'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">
                                            {session?.user?.name || 'Administrator'}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {session?.user?.email || 'admin@example.com'}
                                        </p>
                                    </div>
                                </div>

                                {/* Navigation */}
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
                                        Admin Menu
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
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'hover:bg-accent'
                                                    }`}
                                            >
                                                <Icon className="w-4 h-4" />
                                                <span className="text-sm">{item.label}</span>
                                            </Link>
                                        )
                                    })}
                                </div>

                                {/* Support */}
                                <div className="mt-6 space-y-1">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
                                        Support
                                    </p>

                                    {supportItems.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-accent"
                                        >
                                            <item.icon className="w-4 h-4" />
                                            <span className="text-sm">{item.label}</span>
                                        </Link>
                                    ))}
                                </div>

                                {/* Logout */}
                                <div className="mt-6 pt-4 border-t">
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
                        </SheetContent>
                    </Sheet>

                    <div>
                        <h1 className="text-lg font-semibold">{getCurrentPageTitle()}</h1>
                        <p className="text-xs text-muted-foreground hidden sm:block">Admin Panel</p>
                    </div>
                </div>

                {/* Right side - Notifications and user */}
                <div className="flex items-center gap-2">
                    {/* Quick Actions Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-4 w-4" />
                                {unreadNotifications > 0 && (
                                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                                        {unreadNotifications}
                                    </Badge>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <div className="max-h-96 overflow-y-auto">
                                {/* Sample notifications */}
                                <div className="p-3 hover:bg-accent cursor-pointer border-b">
                                    <div className="flex justify-between items-start">
                                        <p className="font-medium text-sm">New User Registered</p>
                                        <Badge variant="outline" className="text-xs">New</Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">A new student has registered</p>
                                    <p className="text-xs text-muted-foreground mt-2">10 min ago</p>
                                </div>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* User dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={session?.user?.image} />
                                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80">
                                        {session?.user?.name?.charAt(0) || 'A'}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <UserCog className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
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
    session
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
                    <Link href="/admin" className="flex items-center gap-2">
                        {!sidebarCollapsed ? (
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-sm">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex flex-col transition-all duration-300 overflow-hidden">
                                    <span className="text-sm font-bold whitespace-nowrap">BCA Association</span>
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">Admin Portal</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center w-full">
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-sm">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        )}
                    </Link>
                </div>



                {/* Sidebar Content */}
                <div className="flex-1 overflow-y-auto py-4 px-2">
                    {/* Main Navigation */}
                    <div className="space-y-1">
                        <div className={`px-3 py-2 transition-all duration-300 ${sidebarCollapsed ? 'opacity-0 h-0 py-0 overflow-hidden' : 'opacity-100'}`}>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                                Admin Menu
                            </p>
                        </div>
                        {menuItems.map((item: any) => {
                            const Icon = item.icon
                            const isActive =
                                pathname === item.href ||
                                (item.href !== "/admin" && pathname.startsWith(`${item.href}/`))

                            return (
                                <TooltipProvider key={item.id}>
                                    <Tooltip delayDuration={0}>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href={item.href}
                                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive
                                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                                    : 'hover:bg-accent'
                                                    } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                                            >
                                                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary-foreground' : ''}`} />
                                                {!sidebarCollapsed && (
                                                    <span className="text-sm font-medium whitespace-nowrap transition-all duration-300">
                                                        {item.label}
                                                    </span>
                                                )}
                                                {isActive && !sidebarCollapsed && (
                                                    <div className="ml-auto w-1.5 h-1.5 bg-primary-foreground rounded-full"></div>
                                                )}
                                                {!sidebarCollapsed && item.label === "Analytics" && (
                                                    <Badge variant="outline" className="ml-auto text-[10px] px-1.5 py-0">New</Badge>
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

                    {/* Quick Actions */}
                    {!sidebarCollapsed && (
                        <div className="mt-6 space-y-1 transition-all duration-300">
                            <div className="px-3 py-2">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                                    Quick Actions
                                </p>
                            </div>
                            <div className="space-y-1">
                                <Button variant="outline" size="sm" className="w-full justify-start">
                                    <Download className="w-3 h-3 mr-2" />
                                    <span className="whitespace-nowrap">Export Data</span>
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start">
                                    <Upload className="w-3 h-3 mr-2" />
                                    <span className="whitespace-nowrap">Import Users</span>
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start">
                                    <FileArchive className="w-3 h-3 mr-2" />
                                    <span className="whitespace-nowrap">Backup Now</span>
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
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={session?.user?.image} />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80">
                                {session?.user?.name?.charAt(0) || 'A'}
                            </AvatarFallback>
                        </Avatar>
                        {!sidebarCollapsed && (
                            <div className="flex-1 min-w-0 transition-all duration-300 overflow-hidden">
                                <p className="text-sm font-medium truncate whitespace-nowrap">{session?.user?.name || 'Administrator'}</p>
                                <p className="text-xs text-muted-foreground truncate whitespace-nowrap">{session?.user?.email || 'admin@example.com'}</p>
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

// Desktop Header Component - Fixed to align with sidebar
const DesktopHeader = ({
    getCurrentPageTitle,
    handleLogout,
    menuItems,
    unreadNotifications,
    session,
    sidebarCollapsed
}: any) => {
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
                            Manage your admin tasks efficiently
                        </p>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    {/* Search bar - hidden on small, visible on md+ */}
                    <div className="hidden md:block relative transition-all duration-300"
                        style={{ width: sidebarCollapsed ? '280px' : '256px' }}>
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search admin panel..."
                            className="pl-9 bg-muted/50 transition-all duration-300"
                        />
                    </div>

                    {/* Quick Stats */}
                    <div className="hidden md:flex items-center gap-4 transition-all duration-300">
                        <div className="text-center">
                            <p className="text-xs text-muted-foreground">Users</p>
                            <p className="text-sm font-semibold">1,234</p>
                        </div>
                        <Separator orientation="vertical" className="h-6" />
                        <div className="text-center">
                            <p className="text-xs text-muted-foreground">Events</p>
                            <p className="text-sm font-semibold">24</p>
                        </div>
                    </div>

                    {/* Notifications */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-4 w-4" />
                                {unreadNotifications > 0 && (
                                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                                        {unreadNotifications}
                                    </Badge>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                            <DropdownMenuLabel className="flex items-center justify-between">
                                <span>Notifications</span>
                                <Badge variant="outline" className="text-xs">4 New</Badge>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <div className="max-h-96 overflow-y-auto space-y-1 p-1">
                                {/* Notification items */}
                                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer">
                                    <div className="mt-0.5">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">New User Registered</p>
                                        <p className="text-xs text-muted-foreground mt-1">A new student has registered on the portal</p>
                                        <p className="text-xs text-muted-foreground mt-2">10 minutes ago</p>
                                    </div>
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="justify-center text-sm">
                                View all notifications
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* User Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="gap-2 px-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={session?.user?.image} />
                                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80">
                                        {session?.user?.name?.charAt(0) || 'A'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="hidden md:block text-left transition-all duration-300">
                                    <p className="text-sm font-medium truncate">{session?.user?.name || 'Admin'}</p>
                                    <p className="text-xs text-muted-foreground truncate">Administrator</p>
                                </div>
                                <ChevronDown className="h-4 w-4 opacity-50 hidden md:block transition-all duration-300" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <UserCog className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <HelpCircle className="mr-2 h-4 w-4" />
                                <span>Help & Support</span>
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

const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const pathname = usePathname()

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
        { id: 'users', label: 'User Management', icon: Users, href: '/admin/users' },
        { id: 'event-register', label: 'Event Register', icon: Calendar, href: '/admin/event-register' },
        { id: 'content', label: 'Content', icon: FileText, href: '/admin/content' },
        { id: 'events', label: 'Events', icon: Calendar, href: '/admin/events' },
        { id: 'database', label: 'Database', icon: Database, href: '/admin/database' },
        { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/settings' },
    ]

    const footerItems = [
        { id: 'resources', label: 'Resources', icon: BookOpen, href: '/resources', external: true },
        { id: 'help', label: 'Help Center', icon: Mail, href: '/help', external: true },
    ]

    const notifications: Notification[] = [
        { id: 1, title: "New User Registered", message: "A new student has registered on the portal", type: "user", time: "10 minutes ago", read: false },
        { id: 2, title: "System Update Required", message: "Security patch available for admin panel", type: "system", time: "1 hour ago", read: false },
        { id: 3, title: "High Traffic Alert", message: "Unusual traffic detected on user dashboard", type: "security", time: "3 hours ago", read: true },
        { id: 4, title: "Database Backup", message: "Daily backup completed successfully", type: "system", time: "5 hours ago", read: true },
        { id: 5, title: "Event Approval Required", message: "3 new events pending approval", type: "alert", time: "1 day ago", read: true },
    ]

    const unreadNotifications = notifications.filter(n => !n.read).length
    const { data: session, status } = useSession()

    const handleLogout = async () => {
        await signOut()
    }

    const getCurrentPageTitle = () => {
        const currentItem = menuItems.find(item =>
            pathname === item.href || pathname.startsWith(`${item.href}/`)
        )
        return currentItem?.label || 'Admin Dashboard'
    }

    // Auth checks
    if (status === "unauthenticated") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
                <Card className="max-w-md w-full">
                    <CardContent className="pt-6 text-center space-y-4">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-destructive to-destructive/80 flex items-center justify-center">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Admin Access Required</h2>
                            <p className="text-muted-foreground mt-2">
                                You need administrator privileges to access this page.
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

    const isAdmin = session?.user?.role === UserRole.ADMIN || session?.user?.role === UserRole.SUPER_ADMIN

    if (!isAdmin && status === "authenticated") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
                <Card className="max-w-md w-full">
                    <CardContent className="pt-6 text-center space-y-4">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-warning to-warning/80 flex items-center justify-center">
                            <AlertCircle className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Access Denied</h2>
                            <p className="text-muted-foreground mt-2">
                                You don't have permission to access the admin panel.
                            </p>
                        </div>
                        <Button asChild className="w-full">
                            <Link href="/dashboard">
                                Go to User Dashboard
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <TooltipProvider>
            <div className="min-h-screen bg-background">
                {/* Mobile Header */}
                <MobileHeader
                    getCurrentPageTitle={getCurrentPageTitle}
                    handleLogout={handleLogout}
                    session={session}
                    menuItems={menuItems}
                    pathname={pathname}
                    unreadNotifications={unreadNotifications}
                />

                {/* Desktop Sidebar */}
                <DesktopSidebar
                    sidebarCollapsed={sidebarCollapsed}
                    setSidebarCollapsed={setSidebarCollapsed}
                    pathname={pathname}
                    menuItems={menuItems}
                    footerItems={footerItems}
                    session={session}
                />

                {/* Desktop Header */}
                <DesktopHeader
                    getCurrentPageTitle={getCurrentPageTitle}
                    handleLogout={handleLogout}
                    unreadNotifications={unreadNotifications}
                    menuItems={menuItems}
                    session={session}
                    sidebarCollapsed={sidebarCollapsed}
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
                                {/* Page header with breadcrumb for desktop - Only show when header is not fixed */}
                                <div className="hidden lg:block mt-4 mb-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Link href="/admin" className="hover:text-foreground transition-colors">
                                                Admin
                                            </Link>
                                            <ChevronRight className="h-3 w-3" />
                                            <span className="text-foreground font-medium">{getCurrentPageTitle()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm">
                                                <Download className="h-3 w-3 mr-2" />
                                                Export
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Upload className="h-3 w-3 mr-2" />
                                                Import
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
                        <AdminBottomNav />

                        {/* Footer - Desktop only */}
                        <footer className="hidden lg:block border-t py-4 mt-8">
                            <div className="max-w-7xl mx-auto px-8">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-2">
                                        <Shield className="h-4 w-4 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">
                                            © {new Date().getFullYear()} BCA Association. Admin Panel v2.0
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <Link
                                            href="/admin/privacy"
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            Privacy
                                        </Link>
                                        <Link
                                            href="/admin/terms"
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            Terms
                                        </Link>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-sm text-muted-foreground">System Operational</span>
                                        </div>
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

export default AdminDashboardLayout