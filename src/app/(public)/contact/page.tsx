"use client";

import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    CheckCircle,
    XCircle,
    Users,
    Building,
    MessageSquare,
    Calendar,
    Shield,
    ChevronRight,
    Linkedin,
    Twitter,
    Instagram,
    Facebook,
    MailCheck,
    AlertCircle,
    Loader2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Define form schema with Zod
const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number").optional(),
    category: z.enum(['general', 'academic', 'technical', 'membership', 'event', 'feedback']),
    subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
    message: z.string().min(10, "Message must be at least 10 characters").max(5000),
    isMember: z.boolean().optional(),
    agreeToTerms: z.boolean().refine(val => val === true, {
        message: "You must agree to the terms and conditions",
    }),
});

type FormValues = z.infer<typeof formSchema>;

type ContactCategory = 'general' | 'academic' | 'technical' | 'membership' | 'event' | 'feedback';

export default function ContactPage() {
    const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

    // Initialize React Hook Form
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            category: "general",
            subject: "",
            message: "",
            isMember: false,
            agreeToTerms: false,
        },
        mode: "onChange",
    });

    const isSubmitting = form.formState.isSubmitting;
    const isFormValid = form.formState.isValid;

    const contactCategories = [
        { id: 'general', label: 'General Inquiry', icon: MessageSquare },
        { id: 'academic', label: 'Academic Support', icon: Users },
        { id: 'technical', label: 'Technical Issues', icon: Shield },
        { id: 'membership', label: 'Membership', icon: Building },
        { id: 'event', label: 'Event Registration', icon: Calendar },
        { id: 'feedback', label: 'Feedback & Suggestions', icon: MailCheck },
    ];

    const contactInfo = [
        {
            icon: Mail,
            title: "Email Address",
            details: ["contact@bca-association.edu", "support@bca-association.edu"],
            description: "We typically respond within 24 hours"
        },
        {
            icon: Phone,
            title: "Phone Numbers",
            details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
            description: "Mon-Fri: 9AM-5PM, Sat: 10AM-2PM"
        },
        {
            icon: MapPin,
            title: "Office Location",
            details: ["BCA Association Building", "123 University Avenue", "City, State 12345"],
            description: "Walk-in hours: Mon-Fri 10AM-4PM"
        },
        {
            icon: Clock,
            title: "Response Time",
            details: ["General Inquiries: 24 hours", "Urgent Matters: 2 hours"],
            description: "During regular business hours"
        }
    ];

    const departmentContacts = [
        {
            department: "Academic Committee",
            head: "Prof. Sarah Johnson",
            email: "academic@bca-association.edu",
            phone: "+1 (555) 234-5678",
            hours: "Mon-Wed, 10AM-3PM"
        },
        {
            department: "Technical Support",
            head: "Mr. Alex Chen",
            email: "tech@bca-association.edu",
            phone: "+1 (555) 345-6789",
            hours: "24/7 Emergency Line Available"
        },
        {
            department: "Event Management",
            head: "Ms. Priya Sharma",
            email: "events@bca-association.edu",
            phone: "+1 (555) 456-7890",
            hours: "Mon-Fri, 9AM-6PM"
        },
        {
            department: "Membership Services",
            head: "Mr. David Wilson",
            email: "membership@bca-association.edu",
            phone: "+1 (555) 567-8901",
            hours: "Tue-Thu, 11AM-4PM"
        }
    ];

    const handleSubmit = async (values: FormValues) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            console.log("Form submitted:", values);
            setSubmitStatus('success');

            // Reset form
            form.reset();

            // Reset status after 5 seconds
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } catch (error) {
            console.error("Submission error:", error);
            setSubmitStatus('error');
        }
    };

    const handleDepartmentClick = (category: ContactCategory) => {
        form.setValue("category", category, { shouldValidate: true });
        // Scroll to form
        document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white dark:from-[#020617] dark:to-[#0F172A]">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 sm:pt-24 lg:pt-28">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/5 via-transparent to-[#38BDF8]/5"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2563EB]/10 dark:bg-[#2563EB]/20 mb-6">
                            <Mail className="w-4 h-4 text-[#2563EB] dark:text-[#38BDF8]" />
                            <span className="text-sm font-medium text-[#2563EB] dark:text-[#38BDF8]">
                                Get In Touch
                            </span>
                        </div>
                        <h1 className={cn(
                            "text-4xl sm:text-5xl lg:text-6xl font-bold mb-6",
                            "text-[#0F172A] dark:text-[#E5E7EB]"
                        )}>
                            Contact <span className="text-[#2563EB] dark:text-[#3B82F6]">BCA Association</span>
                        </h1>
                        <p className={cn(
                            "text-lg sm:text-xl max-w-3xl mx-auto mb-8",
                            "text-[#475569] dark:text-[#94A3B8]"
                        )}>
                            Have questions, suggestions, or need assistance? We&apos;re here to help.
                            Reach out to our dedicated team for support with academic matters, technical issues,
                            membership, or event registrations.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-8 sm:py-12 lg:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Contact Form Section */}
                        <div className="lg:col-span-2">
                            <Card className="border-[#E5E7EB] dark:border-[#1E293B]" id="contact-form">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                        Send us a Message
                                    </CardTitle>
                                    <CardDescription className="text-[#475569] dark:text-[#94A3B8]">
                                        Fill out the form below and our team will get back to you as soon as possible.
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                    {submitStatus === 'success' && (
                                        <div className="mb-6 p-4 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/20">
                                            <div className="flex items-center gap-3">
                                                <CheckCircle className="w-5 h-5 text-[#22C55E]" />
                                                <div>
                                                    <p className="font-medium text-[#0F172A] dark:text-[#E5E7EB]">
                                                        Message sent successfully!
                                                    </p>
                                                    <p className="text-sm text-[#475569] dark:text-[#94A3B8]">
                                                        We&apos;ll get back to you within 24 hours.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {submitStatus === 'error' && (
                                        <div className="mb-6 p-4 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/20">
                                            <div className="flex items-center gap-3">
                                                <XCircle className="w-5 h-5 text-[#EF4444]" />
                                                <div>
                                                    <p className="font-medium text-[#0F172A] dark:text-[#E5E7EB]">
                                                        Failed to send message
                                                    </p>
                                                    <p className="text-sm text-[#475569] dark:text-[#94A3B8]">
                                                        Please try again or contact us directly.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Full Name *</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Enter your full name"
                                                                    className="border-[#E5E7EB] dark:border-[#1E293B]"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Email Address *</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="email"
                                                                    placeholder="your.email@example.com"
                                                                    className="border-[#E5E7EB] dark:border-[#1E293B]"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="phone"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Phone Number</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="tel"
                                                                    placeholder="+1 (555) 123-4567"
                                                                    className="border-[#E5E7EB] dark:border-[#1E293B]"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                            <FormDescription className="text-xs">
                                                                Optional - Include country code
                                                            </FormDescription>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="category"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Inquiry Category *</FormLabel>
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger className="border-[#E5E7EB] dark:border-[#1E293B]">
                                                                        <SelectValue placeholder="Select a category" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {contactCategories.map((category) => {
                                                                        const Icon = category.icon;
                                                                        return (
                                                                            <SelectItem key={category.id} value={category.id}>
                                                                                <div className="flex items-center gap-2">
                                                                                    <Icon className="w-4 h-4" />
                                                                                    {category.label}
                                                                                </div>
                                                                            </SelectItem>
                                                                        );
                                                                    })}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="subject"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Subject *</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Brief description of your inquiry"
                                                                className="border-[#E5E7EB] dark:border-[#1E293B]"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="message"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Message *</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="Please provide details about your inquiry..."
                                                                rows={6}
                                                                className="border-[#E5E7EB] dark:border-[#1E293B] resize-none"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                        <FormDescription>
                                                            {field.value.length}/5000 characters
                                                        </FormDescription>
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="space-y-4">
                                                <FormField
                                                    control={form.control}
                                                    name="isMember"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 border-[#E5E7EB] dark:border-[#1E293B]">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                    className="border-[#E5E7EB] dark:border-[#1E293B]"
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel className="text-[#475569] dark:text-[#94A3B8]">
                                                                    I am a verified BCA Association member
                                                                </FormLabel>
                                                                <FormDescription className="text-xs">
                                                                    Members receive priority support
                                                                </FormDescription>
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="agreeToTerms"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 border-[#E5E7EB] dark:border-[#1E293B]">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                    required
                                                                    className="border-[#E5E7EB] dark:border-[#1E293B]"
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel className="text-[#475569] dark:text-[#94A3B8]">
                                                                    I agree to the terms and conditions and privacy policy
                                                                </FormLabel>
                                                                <FormMessage />
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                disabled={isSubmitting || !isFormValid}
                                                className={cn(
                                                    "w-full text-lg py-6",
                                                    "bg-gradient-to-r from-[#2563EB] to-[#38BDF8]",
                                                    "dark:from-[#1D4ED8] dark:to-[#3B82F6]",
                                                    "disabled:opacity-50 disabled:cursor-not-allowed"
                                                )}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                        Sending Message...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-5 h-5 mr-2" />
                                                        Send Message
                                                    </>
                                                )}
                                            </Button>
                                        </form>
                                    </Form>
                                </CardContent>
                            </Card>

                            {/* Department Contacts */}
                            <div className="mt-8">
                                <h2 className="text-2xl font-bold mb-6 text-[#0F172A] dark:text-[#E5E7EB]">
                                    Department Contacts
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {departmentContacts.map((dept, index) => (
                                        <Card key={index} className="border-[#E5E7EB] dark:border-[#1E293B] hover:shadow-lg transition-shadow">
                                            <CardHeader className="pb-3">
                                                <CardTitle className="text-lg font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                                    {dept.department}
                                                </CardTitle>
                                                <CardDescription className="text-[#475569] dark:text-[#94A3B8]">
                                                    Head: {dept.head}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm text-[#475569] dark:text-[#94A3B8]">
                                                    <Mail className="w-4 h-4" />
                                                    <a
                                                        href={`mailto:${dept.email}`}
                                                        className="hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors"
                                                    >
                                                        {dept.email}
                                                    </a>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-[#475569] dark:text-[#94A3B8]">
                                                    <Phone className="w-4 h-4" />
                                                    <a
                                                        href={`tel:${dept.phone}`}
                                                        className="hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors"
                                                    >
                                                        {dept.phone}
                                                    </a>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-[#475569] dark:text-[#94A3B8]">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{dept.hours}</span>
                                                </div>
                                            </CardContent>
                                            <CardFooter>
                                                <Button
                                                    variant="outline"
                                                    className="w-full"
                                                    onClick={() => handleDepartmentClick(
                                                        dept.department.toLowerCase().includes('academic') ? 'academic' :
                                                            dept.department.toLowerCase().includes('technical') ? 'technical' :
                                                                dept.department.toLowerCase().includes('event') ? 'event' :
                                                                    dept.department.toLowerCase().includes('membership') ? 'membership' : 'general'
                                                    )}
                                                >
                                                    Contact {dept.department.split(' ')[0]}
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Information Sidebar */}
                        <div className="space-y-8">
                            {/* Contact Info Cards */}
                            <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                        Contact Information
                                    </CardTitle>
                                    <CardDescription className="text-[#475569] dark:text-[#94A3B8]">
                                        Multiple ways to reach us
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {contactInfo.map((info, index) => {
                                        const Icon = info.icon;
                                        return (
                                            <div key={index} className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 dark:bg-[#2563EB]/20 flex items-center justify-center">
                                                        <Icon className="w-5 h-5 text-[#2563EB] dark:text-[#38BDF8]" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
                                                            {info.title}
                                                        </h3>
                                                        <p className="text-sm text-[#475569] dark:text-[#94A3B8]">
                                                            {info.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    {info.details.map((detail, idx) => (
                                                        <p key={idx} className="text-sm text-[#475569] dark:text-[#94A3B8]">
                                                            {detail}
                                                        </p>
                                                    ))}
                                                </div>
                                                {index < contactInfo.length - 1 && (
                                                    <div className="border-t border-[#E5E7EB] dark:border-[#1E293B] pt-4"></div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </CardContent>
                            </Card>

                            {/* Quick Links */}
                            <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                        Quick Links
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {[
                                        { label: "FAQs & Knowledge Base", href: "/faqs", icon: MessageSquare },
                                        { label: "Report Technical Issue", href: "/support", icon: Shield },
                                        { label: "Member Portal Login", href: "/login", icon: Users },
                                        { label: "Upcoming Events", href: "/events", icon: Calendar },
                                        { label: "Join Association", href: "/register", icon: Building },
                                    ].map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.href}
                                            className="flex items-center justify-between p-3 rounded-lg hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <link.icon className="w-4 h-4 text-[#475569] dark:text-[#94A3B8]" />
                                                <span className="text-[#475569] dark:text-[#94A3B8] group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors">
                                                    {link.label}
                                                </span>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-[#475569] dark:text-[#94A3B8] group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors" />
                                        </Link>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Social Media */}
                            <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                        Follow Us
                                    </CardTitle>
                                    <CardDescription className="text-[#475569] dark:text-[#94A3B8]">
                                        Stay updated with our latest news
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { platform: "Facebook", icon: Facebook, color: "bg-[#1877F2]", href: "#" },
                                            { platform: "Twitter", icon: Twitter, color: "bg-[#1DA1F2]", href: "#" },
                                            { platform: "Instagram", icon: Instagram, color: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]", href: "#" },
                                            { platform: "LinkedIn", icon: Linkedin, color: "bg-[#0A66C2]", href: "#" },
                                        ].map((social, index) => (
                                            <a
                                                key={index}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex flex-col items-center justify-center p-4 rounded-lg bg-white dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#1E293B] hover:shadow-lg transition-all group"
                                            >
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${social.color} mb-2`}>
                                                    <social.icon className="w-5 h-5 text-white" />
                                                </div>
                                                <span className="text-sm font-medium text-[#475569] dark:text-[#94A3B8] group-hover:text-[#2563EB] dark:group-hover:text-[#38BDF8] transition-colors">
                                                    {social.platform}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Emergency Contact */}
                            <Card className="border-2 border-[#EF4444]/30 bg-gradient-to-r from-[#EF4444]/5 to-transparent dark:border-[#EF4444]/40 dark:from-[#EF4444]/10">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB] flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5 text-[#EF4444]" />
                                        Emergency Contact
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <p className="text-sm text-[#475569] dark:text-[#94A3B8]">
                                        For urgent technical issues affecting your studies:
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-[#EF4444]" />
                                            <a
                                                href="tel:+15551234567"
                                                className="font-semibold text-[#EF4444] hover:underline"
                                            >
                                                +1 (555) 123-4567
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-[#EF4444]" />
                                            <a
                                                href="mailto:emergency@bca-association.edu"
                                                className="font-semibold text-[#EF4444] hover:underline"
                                            >
                                                emergency@bca-association.edu
                                            </a>
                                        </div>
                                    </div>
                                    <Badge className="bg-[#EF4444]/20 text-[#EF4444] border-0">
                                        24/7 Support Available
                                    </Badge>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold mb-8 text-center text-[#0F172A] dark:text-[#E5E7EB]">
                            Frequently Asked Questions
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    question: "How long does it take to get a response?",
                                    answer: "We typically respond within 24 hours for general inquiries. Urgent matters are addressed within 2 hours during business hours."
                                },
                                {
                                    question: "Can I contact specific department heads directly?",
                                    answer: "Yes, you can use the department contact information provided. For faster response, use the relevant category in the contact form."
                                },
                                {
                                    question: "Do I need to be a member to contact support?",
                                    answer: "No, we assist all BCA students. However, members receive priority support and additional benefits."
                                },
                                {
                                    question: "What information should I include in my message?",
                                    answer: "Please include your student ID (if applicable), detailed description of the issue, and any relevant screenshots or documents."
                                },
                                {
                                    question: "How can I report a technical issue?",
                                    answer: "Use the 'Technical Issues' category in the form or contact our technical support department directly for immediate assistance."
                                },
                                {
                                    question: "Are there walk-in consultation hours?",
                                    answer: "Yes, our office is open Monday-Friday from 10AM-4PM for walk-in consultations at the BCA Association Building."
                                },
                            ].map((faq, index) => (
                                <Card key={index} className="border-[#E5E7EB] dark:border-[#1E293B] hover:shadow-lg transition-shadow">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                            {faq.question}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-[#475569] dark:text-[#94A3B8]">
                                            {faq.answer}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-12 bg-gradient-to-r from-[#2563EB] to-[#38BDF8] dark:from-[#1D4ED8] dark:to-[#3B82F6]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Need Immediate Assistance?
                    </h2>
                    <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                        Our team is ready to help you with any questions or concerns you may have.
                        Don&apos;t hesitate to reach out.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="tel:+15551234567">
                            <Button size="lg" variant="secondary" className="bg-white text-[#2563EB] hover:bg-white/90">
                                <Phone className="w-5 h-5 mr-2" />
                                Call Now: +1 (555) 123-4567
                            </Button>
                        </Link>
                        <Link href="mailto:support@bca-association.edu">
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                                <Mail className="w-5 h-5 mr-2" />
                                Email Support
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}