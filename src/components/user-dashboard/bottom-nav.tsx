import React, { useState } from 'react'
import { Home, Users, FileText, MoreVertical, User, Settings, HelpCircle, Globe, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const BottomNav = () => {
    const [isMoreOpen, setIsMoreOpen] = useState(false)
    const pathname = usePathname()

    const mainNavItems = [
        {
            name: 'Home',
            href: '/dashboard',
            icon: Home,
        },
        {
            name: 'Members',
            href: '/members',
            icon: Users,
        },
        {
            name: 'Documents',
            href: '/documents',
            icon: FileText,
        },
    ]

    const moreMenuItems = [
        {
            name: 'Profile',
            href: '/profile',
            icon: User,
        },
        {
            name: 'Settings',
            href: '/settings',
            icon: Settings,
        },
        {
            name: 'Help & Support',
            href: '/help',
            icon: HelpCircle,
        },
        {
            name: 'Community',
            href: '/community',
            icon: Globe,
        },
    ]

    const isActive = (path: string) => {
        return pathname === path || pathname?.startsWith(`${path}/`)
    }

    return (
        <>
            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#020617] md:hidden">
                <div className="flex items-center justify-around h-16 px-4">
                    {mainNavItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${isActive(item.href)
                                ? 'text-[#2563EB] dark:text-[#3B82F6]'
                                : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#2563EB] dark:hover:text-[#3B82F6]'
                                }`}
                        >
                            <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                            <span className="text-xs mt-1 font-medium">{item.name}</span>
                        </Link>
                    ))}

                    {/* More Button with Dropdown */}
                    <div className="relative flex-1 flex flex-col items-center">
                        <button
                            onClick={() => setIsMoreOpen(!isMoreOpen)}
                            className={`flex flex-col items-center justify-center h-full w-full transition-colors ${isMoreOpen
                                ? 'text-[#2563EB] dark:text-[#3B82F6]'
                                : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#2563EB] dark:hover:text-[#3B82F6]'
                                }`}
                        >
                            <MoreVertical className="w-5 h-5 sm:w-6 sm:h-6" />
                            <span className="text-xs mt-1 font-medium">More</span>
                        </button>

                        {/* Dropdown Menu - Appears above */}
                        {isMoreOpen && (
                            <>
                                {/* Backdrop */}
                                <div
                                    className="fixed inset-0 top-0 -bottom-16 z-[-1]"
                                    onClick={() => setIsMoreOpen(false)}
                                />

                                {/* Dropdown Content */}
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 sm:w-56">
                                    {/* Arrow */}
                                    <div className="flex justify-center">
                                        <ChevronUp className="w-4 h-4 text-white dark:text-[#1E293B]" />
                                    </div>

                                    <div className="mt-[-1px] bg-white dark:bg-[#1E293B] rounded-lg shadow-lg border border-[#E5E7EB] dark:border-[#374151] overflow-hidden">
                                        {moreMenuItems.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                onClick={() => setIsMoreOpen(false)}
                                                className={`flex items-center gap-3 px-4 py-3 transition-colors ${isActive(item.href)
                                                    ? 'bg-[#F1F5F9] dark:bg-[#334155] text-[#2563EB] dark:text-[#3B82F6]'
                                                    : 'text-[#0F172A] dark:text-[#E5E7EB] hover:bg-[#F8FAFC] dark:hover:bg-[#2D3748]'
                                                    }`}
                                            >
                                                <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                                <span className="text-sm font-medium">{item.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </nav>


        </>
    )
}

export default BottomNav