import BoardMembersSection from "@/components/about/board-members-section";
import ContactSection from "@/components/about/contact-section";
import CoreValuesSection from "@/components/about/core-values-section";
import MissionVisionSection from "@/components/about/mission-vision-section";
import TimelineSection from "@/components/about/timeline-section";
import HeroSection from "@/components/about/hero-section";


export default function AboutUsPage() {
    return (
        <div className="min-h-screen">
            <HeroSection />
            <MissionVisionSection />
            <CoreValuesSection />
            <BoardMembersSection />
            <TimelineSection />
            <ContactSection />
        </div>
    );
}