import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

function EventsSection() {
    const events = [
        {
            title: "Annual Hackathon 2024",
            date: "Dec 15-16, 2024",
            type: "Technical",
            status: "Upcoming",
            color: "#2563EB",
        },
        {
            title: "Industry Workshop: AI/ML",
            date: "Nov 30, 2024",
            type: "Workshop",
            status: "Upcoming",
            color: "#38BDF8",
        },
        {
            title: "Guest Lecture: Cybersecurity",
            date: "Oct 25, 2024",
            type: "Seminar",
            status: "Completed",
            color: "#22C55E",
        },
        {
            title: "Coding Competition",
            date: "Sep 18, 2024",
            type: "Competition",
            status: "Completed",
            color: "#F59E0B",
        },
    ];

    return (
        <section id="events" className="py-16 sm:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className={cn(
                        "text-3xl sm:text-4xl lg:text-5xl font-bold mb-4",
                        "text-[#0F172A] dark:text-[#E5E7EB]"
                    )}>
                        Events & Activities
                    </h2>
                    <p className={cn(
                        "text-lg max-w-3xl mx-auto",
                        "text-[#475569] dark:text-[#94A3B8]"
                    )}>
                        Participate in exciting events designed to enhance your skills and knowledge
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {events.map((event, index) => (
                        <div
                            key={index}
                            className={cn(
                                "p-6 rounded-2xl group hover:shadow-xl transition-all duration-300",
                                "bg-[#F8FAFC] border border-[#E5E7EB]",
                                "dark:bg-[#0F172A] dark:border-[#1E293B]"
                            )}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <span
                                        className="text-xs font-semibold px-3 py-1 rounded-full"
                                        style={{ backgroundColor: `${event.color}20`, color: event.color }}
                                    >
                                        {event.type}
                                    </span>
                                    <span className={cn(
                                        "text-xs font-semibold px-3 py-1 rounded-full ml-2",
                                        event.status === "Upcoming"
                                            ? "bg-[#22C55E]/20 text-[#22C55E]"
                                            : "bg-[#94A3B8]/20 text-[#475569] dark:text-[#94A3B8]"
                                    )}>
                                        {event.status}
                                    </span>
                                </div>
                                <Calendar className="w-6 h-6 text-[#475569] dark:text-[#94A3B8]" />
                            </div>
                            <h3 className={cn(
                                "text-xl font-bold mb-3 group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8]",
                                "text-[#0F172A] dark:text-[#E5E7EB]"
                            )}>
                                {event.title}
                            </h3>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Calendar className="w-4 h-4 text-[#475569] dark:text-[#94A3B8]" />
                                    <span className={cn(
                                        "text-sm",
                                        "text-[#475569] dark:text-[#94A3B8]"
                                    )}>
                                        {event.date}
                                    </span>
                                </div>
                                <Button variant="ghost" size="sm" className="group">
                                    View Details
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/events">
                        <Button variant="outline" size="lg">
                            View All Events
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default EventsSection