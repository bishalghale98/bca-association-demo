import { cn } from "@/lib/utils";
import { Facebook, GraduationCap, Instagram, Linkedin, Mail, MapPin, Twitter } from "lucide-react";
import Link from "next/link";

function Footer() {
    return (
        <footer className={cn(
            "border-t mb-15 lg:mb-0",
            "bg-white dark:bg-[#020617]",
            "border-[#E5E7EB] dark:border-[#1E293B]"
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Logo and Description */}
                    <div className="md:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className={cn(
                                "w-10 h-10 rounded-lg flex items-center justify-center",
                                "bg-[#2563EB] dark:bg-[#3B82F6]"
                            )}>
                                <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <span className={cn(
                                    "text-xl font-bold",
                                    "text-[#0F172A] dark:text-[#E5E7EB]"
                                )}>
                                    BCA
                                </span>
                                <span className={cn(
                                    "text-xl font-bold ml-1",
                                    "text-[#2563EB] dark:text-[#38BDF8]"
                                )}>
                                    Association
                                </span>
                            </div>
                        </div>
                        <p className={cn(
                            "text-sm",
                            "text-[#475569] dark:text-[#94A3B8]"
                        )}>
                            The official platform for BCA Association members of MMMC College.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className={cn(
                            "font-bold mb-4",
                            "text-[#0F172A] dark:text-[#E5E7EB]"
                        )}>
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            {["Home", "About", "Events", "Notices", "Contact"].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={`/${item.toLowerCase()}`}
                                        className={cn(
                                            "text-sm hover:text-[#2563EB] dark:hover:text-[#38BDF8]",
                                            "text-[#475569] dark:text-[#94A3B8]"
                                        )}
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Member Links */}
                    <div>
                        <h4 className={cn(
                            "font-bold mb-4",
                            "text-[#0F172A] dark:text-[#E5E7EB]"
                        )}>
                            Members
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/login"
                                    className={cn(
                                        "text-sm hover:text-[#2563EB] dark:hover:text-[#38BDF8]",
                                        "text-[#475569] dark:text-[#94A3B8]"
                                    )}
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/register"
                                    className={cn(
                                        "text-sm hover:text-[#2563EB] dark:hover:text-[#38BDF8]",
                                        "text-[#475569] dark:text-[#94A3B8]"
                                    )}
                                >
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard"
                                    className={cn(
                                        "text-sm hover:text-[#2563EB] dark:hover:text-[#38BDF8]",
                                        "text-[#475569] dark:text-[#94A3B8]"
                                    )}
                                >
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className={cn(
                            "font-bold mb-4",
                            "text-[#0F172A] dark:text-[#E5E7EB]"
                        )}>
                            Contact Us
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-2">
                                <MapPin className="w-4 h-4 mt-0.5 text-[#475569] dark:text-[#94A3B8]" />
                                <span className={cn(
                                    "text-sm",
                                    "text-[#475569] dark:text-[#94A3B8]"
                                )}>
                                    MMMC College, Department of Computer Applications
                                </span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-[#475569] dark:text-[#94A3B8]" />
                                <span className={cn(
                                    "text-sm",
                                    "text-[#475569] dark:text-[#94A3B8]"
                                )}>
                                    bca-association@mmmc.edu
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className={cn(
                    "my-8",
                    "border-t border-[#E5E7EB] dark:border-[#1E293B]"
                )}></div>

                {/* Bottom Row */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className={cn(
                        "text-sm",
                        "text-[#475569] dark:text-[#94A3B8]"
                    )}>
                        © {new Date().getFullYear()} BCA Association MMMC. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-[#2563EB] dark:hover:text-[#38BDF8]">
                            <Facebook className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="hover:text-[#2563EB] dark:hover:text-[#38BDF8]">
                            <Twitter className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="hover:text-[#2563EB] dark:hover:text-[#38BDF8]">
                            <Instagram className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="hover:text-[#2563EB] dark:hover:text-[#38BDF8]">
                            <Linkedin className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer