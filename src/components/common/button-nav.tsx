"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
    Home,
    Users,
    Calendar,
    Bell,
    LogIn,
    UserPlus,
    Info,
    Phone,
    FileText,
    MoreVertical,
    Shield,
    ChevronUp,
    LayoutDashboardIcon,
    Loader2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSession } from 'next-auth/react';

export default function ButtonNav() {
    const pathname = usePathname();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { data: session, status } = useSession();

    // Handle loading state with a small delay to prevent flash
    useEffect(() => {
        if (status === 'loading') {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 200);
            return () => clearTimeout(timer);
        } else {
            setIsLoading(false);
        }
    }, [status]);

    const mainButtons = [
        {
            id: "home",
            label: "Home",
            icon: Home,
            href: "/",
            color: "text-[#2563EB]",
            bgColor: "bg-[#2563EB]/10",
            isActive: (path: string) => path === "/",
        },
        {
            id: "events",
            label: "Events",
            icon: Calendar,
            href: "/events",
            color: "text-[#38BDF8]",
            bgColor: "bg-[#38BDF8]/10",
            isActive: (path: string) => path.startsWith("/events"),
        },
        {
            id: "notices",
            label: "Notices",
            icon: Bell,
            href: "/notices",
            color: "text-[#F59E0B]",
            bgColor: "bg-[#F59E0B]/10",
            isActive: (path: string) => path.startsWith("/notices"),
        },
    ];

    // Base dropdown items that are always visible
    const baseDropdownItems = [
        {
            id: "about",
            label: "About Association",
            icon: Info,
            href: "/about",
            description: "Learn about our mission and team",
            isActive: (path: string) => path.startsWith("/about"),
        },
        {
            id: "contact",
            label: "Contact Us",
            icon: Phone,
            href: "/contact",
            description: "Get in touch with us",
            isActive: (path: string) => path.startsWith("/contact"),
        },
        {
            id: "documents",
            label: "Documents",
            icon: FileText,
            href: "/documents",
            description: "Access important documents",
            isActive: (path: string) => path.startsWith("/documents"),
        },
    ];

    // Auth dropdown items that change based on session
    const getAuthDropdownItems = () => {
        if (isLoading) {
            return [
                {
                    id: "loading",
                    label: "Loading...",
                    icon: Loader2,
                    href: "#",
                    description: "Checking authentication",
                    isActive: () => false,
                    isLoading: true
                }
            ];
        }

        if (!session?.user) {
            return [
                {
                    id: "login",
                    label: "Member Login",
                    icon: LogIn,
                    href: "/login",
                    description: "Access member dashboard",
                    isActive: (path: string) => path.startsWith("/login"),
                },
                {
                    id: "register",
                    label: "Register",
                    icon: UserPlus,
                    href: "/register",
                    description: "Become a verified member",
                    isActive: (path: string) => path.startsWith("/register"),
                },
            ];
        }

        return [
            {
                id: "dashboard",
                label: "Dashboard",
                icon: LayoutDashboardIcon,
                href: "/dashboard",
                description: "Access your dashboard",
                isActive: (path: string) => path.startsWith("/dashboard")
            }
        ];
    };

    // Combine base items with auth items
    const dropdownItems = [...baseDropdownItems, ...getAuthDropdownItems()];

    // Function to check if any dropdown item is active
    const isAnyDropdownItemActive = () => {
        return dropdownItems.some(item => item.isActive(pathname));
    };

    // Function to get active tab ID
    const getActiveTabId = () => {
        // First check main buttons
        const activeMainButton = mainButtons.find(button => button.isActive(pathname));
        if (activeMainButton) return activeMainButton.id;

        // Then check dropdown items
        const activeDropdownItem = dropdownItems.find(item => item.isActive(pathname));
        if (activeDropdownItem) return activeDropdownItem.id;

        return "home"; // Default to home
    };

    const activeTabId = getActiveTabId();

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
            {/* Background blur effect */}
            <div className="absolute inset-0 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md border-t border-[#E5E7EB] dark:border-[#1E293B]" />

            {/* Main navigation container */}
            <div className="relative px-2 py-2">
                <div className="flex items-center justify-between">
                    {/* Main buttons */}
                    {mainButtons.map((button) => {
                        const isActive = button.isActive(pathname);
                        return (
                            <Link
                                key={button.id}
                                href={button.href}
                                className="flex-1 flex flex-col items-center transition-all duration-200"
                            >
                                <div className={cn(
                                    "w-12 h-12 rounded-full flex items-center justify-center mb-1 transition-all duration-300",
                                    isActive
                                        ? `${button.bgColor} shadow-lg scale-105`
                                        : "bg-transparent hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]"
                                )}>
                                    <button.icon className={cn(
                                        "w-5 h-5 transition-colors duration-200",
                                        isActive ? button.color : "text-[#475569] dark:text-[#94A3B8]"
                                    )} />
                                </div>
                                <span className={cn(
                                    "text-xs font-medium transition-colors duration-200",
                                    isActive
                                        ? "text-[#0F172A] dark:text-[#E5E7EB] font-semibold"
                                        : "text-[#475569] dark:text-[#94A3B8]"
                                )}>
                                    {button.label}
                                </span>
                            </Link>
                        );
                    })}

                    {/* More dropdown */}
                    <div className="flex-1 flex flex-col items-center">
                        <DropdownMenu onOpenChange={setIsDropdownOpen}>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "w-12 h-12 rounded-full flex items-center justify-center mb-1 p-0 transition-all duration-300",
                                        isDropdownOpen || isAnyDropdownItemActive()
                                            ? "bg-[#22C55E]/10 shadow-lg scale-105"
                                            : "bg-transparent hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]"
                                    )}
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 text-[#475569] dark:text-[#94A3B8] animate-spin" />
                                    ) : isDropdownOpen ? (
                                        <ChevronUp className={cn(
                                            "w-5 h-5 transition-colors duration-200",
                                            isDropdownOpen || isAnyDropdownItemActive()
                                                ? "text-[#22C55E]"
                                                : "text-[#475569] dark:text-[#94A3B8]"
                                        )} />
                                    ) : (
                                        <MoreVertical className={cn(
                                            "w-5 h-5 transition-colors duration-200",
                                            isDropdownOpen || isAnyDropdownItemActive()
                                                ? "text-[#22C55E]"
                                                : "text-[#475569] dark:text-[#94A3B8]"
                                        )} />
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="center"
                                side="top"
                                className="w-64 mb-2 mx-2 p-2 border-[#E5E7EB] dark:border-[#1E293B] shadow-xl animate-in slide-in-from-bottom-5 duration-200"
                            >
                                {/* Association Badge */}
                                <div className="flex items-center space-x-2 p-2 mb-2 rounded-lg bg-[#2563EB]/5 dark:bg-[#2563EB]/10 animate-in fade-in duration-200">
                                    <div className="w-8 h-8 rounded-lg bg-[#2563EB] dark:bg-[#3B82F6] flex items-center justify-center">
                                        <Shield className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
                                            BCA Association
                                        </p>
                                        <p className="text-[10px] text-[#475569] dark:text-[#94A3B8]">
                                            MMMC College Portal
                                        </p>
                                    </div>
                                </div>

                                <DropdownMenuSeparator className="my-2" />

                                {/* Dropdown items */}
                                {dropdownItems.map((item) => {
                                    const isActive = item.isActive(pathname);
                                    const isAuthLoading = item.id === "loading";

                                    return (
                                        <DropdownMenuItem
                                            key={item.id}
                                            asChild
                                            disabled={isAuthLoading}
                                            className="animate-in fade-in duration-200"
                                        >
                                            {isAuthLoading ? (
                                                <div className="flex items-center space-x-3 p-2 rounded-md cursor-wait">
                                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mt-0.5 bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#1E293B]">
                                                        <Loader2 className="w-3.5 h-3.5 text-[#475569] dark:text-[#94A3B8] animate-spin" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-[#0F172A] dark:text-[#E5E7EB]">
                                                            {item.label}
                                                        </p>
                                                        <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        "flex items-start space-x-3 p-2 rounded-md cursor-pointer transition-colors duration-200",
                                                        isActive
                                                            ? "bg-[#2563EB]/10 dark:bg-[#2563EB]/20 border border-[#2563EB]/20 dark:border-[#2563EB]/30"
                                                            : "hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-8 h-8 rounded-lg flex items-center justify-center mt-0.5 transition-colors duration-200",
                                                        isActive
                                                            ? "bg-[#2563EB]/20 dark:bg-[#2563EB]/30"
                                                            : "bg-[#F8FAFC] dark:bg-[#0F172A]",
                                                        "border",
                                                        isActive
                                                            ? "border-[#2563EB]/30 dark:border-[#2563EB]/40"
                                                            : "border-[#E5E7EB] dark:border-[#1E293B]"
                                                    )}>
                                                        <item.icon className={cn(
                                                            "w-3.5 h-3.5 transition-colors duration-200",
                                                            isActive
                                                                ? "text-[#2563EB] dark:text-[#38BDF8]"
                                                                : "text-[#475569] dark:text-[#94A3B8]"
                                                        )} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className={cn(
                                                            "text-sm font-medium transition-colors duration-200",
                                                            isActive
                                                                ? "text-[#2563EB] dark:text-[#38BDF8]"
                                                                : "text-[#0F172A] dark:text-[#E5E7EB]"
                                                        )}>
                                                            {item.label}
                                                        </p>
                                                        <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                    {isActive && (
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] dark:bg-[#38BDF8] self-center" />
                                                    )}
                                                </Link>
                                            )}
                                        </DropdownMenuItem>
                                    );
                                })}

                                {/* User status indicator */}
                                {!isLoading && (
                                    <div className="p-2 mt-2 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] dark:bg-[#0F172A] dark:border-[#1E293B] animate-in fade-in duration-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <div className={cn(
                                                    "w-2 h-2 rounded-full animate-pulse",
                                                    session?.user ? "bg-[#22C55E]" : "bg-[#F59E0B]"
                                                )} />
                                                <span className="text-xs font-medium text-[#0F172A] dark:text-[#E5E7EB]">
                                                    {session?.user ? `Logged in as ${session.user.name?.split(' ')[0]}` : 'Not logged in'}
                                                </span>
                                            </div>
                                            {session?.user && (
                                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#2563EB]/10 text-[#2563EB] dark:bg-[#2563EB]/20 dark:text-[#38BDF8]">
                                                    Level {session.user.level}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Quick Stats */}
                                <div className={cn(
                                    "p-2 mt-2 rounded-lg transition-opacity duration-200",
                                    isLoading ? "opacity-50" : "opacity-100",
                                    "bg-[#F8FAFC] border border-[#E5E7EB]",
                                    "dark:bg-[#0F172A] dark:border-[#1E293B]"
                                )}>
                                    <div className="grid grid-cols-2 gap-2 text-center">
                                        <div>
                                            <div className="flex items-center justify-center space-x-1">
                                                <Users className="w-3 h-3 text-[#2563EB] dark:text-[#38BDF8]" />
                                                <span className="text-xs font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
                                                    150+
                                                </span>
                                            </div>
                                            <span className="text-[10px] text-[#475569] dark:text-[#94A3B8]">
                                                Members
                                            </span>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-center space-x-1">
                                                <Calendar className="w-3 h-3 text-[#2563EB] dark:text-[#38BDF8]" />
                                                <span className="text-xs font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
                                                    25+
                                                </span>
                                            </div>
                                            <span className="text-[10px] text-[#475569] dark:text-[#94A3B8]">
                                                Events
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <span className={cn(
                            "text-xs font-medium transition-colors duration-200",
                            isDropdownOpen || isAnyDropdownItemActive()
                                ? "text-[#0F172A] dark:text-[#E5E7EB] font-semibold"
                                : "text-[#475569] dark:text-[#94A3B8]"
                        )}>
                            More
                        </span>
                    </div>
                </div>

                {/* Active indicator that moves based on active tab */}
                <div className="absolute bottom-12 left-0 right-0 h-0.5">
                    <div
                        className={cn(
                            "absolute top-0 h-0.5 bg-gradient-to-r from-[#2563EB] to-[#38BDF8] transition-all duration-300 ease-out",
                            "shadow-[0_0_8px_rgba(37,99,235,0.3)] dark:shadow-[0_0_8px_rgba(56,189,248,0.3)]"
                        )}
                        style={{
                            width: '24%',
                            left: getActiveIndicatorPosition(),
                        }}
                    />
                </div>
            </div>
        </div>
    );

    // Helper function to calculate active indicator position
    function getActiveIndicatorPosition() {
        const buttonCount = mainButtons.length + 1; // +1 for More button
        const buttonWidth = 100 / buttonCount;

        // Find the index of active tab
        const activeButtonIndex = mainButtons.findIndex(button => button.isActive(pathname));

        if (activeButtonIndex !== -1) {
            // Active tab is one of the main buttons
            return `${activeButtonIndex * buttonWidth}%`;
        } else if (isAnyDropdownItemActive()) {
            // Active tab is in dropdown (More button)
            return `${(buttonCount - 1) * buttonWidth}%`;
        }

        // Default to home position
        return '0%';
    }
}