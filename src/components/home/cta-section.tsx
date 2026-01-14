import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn, Shield, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

function CTASection() {
    return (
        <section className="py-16 sm:py-20 lg:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={cn(
                    "p-8 sm:p-12 rounded-3xl text-center",
                    "bg-linear-to-r from-[#2563EB] to-[#38BDF8]",
                    "dark:from-[#1D4ED8] dark:to-[#3B82F6]"
                )}>
                    <div className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6",
                        "bg-white/20 backdrop-blur-sm"
                    )}>
                        <Shield className="w-4 h-4 text-white" />
                        <span className="text-sm font-medium text-white">
                            Exclusive Access
                        </span>
                    </div>
                    <h2 className={cn(
                        "text-3xl sm:text-4xl lg:text-5xl font-bold mb-6",
                        "text-white"
                    )}>
                        Ready to Join the BCA Community?
                    </h2>
                    <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                        Register now and get verified to access exclusive events, resources, and networking opportunities with fellow BCA students.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register">
                            <Button
                                size="lg"
                                className="bg-white text-[#2563EB] hover:bg-white/90"
                            >
                                <UserPlus className="mr-2 h-5 w-5" />
                                Register Now
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-[#2563EB] hover:text-[#2563EB] hover:bg-white/90"
                            >
                                <LogIn className="mr-2 h-5 w-5" />
                                Member Login
                            </Button>
                        </Link>
                    </div>
                    <p className="text-sm text-white/80 mt-6">
                        Already a verified member? Login to access your dashboard
                    </p>
                </div>
            </div>
        </section>
    );
}

export default CTASection