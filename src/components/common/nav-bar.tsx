'use client'

import { cn } from "@/lib/utils";
import {
    GraduationCap,
    LogIn,
    UserPlus,
    Home,
    Info,
    Calendar,
    Bell,
    Phone,
    LayoutDashboardIcon,
} from "lucide-react";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuList,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    const { data: session , status} = useSession()

    

    const isActive = (path: string) => pathname === path;

    
    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    const navItems = [
        { name: "Home", path: "/", icon: Home },
        { name: "About", path: "/about", icon: Info },
        { name: "Events", path: "/events", icon: Calendar },
        { name: "Notices", path: "/notices", icon: Bell },
        { name: "Contact", path: "/contact", icon: Phone },
    ];

    

    return (
        <nav
            className={cn(
                "sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
                "bg-white/95 dark:bg-[#020617]/95",
                "border-[#E5E7EB] dark:border-[#1E293B]",
                isScrolled && "shadow-md"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg sm:rounded-xl flex items-center justify-center bg-gradient-to-br from-[#2563EB] to-[#38BDF8] shadow-md">
                            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div className="flex items-center">
                            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                BCA
                            </span>
                            <span className="ml-1 text-lg sm:text-xl lg:text-2xl font-bold text-[#2563EB] dark:text-[#38BDF8]">
                                Association
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                        <NavigationMenu>
                            <NavigationMenuList className="space-x-0 xl:space-x-1">
                                {navItems.map((item) => (
                                    <Link key={item.path} href={item.path}>
                                        <Button
                                            variant="ghost"
                                            className={cn(
                                                "h-10 px-4 text-sm xl:text-base font-medium",
                                                "text-[#0F172A] dark:text-[#E5E7EB]",
                                                "hover:text-[#2563EB] dark:hover:text-[#38BDF8] hover:bg-[#2563EB]/10 dark:hover:bg-[#38BDF8]/10",
                                                isActive(item.path) &&
                                                "text-[#2563EB] dark:text-[#38BDF8] font-semibold bg-[#2563EB]/10 dark:bg-[#38BDF8]/10"
                                            )}
                                        >
                                            {item.name}
                                        </Button>
                                    </Link>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>



                    {/* Auth Buttons */}
                    {!session?.user ? (
                        <div className="hidden sm:flex items-center space-x-2 md:space-x-3 lg:space-x-4">
                            <Link href="/login">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-9 px-3 sm:h-10 sm:px-4 lg:h-11 lg:px-6 text-xs sm:text-sm lg:text-base"
                                >
                                    <LogIn className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="hidden xs:inline">Login</span>
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button
                                    className="bg-gradient-to-r from-[#2563EB] to-[#38BDF8] hover:from-[#1D4ED8] hover:to-[#0EA5E9] h-9 px-3 sm:h-10 sm:px-4 lg:h-11 lg:px-6 text-xs sm:text-sm lg:text-base"
                                >
                                    <UserPlus className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="hidden xs:inline">Register</span>
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="hidden sm:flex items-center space-x-2 md:space-x-3 lg:space-x-4">
                            <Link href="/dashboard">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-9 px-3 sm:h-10 sm:px-4 lg:h-11 lg:px-6 text-xs sm:text-sm lg:text-base"
                                >
                                    <LayoutDashboardIcon className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="hidden lg:inline">Dashboard</span>
                                </Button>
                            </Link>
                        </div>
                    )}


                </div>


            </div>
        </nav>
    );
}

export default Navbar;