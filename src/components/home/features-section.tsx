import { cn } from "@/lib/utils";
import { CheckCircle, Clock, Download, FileCheck, MessageSquare, Shield, Upload, UserPlus, Users2, Vote } from "lucide-react";

function FeaturesSection() {
  const features = [
    {
      icon: FileCheck,
      title: "High-Priority Forms",
      description: "Submit urgent requests directly to the Association President",
      color: "#EF4444",
    },
    {
      icon: Download,
      title: "Membership Certificate",
      description: "Download verified membership PDF with QR code",
      color: "#2563EB",
    },
    {
      icon: Vote,
      title: "Voting System",
      description: "Participate in polls and association decisions",
      color: "#22C55E",
    },
    {
      icon: Upload,
      title: "Document Sharing",
      description: "Access meeting minutes, reports, and resources",
      color: "#F59E0B",
    },
    {
      icon: MessageSquare,
      title: "Feedback System",
      description: "Submit anonymous or named suggestions",
      color: "#38BDF8",
    },
    {
      icon: Users2,
      title: "Event Registration",
      description: "Register for workshops, seminars, and hackathons",
      color: "#8B5CF6",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4",
            "bg-[#F8FAFC] border border-[#E5E7EB]",
            "dark:bg-[#0F172A] dark:border-[#1E293B]"
          )}>
            <Shield className="w-4 h-4 text-[#2563EB] dark:text-[#38BDF8]" />
            <span className={cn(
              "text-sm font-medium",
              "text-[#0F172A] dark:text-[#E5E7EB]"
            )}>
              Member-Exclusive Features
            </span>
          </div>
          <h2 className={cn(
            "text-3xl sm:text-4xl lg:text-5xl font-bold mb-4",
            "text-[#0F172A] dark:text-[#E5E7EB]"
          )}>
            What Verified Members Get
          </h2>
          <p className={cn(
            "text-lg max-w-3xl mx-auto",
            "text-[#475569] dark:text-[#94A3B8]"
          )}>
            Access exclusive features designed to enhance your academic and professional journey
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "p-6 rounded-xl group hover:shadow-xl transition-all duration-300",
                "bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#2563EB]/30",
                "dark:bg-[#0F172A] dark:border-[#1E293B] dark:hover:border-[#38BDF8]/30"
              )}
            >
              <div
                className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${feature.color}10` }}
              >
                <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
              </div>
              <h3 className={cn(
                "text-xl font-bold mb-3 group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8]",
                "text-[#0F172A] dark:text-[#E5E7EB]"
              )}>
                {feature.title}
              </h3>
              <p className={cn(
                "text-[#475569] dark:text-[#94A3B8]"
              )}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Verification Process */}
        <div className={cn(
          "mt-12 p-8 rounded-2xl",
          "bg-linear-to-r from-[#2563EB]/5 to-[#38BDF8]/5",
          "dark:from-[#2563EB]/10 dark:to-[#38BDF8]/10",
          "border border-[#E5E7EB] dark:border-[#1E293B]"
        )}>
          <h3 className={cn(
            "text-2xl font-bold mb-6 text-center",
            "text-[#0F172A] dark:text-[#E5E7EB]"
          )}>
            Verification Process
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Register", description: "Submit your details for verification", icon: UserPlus },
              { step: "2", title: "Pending Review", description: "Admin checks physical membership", icon: Clock },
              { step: "3", title: "Admin Approval", description: "Verified by association admin", icon: CheckCircle },
              { step: "4", title: "Full Access", description: "Unlock all member features", icon: Shield },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className={cn(
                  "w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center",
                  "bg-white dark:bg-[#0F172A]",
                  "border-2 border-[#2563EB] dark:border-[#38BDF8]"
                )}>
                  <step.icon className="w-8 h-8 text-[#2563EB] dark:text-[#38BDF8]" />
                </div>
                <div className={cn(
                  "text-sm font-semibold mb-2",
                  "text-[#2563EB] dark:text-[#38BDF8]"
                )}>
                  Step {step.step}
                </div>
                <h4 className={cn(
                  "font-bold mb-2",
                  "text-[#0F172A] dark:text-[#E5E7EB]"
                )}>
                  {step.title}
                </h4>
                <p className={cn(
                  "text-sm",
                  "text-[#475569] dark:text-[#94A3B8]"
                )}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection