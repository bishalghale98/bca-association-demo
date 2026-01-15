'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Search,
    MessageSquare,
    Phone,
    Mail,
    Clock,
    HelpCircle,
    ChevronRight,
    BookOpen,
    Users,
    Calendar,
    Shield,
    FileText,
    Award,
    GraduationCap,
    Building,
    Download,
    ExternalLink,
    ChevronDown,
    ChevronUp,
    CheckCircle,
    AlertCircle,
    Info,
    Globe,
    Smartphone,
    User,
    Lock,
    CreditCard,
    Settings,
    Eye
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FAQItem {
    id: number;
    question: string;
    answer: string;
    category: 'membership' | 'events' | 'academic' | 'technical' | 'payment' | 'general';
    popularity: number;
}

interface Article {
    id: number;
    title: string;
    description: string;
    category: string;
    readTime: string;
    views: number;
}

interface ContactOption {
    id: number;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    responseTime: string;
    buttonText: string;
    href?: string;
    onClick?: () => void;
}

const HelpCenterPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        category: 'general',
        message: '',
    });

    const faqCategories = [
        { id: 'all', label: 'All Questions', icon: HelpCircle, count: 48 },
        { id: 'membership', label: 'Membership', icon: Users, count: 12 },
        { id: 'events', label: 'Events & Activities', icon: Calendar, count: 10 },
        { id: 'academic', label: 'Academic', icon: GraduationCap, count: 8 },
        { id: 'technical', label: 'Technical Support', icon: Settings, count: 9 },
        { id: 'payment', label: 'Payments & Fees', icon: CreditCard, count: 5 },
        { id: 'general', label: 'General', icon: Info, count: 4 },
    ];

    const faqs: FAQItem[] = [
        {
            id: 1,
            question: "How do I become a member of BCA Association?",
            answer: "To become a member, visit the 'Membership' section in your dashboard, click 'Join Association', and fill out the membership form. You'll need to be a current BCA student with a valid student ID. Membership fees can be paid online through the portal.",
            category: 'membership',
            popularity: 95
        },
        {
            id: 2,
            question: "How do I register for upcoming events?",
            answer: "Event registration is available in the 'Events' section. Browse upcoming events, click on the event you're interested in, and click 'Register'. Some events may require payment or have limited seats, so register early.",
            category: 'events',
            popularity: 88
        },
        {
            id: 3,
            question: "Where can I download my event certificates?",
            answer: "Certificates are available in your dashboard under 'My Certificates' section. After attending an event, certificates are typically uploaded within 3-5 business days. You can download them as PDF files.",
            category: 'events',
            popularity: 82
        },
        {
            id: 4,
            question: "How do I reset my portal password?",
            answer: "Click 'Forgot Password' on the login page. Enter your registered email address, and you'll receive a password reset link. The link expires in 24 hours. For security reasons, contact support if you don't receive the email.",
            category: 'technical',
            popularity: 78
        },
        {
            id: 5,
            question: "What are the membership benefits?",
            answer: "Members enjoy exclusive access to workshops, networking events, industry visits, certificate programs, priority registration for events, access to member-only resources, and career guidance sessions.",
            category: 'membership',
            popularity: 76
        },
        {
            id: 6,
            question: "How do I update my profile information?",
            answer: "Go to your dashboard, click on 'Profile' in the sidebar, then click 'Edit Profile'. You can update your contact information, academic details, and profile picture. Some information may require admin verification.",
            category: 'general',
            popularity: 72
        },
        {
            id: 7,
            question: "Are there any membership fees?",
            answer: "Yes, there's an annual membership fee of ₹500 for students. This includes access to all workshops, events, and resources for the academic year. Payment can be made online via UPI, debit/credit card, or net banking.",
            category: 'payment',
            popularity: 68
        },
        {
            id: 8,
            question: "How do I access academic resources?",
            answer: "Academic resources are available in the 'Resources' section. You'll find study materials, previous year papers, project templates, and coding resources. Some resources are member-only, so make sure your membership is active.",
            category: 'academic',
            popularity: 65
        },
        {
            id: 9,
            question: "What should I do if I can't attend a registered event?",
            answer: "If you can't attend a registered event, please cancel your registration at least 24 hours before the event starts through the 'My Events' section. This allows other students to register. Some events may have cancellation policies.",
            category: 'events',
            popularity: 62
        },
        {
            id: 10,
            question: "How do I contact the association committee?",
            answer: "You can contact the committee through the 'Contact Us' form on this page, or email at committee@bcaassociation.edu. For urgent matters, visit the association office in Room 205, Computer Science Building during office hours (10 AM - 4 PM).",
            category: 'general',
            popularity: 60
        },
    ];

    const popularArticles: Article[] = [
        {
            id: 1,
            title: "Complete Guide to Association Membership",
            description: "Everything you need to know about becoming a member and maximizing benefits",
            category: "Membership",
            readTime: "5 min",
            views: 1245
        },
        {
            id: 2,
            title: "Event Registration & Cancellation Policy",
            description: "Learn about our event policies, refund procedures, and registration guidelines",
            category: "Events",
            readTime: "3 min",
            views: 987
        },
        {
            id: 3,
            title: "Technical Troubleshooting Guide",
            description: "Common technical issues and solutions for the portal",
            category: "Technical",
            readTime: "4 min",
            views: 856
        },
        {
            id: 4,
            title: "Academic Resources Access Guide",
            description: "How to access and use study materials, papers, and project resources",
            category: "Academic",
            readTime: "2 min",
            views: 743
        },
    ];

    const contactOptions: ContactOption[] = [
        {
            id: 1,
            title: "Live Chat Support",
            description: "Get instant answers from our support team",
            icon: MessageSquare,
            responseTime: "Within 5 minutes",
            buttonText: "Start Chat",
            onClick: () => console.log("Starting live chat...")
        },
        {
            id: 2,
            title: "Email Support",
            description: "Send detailed queries for comprehensive assistance",
            icon: Mail,
            responseTime: "Within 24 hours",
            buttonText: "Send Email",
            href: "mailto:support@bcaassociation.edu"
        },
        {
            id: 3,
            title: "Phone Support",
            description: "Speak directly with our support team",
            icon: Phone,
            responseTime: "During office hours",
            buttonText: "Call Now",
            href: "tel:+911234567890"
        },
        {
            id: 4,
            title: "Visit Office",
            description: "Meet us in person for complex issues",
            icon: Building,
            responseTime: "10 AM - 4 PM",
            buttonText: "Get Directions",
            onClick: () => console.log("Opening directions...")
        },
    ];

    const filteredFAQs = faqs.filter(faq => {
        const matchesSearch = searchQuery === '' ||
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Contact form submitted:', contactForm);
        // Handle form submission here
        alert('Your message has been submitted. We\'ll get back to you within 24 hours.');
        setContactForm({
            name: '',
            email: '',
            category: 'general',
            message: '',
        });
    };

    const toggleFAQ = (id: number) => {
        setExpandedFAQ(expandedFAQ === id ? null : id);
    };

    const getCategoryIcon = (categoryId: string) => {
        const category = faqCategories.find(c => c.id === categoryId);
        return category?.icon || HelpCircle;
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'membership': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
            case 'events': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
            case 'academic': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
            case 'technical': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
            case 'payment': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white dark:from-[#020617] dark:to-[#0F172A]">
            {/* Hero Section */}
            <div className="relative overflow-hidden pt-20 pb-16">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/5 via-transparent to-[#38BDF8]/5"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2563EB]/10 dark:bg-[#2563EB]/20 mb-6">
                            <HelpCircle className="w-4 h-4 text-[#2563EB] dark:text-[#38BDF8]" />
                            <span className="text-sm font-medium text-[#2563EB] dark:text-[#38BDF8]">
                                BCA Association Help Center
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#0F172A] dark:text-[#E5E7EB]">
                            How can we <span className="text-[#2563EB] dark:text-[#3B82F6]">help you?</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-[#475569] dark:text-[#94A3B8] mb-8">
                            Find answers to common questions, browse helpful articles, or get in touch with our support team.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto relative">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                                <Input
                                    type="text"
                                    placeholder="Search for answers, articles, or topics..."
                                    className="pl-12 pr-4 py-6 text-base border-2 border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] focus:border-[#2563EB]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            {searchQuery && (
                                <div className="absolute top-full left-0 right-0 bg-white dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#1E293B] rounded-lg shadow-lg mt-1 z-10">
                                    <div className="p-2">
                                        {filteredFAQs.slice(0, 3).map(faq => (
                                            <div
                                                key={faq.id}
                                                className="p-3 hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] rounded-md cursor-pointer"
                                                onClick={() => toggleFAQ(faq.id)}
                                            >
                                                <div className="font-medium text-[#0F172A] dark:text-[#E5E7EB]">
                                                    {faq.question}
                                                </div>
                                                <div className="text-sm text-[#475569] dark:text-[#94A3B8] truncate">
                                                    {faq.answer.substring(0, 60)}...
                                                </div>
                                            </div>
                                        ))}
                                        {filteredFAQs.length > 3 && (
                                            <div className="text-center p-2 text-sm text-[#2563EB] dark:text-[#3B82F6]">
                                                View all {filteredFAQs.length} results
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {[
                        { label: "Total Articles", value: "48", icon: BookOpen },
                        { label: "Active Members", value: "2.4K", icon: Users },
                        { label: "Avg. Response Time", value: "2 hrs", icon: Clock },
                        { label: "Support Rating", value: "4.8/5", icon: Award },
                    ].map((stat, index) => (
                        <Card key={index} className="border-[#E5E7EB] dark:border-[#1E293B]">
                            <CardContent className="p-4 sm:p-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 dark:bg-[#2563EB]/20 flex items-center justify-center">
                                        <stat.icon className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6]" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-[#475569] dark:text-[#94A3B8]">
                                            {stat.label}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Categories */}
                    <div className="lg:col-span-1">
                        <Card className="border-[#E5E7EB] dark:border-[#1E293B] top-8">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                    Browse by Category
                                </CardTitle>
                                <CardDescription className="text-sm text-[#475569] dark:text-[#94A3B8]">
                                    Select a category to find related questions
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {faqCategories.map((category) => {
                                        const Icon = category.icon;
                                        const isActive = activeCategory === category.id;
                                        return (
                                            <button
                                                key={category.id}
                                                onClick={() => setActiveCategory(category.id)}
                                                className={cn(
                                                    "w-full flex items-center justify-between p-3 rounded-lg transition-colors",
                                                    isActive
                                                        ? "bg-[#2563EB]/10 dark:bg-[#2563EB]/20 border border-[#2563EB]/20"
                                                        : "hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={cn(
                                                        "w-8 h-8 rounded-lg flex items-center justify-center",
                                                        isActive
                                                            ? "bg-[#2563EB] text-white"
                                                            : "bg-[#F8FAFC] dark:bg-[#0F172A] text-[#475569] dark:text-[#94A3B8]"
                                                    )}>
                                                        <Icon className="w-4 h-4" />
                                                    </div>
                                                    <span className={cn(
                                                        "font-medium",
                                                        isActive
                                                            ? "text-[#2563EB] dark:text-[#3B82F6]"
                                                            : "text-[#0F172A] dark:text-[#E5E7EB]"
                                                    )}>
                                                        {category.label}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-[#475569] dark:text-[#94A3B8]">
                                                        {category.count}
                                                    </span>
                                                    {isActive && (
                                                        <ChevronRight className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Links */}
                        <Card className="border-[#E5E7EB] dark:border-[#1E293B] mt-6">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                    Quick Links
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {[
                                    { label: "Membership Portal", icon: User, href: "/dashboard/membership" },
                                    { label: "Events Calendar", icon: Calendar, href: "/events" },
                                    { label: "Academic Resources", icon: BookOpen, href: "/resources" },
                                    { label: "Security Guide", icon: Shield, href: "/security" },
                                ].map((link, index) => {
                                    const Icon = link.icon;
                                    return (
                                        <Link key={index} href={link.href}>
                                            <Button variant="ghost" className="w-full justify-start gap-3">
                                                <Icon className="w-4 h-4" />
                                                {link.label}
                                            </Button>
                                        </Link>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* FAQ Section */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                        Frequently Asked Questions
                                    </h2>
                                    <p className="text-sm text-[#475569] dark:text-[#94A3B8]">
                                        {filteredFAQs.length} questions found {activeCategory !== 'all' && `in ${faqCategories.find(c => c.id === activeCategory)?.label}`}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-[#475569] dark:text-[#94A3B8]">Sorted by:</span>
                                    <select className="bg-transparent border-none text-sm text-[#2563EB] dark:text-[#3B82F6] focus:outline-none">
                                        <option>Most Popular</option>
                                        <option>Recent</option>
                                        <option>A-Z</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {filteredFAQs.map((faq) => {
                                    const Icon = getCategoryIcon(faq.category);
                                    const isExpanded = expandedFAQ === faq.id;
                                    return (
                                        <Card key={faq.id} className={cn(
                                            "border-[#E5E7EB] dark:border-[#1E293B] overflow-hidden transition-all",
                                            isExpanded && "shadow-lg"
                                        )}>
                                            <button
                                                onClick={() => toggleFAQ(faq.id)}
                                                className="w-full text-left"
                                            >
                                                <CardContent className="p-6">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <Badge className={getCategoryColor(faq.category)}>
                                                                    <Icon className="w-3 h-3 mr-1" />
                                                                    {faq.category.charAt(0).toUpperCase() + faq.category.slice(1)}
                                                                </Badge>
                                                                <div className="text-xs text-[#475569] dark:text-[#94A3B8]">
                                                                    {faq.popularity}% found this helpful
                                                                </div>
                                                            </div>
                                                            <h3 className="font-semibold text-lg text-[#0F172A] dark:text-[#E5E7EB] mb-2">
                                                                {faq.question}
                                                            </h3>
                                                            {isExpanded && (
                                                                <div className="mt-4">
                                                                    <p className="text-[#475569] dark:text-[#94A3B8]">
                                                                        {faq.answer}
                                                                    </p>
                                                                    <div className="flex items-center gap-4 mt-6">
                                                                        <span className="text-sm text-[#475569] dark:text-[#94A3B8]">
                                                                            Was this helpful?
                                                                        </span>
                                                                        <div className="flex gap-2">
                                                                            <Button variant="outline" size="sm" className="gap-1">
                                                                                <CheckCircle className="w-4 h-4" />
                                                                                Yes
                                                                            </Button>
                                                                            <Button variant="outline" size="sm" className="gap-1">
                                                                                <AlertCircle className="w-4 h-4" />
                                                                                No
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="w-6 h-6 flex-shrink-0">
                                                            {isExpanded ? (
                                                                <ChevronUp className="w-6 h-6 text-[#475569] dark:text-[#94A3B8]" />
                                                            ) : (
                                                                <ChevronDown className="w-6 h-6 text-[#475569] dark:text-[#94A3B8]" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </button>
                                        </Card>
                                    );
                                })}
                            </div>

                            {filteredFAQs.length === 0 && (
                                <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                                    <CardContent className="p-8 text-center">
                                        <HelpCircle className="w-12 h-12 text-[#94A3B8] dark:text-[#64748B] mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-[#0F172A] dark:text-[#E5E7EB] mb-2">
                                            No questions found
                                        </h3>
                                        <p className="text-[#475569] dark:text-[#94A3B8] mb-4">
                                            Try adjusting your search or browse different categories
                                        </p>
                                        <Button
                                            onClick={() => {
                                                setSearchQuery('');
                                                setActiveCategory('all');
                                            }}
                                            variant="outline"
                                        >
                                            Clear Filters
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Popular Articles */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                    Popular Articles
                                </h2>
                                <Link href="/articles">
                                    <Button variant="ghost" className="gap-2">
                                        View All
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {popularArticles.map((article) => (
                                    <Card key={article.id} className="border-[#E5E7EB] dark:border-[#1E293B] hover:shadow-lg transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between mb-3">
                                                <Badge variant="outline" className="border-[#2563EB] text-[#2563EB] dark:border-[#3B82F6] dark:text-[#3B82F6]">
                                                    {article.category}
                                                </Badge>
                                                <div className="flex items-center gap-1 text-sm text-[#475569] dark:text-[#94A3B8]">
                                                    <Eye className="w-4 h-4" />
                                                    {article.views}
                                                </div>
                                            </div>
                                            <h3 className="font-semibold text-lg text-[#0F172A] dark:text-[#E5E7EB] mb-2">
                                                {article.title}
                                            </h3>
                                            <p className="text-sm text-[#475569] dark:text-[#94A3B8] mb-4">
                                                {article.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-sm text-[#475569] dark:text-[#94A3B8]">
                                                    <Clock className="w-4 h-4" />
                                                    {article.readTime} read
                                                </div>
                                                <Button variant="ghost" size="sm" className="gap-1">
                                                    Read More
                                                    <ChevronRight className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Contact Options */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#0F172A] dark:text-[#E5E7EB] mb-6">
                                Need More Help?
                            </h2>

                            <Tabs defaultValue="contact" className="space-y-6">
                                <TabsList className="grid grid-cols-2">
                                    <TabsTrigger value="contact">Contact Options</TabsTrigger>
                                    <TabsTrigger value="form">Send Message</TabsTrigger>
                                </TabsList>

                                <TabsContent value="contact" className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {contactOptions.map((option) => {
                                            const Icon = option.icon;
                                            return (
                                                <Card key={option.id} className="border-[#E5E7EB] dark:border-[#1E293B]">
                                                    <CardContent className="p-6">
                                                        <div className="flex items-center gap-4 mb-4">
                                                            <div className="w-12 h-12 rounded-lg bg-[#2563EB]/10 dark:bg-[#2563EB]/20 flex items-center justify-center">
                                                                <Icon className="w-6 h-6 text-[#2563EB] dark:text-[#3B82F6]" />
                                                            </div>
                                                            <div>
                                                                <h3 className="font-semibold text-lg text-[#0F172A] dark:text-[#E5E7EB]">
                                                                    {option.title}
                                                                </h3>
                                                                <p className="text-sm text-[#475569] dark:text-[#94A3B8]">
                                                                    Response: {option.responseTime}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-[#475569] dark:text-[#94A3B8] mb-4">
                                                            {option.description}
                                                        </p>
                                                        {option.href ? (
                                                            <Link href={option.href} className="w-full">
                                                                <Button className="w-full gap-2">
                                                                    {option.buttonText}
                                                                    <ExternalLink className="w-4 h-4" />
                                                                </Button>
                                                            </Link>
                                                        ) : (
                                                            <Button className="w-full" onClick={option.onClick}>
                                                                {option.buttonText}
                                                            </Button>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            );
                                        })}
                                    </div>
                                </TabsContent>

                                <TabsContent value="form">
                                    <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                                        <CardContent className="p-6">
                                            <form onSubmit={handleContactSubmit} className="space-y-4">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium text-[#0F172A] dark:text-[#E5E7EB]">
                                                            Full Name
                                                        </label>
                                                        <Input
                                                            placeholder="Enter your name"
                                                            value={contactForm.name}
                                                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium text-[#0F172A] dark:text-[#E5E7EB]">
                                                            Email Address
                                                        </label>
                                                        <Input
                                                            type="email"
                                                            placeholder="Enter your email"
                                                            value={contactForm.email}
                                                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-[#0F172A] dark:text-[#E5E7EB]">
                                                        Category
                                                    </label>
                                                    <select
                                                        className="w-full px-3 py-2 border border-[#E5E7EB] dark:border-[#1E293B] rounded-md bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-[#E5E7EB]"
                                                        value={contactForm.category}
                                                        onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                                                    >
                                                        <option value="general">General Inquiry</option>
                                                        <option value="technical">Technical Support</option>
                                                        <option value="membership">Membership</option>
                                                        <option value="events">Events</option>
                                                        <option value="academic">Academic</option>
                                                        <option value="payment">Payment Issue</option>
                                                    </select>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-[#0F172A] dark:text-[#E5E7EB]">
                                                        Your Message
                                                    </label>
                                                    <Textarea
                                                        placeholder="Describe your issue or question in detail..."
                                                        rows={4}
                                                        value={contactForm.message}
                                                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                                        required
                                                    />
                                                </div>

                                                <div className="flex items-center gap-2 text-sm text-[#475569] dark:text-[#94A3B8]">
                                                    <Info className="w-4 h-4" />
                                                    Our team typically responds within 24 hours
                                                </div>

                                                <Button type="submit" className="w-full">
                                                    Send Message
                                                </Button>
                                            </form>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpCenterPage;