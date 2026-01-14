import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Award, Heart, Trophy } from "lucide-react";

function AboutSection() {
    return (
        <section id="about" className="py-16 sm:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className={cn(
                        "text-3xl sm:text-4xl lg:text-5xl font-bold mb-4",
                        "text-[#0F172A] dark:text-[#E5E7EB]"
                    )}>
                        About BCA Association
                    </h2>
                    <p className={cn(
                        "text-lg max-w-3xl mx-auto",
                        "text-[#475569] dark:text-[#94A3B8]"
                    )}>
                        Empowering BCA students through academic excellence, skill development, and community building
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Mission */}
                    <div className={cn(
                        "p-6 rounded-2xl",
                        "bg-[#F8FAFC] border border-[#E5E7EB]",
                        "dark:bg-[#0F172A] dark:border-[#1E293B]"
                    )}>
                        <div className={cn(
                            "w-12 h-12 rounded-lg mb-4 flex items-center justify-center",
                            "bg-[#2563EB]/10 dark:bg-[#2563EB]/20"
                        )}>
                            <Award className="w-6 h-6 text-[#2563EB] dark:text-[#38BDF8]" />
                        </div>
                        <h3 className={cn(
                            "text-xl font-bold mb-3",
                            "text-[#0F172A] dark:text-[#E5E7EB]"
                        )}>
                            Our Mission
                        </h3>
                        <p className={cn(
                            "text-[#475569] dark:text-[#94A3B8]"
                        )}>
                            To foster academic excellence and professional growth among BCA students through workshops, seminars, and industry interactions.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className={cn(
                        "p-6 rounded-2xl",
                        "bg-[#F8FAFC] border border-[#E5E7EB]",
                        "dark:bg-[#0F172A] dark:border-[#1E293B]"
                    )}>
                        <div className={cn(
                            "w-12 h-12 rounded-lg mb-4 flex items-center justify-center",
                            "bg-[#38BDF8]/10 dark:bg-[#38BDF8]/20"
                        )}>
                            <Trophy className="w-6 h-6 text-[#38BDF8]" />
                        </div>
                        <h3 className={cn(
                            "text-xl font-bold mb-3",
                            "text-[#0F172A] dark:text-[#E5E7EB]"
                        )}>
                            Our Vision
                        </h3>
                        <p className={cn(
                            "text-[#475569] dark:text-[#94A3B8]"
                        )}>
                            To create a dynamic learning community that produces industry-ready IT professionals with strong ethical values.
                        </p>
                    </div>

                    {/* Values */}
                    <div className={cn(
                        "p-6 rounded-2xl",
                        "bg-[#F8FAFC] border border-[#E5E7EB]",
                        "dark:bg-[#0F172A] dark:border-[#1E293B]"
                    )}>
                        <div className={cn(
                            "w-12 h-12 rounded-lg mb-4 flex items-center justify-center",
                            "bg-[#22C55E]/10 dark:bg-[#22C55E]/20"
                        )}>
                            <Heart className="w-6 h-6 text-[#22C55E]" />
                        </div>
                        <h3 className={cn(
                            "text-xl font-bold mb-3",
                            "text-[#0F172A] dark:text-[#E5E7EB]"
                        )}>
                            Core Values
                        </h3>
                        <p className={cn(
                            "text-[#475569] dark:text-[#94A3B8]"
                        )}>
                            Excellence, Innovation, Collaboration, Integrity, and Community Service guide all our activities and initiatives.
                        </p>
                    </div>
                </div>

                {/* Executive Team */}
                <div className="mt-16">
                    <h3 className={cn(
                        "text-2xl font-bold text-center mb-8",
                        "text-[#0F172A] dark:text-[#E5E7EB]"
                    )}>
                        Executive Committee
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: "John Doe", role: "President", avatar: "JD" },
                            { name: "Jane Smith", role: "Vice President", avatar: "JS" },
                            { name: "Robert Johnson", role: "Secretary", avatar: "RJ" },
                            { name: "Sarah Williams", role: "Treasurer", avatar: "SW" },
                        ].map((member, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "p-6 rounded-xl text-center",
                                    "bg-[#F8FAFC] border border-[#E5E7EB]",
                                    "dark:bg-[#0F172A] dark:border-[#1E293B]"
                                )}
                            >
                                <Avatar className="w-16 h-16 mx-auto mb-4">
                                    <AvatarFallback className={cn(
                                        "bg-[#2563EB] text-white",
                                        "dark:bg-[#3B82F6]"
                                    )}>
                                        {member.avatar}
                                    </AvatarFallback>
                                </Avatar>
                                <h4 className={cn(
                                    "font-bold mb-1",
                                    "text-[#0F172A] dark:text-[#E5E7EB]"
                                )}>
                                    {member.name}
                                </h4>
                                <p className={cn(
                                    "text-sm",
                                    "text-[#475569] dark:text-[#94A3B8]"
                                )}>
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection