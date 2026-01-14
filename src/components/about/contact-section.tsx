import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield, UserPlus, MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const ContactSection = () => {
    return (
        <section className="py-12 px-4 sm:py-16 lg:py-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-12">
                    <div>
                        <h2 className={cn(
                            "text-2xl font-bold mb-4 sm:text-3xl lg:text-5xl sm:mb-6",
                            "text-[#0F172A] dark:text-[#E5E7EB]"
                        )}>
                            Get in Touch
                        </h2>
                        <p className={cn(
                            "text-base mb-6 sm:text-lg sm:mb-8",
                            "text-[#475569] dark:text-[#94A3B8]"
                        )}>
                            Have questions or want to collaborate? Reach out to us through any of the following channels.
                        </p>

                        <div className="space-y-5 sm:space-y-6">
                            <div className="flex items-start space-x-3 sm:space-x-4">
                                <div className={cn(
                                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                                    "sm:w-12 sm:h-12",
                                    "bg-[#2563EB]/10 dark:bg-[#2563EB]/20"
                                )}>
                                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563EB] dark:text-[#38BDF8]" />
                                </div>
                                <div>
                                    <h4 className={cn(
                                        "font-bold mb-1 text-sm sm:text-base",
                                        "text-[#0F172A] dark:text-[#E5E7EB]"
                                    )}>
                                        Visit Us
                                    </h4>
                                    <p className={cn(
                                        "text-sm leading-relaxed",
                                        "text-[#475569] dark:text-[#94A3B8]"
                                    )}>
                                        Department of Computer Applications<br />
                                        MMMC College<br />
                                        City, State - 123456
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 sm:space-x-4">
                                <div className={cn(
                                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                                    "sm:w-12 sm:h-12",
                                    "bg-[#38BDF8]/10 dark:bg-[#38BDF8]/20"
                                )}>
                                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#38BDF8]" />
                                </div>
                                <div>
                                    <h4 className={cn(
                                        "font-bold mb-1 text-sm sm:text-base",
                                        "text-[#0F172A] dark:text-[#E5E7EB]"
                                    )}>
                                        Email Us
                                    </h4>
                                    <p className={cn(
                                        "text-sm leading-relaxed break-all",
                                        "text-[#475569] dark:text-[#94A3B8]"
                                    )}>
                                        bca-association@mmmc.edu<br />
                                        bca.support@mmmc.edu
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 sm:space-x-4">
                                <div className={cn(
                                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                                    "sm:w-12 sm:h-12",
                                    "bg-[#22C55E]/10 dark:bg-[#22C55E]/20"
                                )}>
                                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#22C55E]" />
                                </div>
                                <div>
                                    <h4 className={cn(
                                        "font-bold mb-1 text-sm sm:text-base",
                                        "text-[#0F172A] dark:text-[#E5E7EB]"
                                    )}>
                                        Call Us
                                    </h4>
                                    <p className={cn(
                                        "text-sm leading-relaxed",
                                        "text-[#475569] dark:text-[#94A3B8]"
                                    )}>
                                        +91 98765 43210 (President)<br />
                                        +91 87654 32109 (Secretary)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="mt-8">
                            <h4 className={cn(
                                "font-bold mb-4 text-sm sm:text-base",
                                "text-[#0F172A] dark:text-[#E5E7EB]"
                            )}>
                                Follow Us
                            </h4>
                            <div className="flex items-center gap-3">
                                <Button variant="outline" size="icon" className="h-11 w-11 border-[#E5E7EB] dark:border-[#1E293B] hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-colors">
                                    <Facebook className="h-5 w-5" />
                                </Button>
                                <Button variant="outline" size="icon" className="h-11 w-11 border-[#E5E7EB] dark:border-[#1E293B] hover:bg-[#38BDF8] hover:text-white hover:border-[#38BDF8] transition-colors">
                                    <Twitter className="h-5 w-5" />
                                </Button>
                                <Button variant="outline" size="icon" className="h-11 w-11 border-[#E5E7EB] dark:border-[#1E293B] hover:bg-[#EC4899] hover:text-white hover:border-[#EC4899] transition-colors">
                                    <Instagram className="h-5 w-5" />
                                </Button>
                                <Button variant="outline" size="icon" className="h-11 w-11 border-[#E5E7EB] dark:border-[#1E293B] hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors">
                                    <Linkedin className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Join CTA - Mobile Optimized */}
                    <div className={cn(
                        "p-6 rounded-2xl sm:p-8",
                        "bg-gradient-to-br from-[#2563EB] to-[#38BDF8]",
                        "dark:from-[#1D4ED8] dark:to-[#3B82F6]"
                    )}>
                        <div className="text-center">
                            <div className={cn(
                                "inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 sm:px-4 sm:py-2 sm:mb-6",
                                "bg-white/20 backdrop-blur-sm"
                            )}>
                                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                                <span className="text-xs sm:text-sm font-medium text-white">
                                    Become a Member
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 sm:text-2xl lg:text-3xl sm:mb-4">
                                Ready to Join Our Community?
                            </h3>
                            <p className="text-sm text-white/90 mb-6 sm:text-base sm:mb-8 leading-relaxed">
                                Register as a BCA Association member to access exclusive events,
                                resources, and networking opportunities.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                                {/* Register */}
                                <Link href="/register" className="w-full sm:w-auto flex-1">
                                    <Button
                                        size="lg"
                                        className={cn(
                                            "w-full h-12 sm:h-14 px-4 sm:px-6",
                                            "bg-white text-[#2563EB] font-semibold",
                                            "hover:bg-white/90",
                                            "transition-all"
                                        )}
                                    >
                                        <UserPlus className="mr-2 h-5 w-5" />
                                        Register Now
                                    </Button>
                                </Link>

                                {/* Login */}
                                <Link href="/login" className="w-full sm:w-auto flex-1">
                                    <Button
                                        size="lg"
                                        className={cn(
                                            "w-full h-12 sm:h-14 px-4 sm:px-6",
                                            "border-white text-white font-semibold",
                                            "hover:bg-white/10",
                                            "transition-all"
                                        )}
                                    >
                                        Member Login
                                    </Button>
                                </Link>
                            </div>

                            <p className="text-xs text-white/80 mt-4 sm:text-sm sm:mt-6">
                                Already registered? Login to access your dashboard and member features.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;