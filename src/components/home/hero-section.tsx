import { cn } from '@/lib/utils'
import {
    ArrowRight,
    BookOpen,
    Calendar,
    GraduationCap,
    Shield,
    Users
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const HeroSection = () => {
    return (
        <section
            className={cn(
                "relative overflow-hidden",
                "pt-6 sm:pt-10 md:pt-13 lg:pt-16 pb-6 sm:pb-10",
                "bg-white dark:bg-[#020617]"
            )}
        >
            {/* Background gradients */}
            <div className="absolute inset-0 bg-linear-to-br from-transparent via-[#F8FAFC]/30 to-[#2563EB]/30 dark:hidden" />
            <div className="absolute inset-0 bg-linear-to-br from-transparent via-[#0F172A]/30 to-[#2563EB]/20 hidden dark:block" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* LEFT CONTENT */}
                    <div className="space-y-6 sm:space-y-8 text-center lg:text-left">

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F8FAFC] border border-[#E5E7EB] dark:bg-[#0F172A] dark:border-[#1E293B]">
                            <Shield className="w-4 h-4 text-[#2563EB]" />
                            <span className="text-sm font-medium text-[#0F172A] dark:text-[#E5E7EB]">
                                Official BCA Association Portal
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="font-bold leading-tight text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-[#0F172A] dark:text-[#E5E7EB]">
                            BCA Association <br />
                            <span className="text-[#2563EB] dark:text-[#3B82F6]">
                                MMMC College
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-base sm:text-lg max-w-xl mx-auto lg:mx-0 text-[#475569] dark:text-[#94A3B8]">
                            The official platform for{" "}
                            <span className="font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
                                verified BCA students
                            </span>{" "}
                            of MMMC College — providing exclusive access to{" "}
                            <span className="font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
                                events, workshops, and resources.
                            </span>
                        </p>

                        {/* Feature cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                            {[
                                { icon: GraduationCap, label: "Exclusive Events" },
                                { icon: Shield, label: "Verified Access" },
                                { icon: Calendar, label: "Member Dashboard" },
                            ].map(({ icon: Icon, label }) => (
                                <div
                                    key={label}
                                    className="flex flex-col items-center p-4 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] dark:bg-[#0F172A] dark:border-[#1E293B]"
                                >
                                    <Icon className="w-6 h-6 text-[#2563EB] mb-2" />
                                    <span className="text-sm font-medium text-[#0F172A] dark:text-[#E5E7EB]">
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border dark:bg-[#0F172A]/60">
                                <Users className="w-4 h-4 text-[#2563EB]" />
                                <span className="font-semibold text-sm">150+ Members</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border dark:bg-[#0F172A]/60">
                                <Calendar className="w-4 h-4 text-[#2563EB]" />
                                <span className="font-semibold text-sm">25+ Events</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link href="/register" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full bg-[#2563EB] hover:bg-[#1D4ED8]">
                                    <BookOpen className="mr-2 h-5 w-5" />
                                    Register
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>

                            <Link href="/about" className="w-full sm:w-auto">
                                <Button size="lg" variant="outline" className="w-full">
                                    <Shield className="mr-2 h-5 w-5" />
                                    About Association
                                </Button>
                            </Link>
                        </div>

                        {/* Notice */}
                        <div className="mt-6 p-4 rounded-lg border-l-4 bg-[#F8FAFC] border-l-[#F59E0B] dark:bg-[#0F172A]">
                            <p className="text-sm text-[#475569] dark:text-[#94A3B8]">
                                <span className="font-semibold">Note:</span> Registration is
                                restricted to physically verified BCA Association members only.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="relative hidden md:block">
                        <div className="h-[360px] lg:h-[460px] rounded-2xl border overflow-hidden flex items-center justify-center bg-linear-to-br from-[#2563EB]/20 to-[#38BDF8]/20">
                            <GraduationCap className="w-20 h-20 text-[#2563EB]" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default HeroSection
