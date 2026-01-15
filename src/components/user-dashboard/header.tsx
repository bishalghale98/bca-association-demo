import { Bell, Building, LogOut, Settings } from 'lucide-react'
import Link from 'next/link'
import { UserProfile } from '@/app/(protected)/dashboard/page'

interface HeaderProps {
    user: UserProfile,
    unreadNotifications: number,
    handleLogout: () => void,
    getCurrentPageTitle: () => string
}

const Header = ({ user, unreadNotifications, handleLogout, getCurrentPageTitle }: HeaderProps) => {
    return (
        <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm">
            <div className="px-4 sm:px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Left side - Page Title */}
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                            {getCurrentPageTitle()}
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                            Welcome back, {user.name.split(' ')[0]}!
                        </p>
                    </div>

                    {/* Right side - Actions */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link
                            href="/dashboard/notifications"
                            className="relative p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                        >
                            <Bell className="w-5 h-5" />
                            {unreadNotifications > 0 && (
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
                            )}
                        </Link>

                        <Link
                            href="/dashboard/settings"
                            className="hidden sm:block p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                        >
                            <Settings className="w-5 h-5" />
                        </Link>

                        {(user.role === 'admin' || user.role === 'super_admin') && (
                            <Link
                                href="/admin"
                                className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20"
                            >
                                <Building className="w-4 h-4" />
                                <span className="text-sm font-medium">Admin</span>
                            </Link>
                        )}

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline text-sm font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header