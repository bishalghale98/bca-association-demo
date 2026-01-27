import AboutSection from "@/components/home/about-section";
import CTASection from "@/components/home/cta-section";
import EventsSection from "@/components/home/event-section";
import FeaturesSection from "@/components/home/features-section";
import HeroSection from "@/components/home/hero-section";

// Main Home Component
export default function HomePage() {
    return (
        <div className="min-h-screen">
            <main>
                <HeroSection />
                <AboutSection />
                <FeaturesSection />
                <EventsSection />
                <CTASection />
            </main>
        </div>
    );
}