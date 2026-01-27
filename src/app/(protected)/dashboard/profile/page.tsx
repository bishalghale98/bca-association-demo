'use client'

import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
    User,
    Mail,
    Phone,
    Calendar,
    MapPin,
    Download,
    Edit,
    CreditCard,
    BookOpen,
    AlertCircle,
    QrCode,
    IdCard,
    Printer,
    Share2,
    Building,
    GraduationCap,
    Hash,
    ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useSession } from 'next-auth/react';
import { MembershipStatus, UserRole } from '@/types/user/enums';
import dynamic from 'next/dynamic';

const QRCodeCanvas = dynamic(
    () => import('qrcode.react').then((mod) => mod.QRCodeCanvas),
    { ssr: false }
);

const UserProfilePage = () => {
    const [activeTab, setActiveTab] = React.useState('profile');
    const idCardRef = useRef<HTMLDivElement>(null);
    const { data: session, status } = useSession();

    // Show loading state while session is loading
    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-linear-to-b from-[#F8FAFC] to-white dark:from-[#020617] dark:to-[#0F172A]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB] mx-auto"></div>
                            <p className="mt-4 text-[#475569] dark:text-[#94A3B8]">Loading profile...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Redirect or show error if no session
    if (!session?.user) {
        return (
            <div className="min-h-screen bg-linear-to-b from-[#F8FAFC] to-white dark:from-[#020617] dark:to-[#0F172A]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                    <div className="text-center py-16">
                        <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-[#E5E7EB] mb-2">
                            Please sign in to view your profile
                        </h2>
                        <p className="text-[#475569] dark:text-[#94A3B8] mb-6">
                            You need to be authenticated to access this page.
                        </p>
                        <Link href="/auth/signin">
                            <Button>
                                Sign In
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const user = session.user;
    const progressPercentage = (user.points / user.nextLevelPoints) * 100;


    const generateQRData = () => {
        return JSON.stringify({
            organization: "BCA Association",
            memberId: user.studentId,
            name: user.name,
            email: user.email,
            phone: user.phone || "Not provided",
            course: user.course || "Not specified",
            semester: user.semester ? `Semester ${user.semester}` : "Not specified",
            issuedOn: new Date().toLocaleDateString(),
        });
    };

    const qrData = generateQRData();

    // ID Card download function
    const handleDownloadIDCard = async () => {
        if (!idCardRef.current) {
            toast.error("ID Card not found!");
            return;
        }

        try {
            const html2canvas = (await import('html2canvas')).default;
            const cardElement = idCardRef.current;

            const canvas = await html2canvas(cardElement, {
                scale: 3,
                useCORS: true,
                backgroundColor: '#ffffff',
            });

            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = `${user.studentId}-id-card.png`;
            link.click();

            toast.success("ID Card downloaded!");
        } catch (error) {
            toast.error("Download failed");
        }
    };

    const handlePrintIDCard = () => {
        window.print();
    };

    const handleShareIDCard = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${user.name}'s ID Card`,
                    text: `Check out ${user.name}'s BCA Association ID Card`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Sharing cancelled');
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard!");
        }
    };

    const renderProfileTab = () => (
        <div className="space-y-4 sm:space-y-6">
            {/* Profile Header */}
            <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center sm:items-start gap-4 w-full sm:w-auto">
                            <div className="relative">
                                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 border-4 border-white dark:border-[#0F172A] shadow-lg">
                                    <AvatarImage src={user?.avatarUrl || "https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small/user-icon-member-login-isolated-vector.jpg"} />
                                    <AvatarFallback className="bg-[#2563EB] text-white text-lg sm:text-xl lg:text-2xl">
                                        {user.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            {/* Mobile Edit Button */}
                            <div className="sm:hidden w-full">
                                <Link href="/dashboard/profile/edit" className="block w-full">
                                    <Button className="w-full gap-2">
                                        <Edit className="w-4 h-4" />
                                        Edit Profile
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4">
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0F172A] dark:text-[#E5E7EB] truncate">
                                        {user.name}
                                    </h2>
                                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                                        <Badge className={cn(
                                            "text-xs",
                                            user.membershipStatus === MembershipStatus.ACTIVE
                                                ? "bg-[#22C55E]/10 text-[#22C55E] hover:bg-[#22C55E]/20"
                                                : user.membershipStatus === MembershipStatus.EXPIRED
                                                    ? "bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444]/20"
                                                    : "bg-[#F59E0B]/10 text-[#F59E0B] hover:bg-[#F59E0B]/20"
                                        )}>
                                            {user.membershipStatus}
                                        </Badge>
                                        <Badge variant="outline" className="text-xs border-[#2563EB] text-[#2563EB]">
                                            Level {user.level}
                                        </Badge>
                                        {user.role === UserRole.ADMIN && (
                                            <Badge variant="outline" className="text-xs border-[#8B5CF6] text-[#8B5CF6]">
                                                Admin
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                {/* Desktop Edit Button */}
                                <div className="hidden sm:block">
                                    <Link href="/dashboard/profile/edit">
                                        <Button className="gap-2">
                                            <Edit className="w-4 h-4" />
                                            Edit Profile
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="mb-4 sm:mb-6">
                                <label className="block text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-2">
                                    Bio
                                </label>
                                <p className="text-sm text-[#475569] dark:text-[#94A3B8]">
                                    {user.bio || "No bio provided."}
                                </p>
                            </div>

                            {/* Points Progress */}
                            <div className="bg-[#F8FAFC] dark:bg-[#0F172A] rounded-lg p-3 sm:p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs sm:text-sm font-medium text-[#475569] dark:text-[#94A3B8]">
                                        Member Points
                                    </span>
                                    <span className="text-xs sm:text-sm font-bold text-[#2563EB] dark:text-[#3B82F6]">
                                        {user.points} / {user.nextLevelPoints}
                                    </span>
                                </div>
                                <Progress value={progressPercentage} className="h-2 mb-2" />
                                <div className="text-xs text-[#475569] dark:text-[#94A3B8]">
                                    {user.nextLevelPoints - user.points} points to Level {user.level + 1}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB] flex items-center gap-2">
                        <User className="w-4 h-4 sm:w-5 sm:h-5" />
                        Personal Information
                    </CardTitle>
                    <CardDescription className="text-sm">
                        Your personal details and contact information
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                                    Email Address
                                </label>
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-[#475569] dark:text-[#94A3B8]" />
                                    <span className="text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB] truncate">{user.email}</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                                    Phone Number
                                </label>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-[#475569] dark:text-[#94A3B8]" />
                                    <span className="text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">{user.phone || "Not provided"}</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                                    Student ID
                                </label>
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-[#475569] dark:text-[#94A3B8]" />
                                    <span className="text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">{user.studentId}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                                    Date of Birth
                                </label>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-[#475569] dark:text-[#94A3B8]" />
                                    <span className="text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">
                                        {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }) : "Not provided"}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                                    Gender
                                </label>
                                <span className="text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB] capitalize">
                                    {user.gender || "Not specified"}
                                </span>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                                    Membership Since
                                </label>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-[#475569] dark:text-[#94A3B8]" />
                                    <span className="text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">
                                        {new Date(user.joinDate as Date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long'
                                        }) || "N/A"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                            Address
                        </label>
                        <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-[#475569] dark:text-[#94A3B8] mt-0.5" />
                            <span className="text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">{user.address || "Not provided"}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Academic Information */}
            <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB] flex items-center gap-2">
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                        Academic Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        <div>
                            <label className="block text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                                Course
                            </label>
                            <span className="text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">{user.course || "Not specified"}</span>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                                Specialization
                            </label>
                            <span className="text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">{user.specialization || "Not specified"}</span>
                        </div>

                        <div className="sm:col-span-2 lg:col-span-1">
                            <label className="block text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                                Current Semester
                            </label>
                            <span className="text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">
                                {user.semester ? `Semester ${user.semester}` : "Not specified"}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderIDCardTab = () => (
        <div className="space-y-4 sm:space-y-6">
            {/* ID Card Actions */}
            <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB] flex items-center gap-2">
                        <IdCard className="w-4 h-4 sm:w-5 sm:h-5" />
                        Digital ID Card
                    </CardTitle>
                    <CardDescription className="text-sm">
                        Download, print, or share your digital ID card
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                        <Button onClick={handleDownloadIDCard} className="gap-2 flex-1 sm:flex-none">
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Download PDF</span>
                            <span className="sm:hidden">Download</span>
                        </Button>
                        <Button onClick={handlePrintIDCard} variant="outline" className="gap-2 flex-1 sm:flex-none">
                            <Printer className="w-4 h-4" />
                            <span className="hidden sm:inline">Print</span>
                            <span className="sm:hidden">Print</span>
                        </Button>
                        <Button onClick={handleShareIDCard} variant="outline" className="gap-2 flex-1 sm:flex-none">
                            <Share2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Share</span>
                            <span className="sm:hidden">Share</span>
                        </Button>
                        <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
                            <QrCode className="w-4 h-4" />
                            <span className="hidden sm:inline">QR Code</span>
                            <span className="sm:hidden">QR Code</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* ID Card Display */}
            <div ref={idCardRef} className="print:block">
                <Card className="border-[#E5E7EB] dark:border-[#1E293B] overflow-hidden print:border-2 print:border-gray-300">
                    <CardContent className="p-0">
                        {/* ID Card Header */}
                        <div className="bg-linear-to-r from-[#2563EB] to-[#1D4ED8] p-4 sm:p-6 text-white">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <Building className="w-6 h-6 sm:w-8 sm:h-8" />
                                    <div>
                                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">BCA Association</h2>
                                        <p className="text-xs sm:text-sm opacity-90">Member Identity Card</p>
                                    </div>
                                </div>
                                <div className="text-left sm:text-right">
                                    <div className="text-xs sm:text-sm opacity-90">Valid Until</div>
                                    <div className="font-bold text-sm sm:text-base">Until BCA Clear</div>
                                </div>
                            </div>
                        </div>

                        {/* ID Card Body */}
                        <div className="p-4 sm:p-6">
                            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                                {/* Left Column - Photo and Basic Info */}
                                <div className="flex flex-col items-center lg:items-start gap-4 lg:w-1/3">
                                    <Avatar className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 border-4 border-[#2563EB]/20">
                                        <AvatarImage src={user.avatarUrl || "https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small/user-icon-member-login-isolated-vector.jpg"} />
                                        <AvatarFallback className="bg-[#2563EB] text-white text-xl sm:text-2xl">
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="text-center lg:text-left">
                                        <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB] mb-1">
                                            {user.name}
                                        </h3>
                                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1 mb-2">
                                            <Badge className="bg-[#22C55E]/10 text-[#22C55E] text-xs">
                                                {user.membershipStatus}
                                            </Badge>

                                        </div>
                                        <div className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">
                                            Member ID: {user.studentId}
                                        </div>
                                    </div>

                                    {/* QR Code Placeholder */}
                                    {/* QR Code */}
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                                        <QRCodeCanvas
                                            value={qrData}
                                            size={80}
                                            bgColor="#ffffff"
                                            fgColor="#000000"
                                            level="M"
                                            includeMargin={false}
                                        />
                                    </div>
                                </div>

                                {/* Right Column - Detailed Info */}
                                <div className="flex-1">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-[#475569] dark:text-[#94A3B8]" />
                                                <span className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">Full Name</span>
                                            </div>
                                            <div className="font-medium text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">
                                                {user.name}
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Hash className="w-4 h-4 text-[#475569] dark:text-[#94A3B8]" />
                                                <span className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">Student ID</span>
                                            </div>
                                            <div className="font-medium text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">
                                                {user.studentId}
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <GraduationCap className="w-4 h-4 text-[#475569] dark:text-[#94A3B8]" />
                                                <span className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">Course</span>
                                            </div>
                                            <div className="font-medium text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">
                                                {user.course || "Not specified"}
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-[#475569] dark:text-[#94A3B8]" />
                                                <span className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">Semester</span>
                                            </div>
                                            <div className="font-medium text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">
                                                {user.semester ? `Semester ${user.semester}` : "Not specified"}
                                            </div>
                                        </div>

                                        <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-[#475569] dark:text-[#94A3B8]" />
                                                <span className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">Email</span>
                                            </div>
                                            <div className="font-medium text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB] truncate">
                                                {user.email}
                                            </div>
                                        </div>

                                        <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-[#475569] dark:text-[#94A3B8]" />
                                                <span className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">Phone</span>
                                            </div>
                                            <div className="font-medium text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">
                                                {user.phone || "Not provided"}
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-[#475569] dark:text-[#94A3B8]" />
                                                <span className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">Member Since</span>
                                            </div>
                                            <div className="font-medium text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">
                                                {new Date(user.joinDate as Date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short'
                                                })}
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <ShieldCheck className="w-4 h-4 text-[#475569] dark:text-[#94A3B8]" />
                                                <span className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">Blood Group</span>
                                            </div>
                                            <div className="font-medium text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">
                                                {user.bloodGroup || "N/A"}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Emergency Contact */}
                                    <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                                            <h4 className="font-semibold text-sm sm:text-base text-red-700 dark:text-red-300">
                                                Emergency Contact
                                            </h4>
                                        </div>
                                        <div className="text-sm text-red-600 dark:text-red-400">
                                            {user.emergencyContact || "Not specified"}
                                        </div>
                                    </div>

                                    {/* Terms & Conditions */}
                                    <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#E5E7EB] dark:border-[#1E293B]">
                                        <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
                                            This card is the property of BCA Association. It must be surrendered upon request.
                                            Misuse will result in disciplinary action. Valid for association premises and events only.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ID Card Footer */}
                        <div className="bg-[#F8FAFC] dark:bg-[#0F172A] border-t border-[#E5E7EB] dark:border-[#1E293B] p-3 sm:p-4">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
                                <div className="text-xs text-[#475569] dark:text-[#94A3B8]">
                                    Issued on: {new Date().toLocaleDateString()}
                                </div>
                                <div className="text-xs text-[#475569] dark:text-[#94A3B8]">
                                    For verification: scan@bcaassociation.edu
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* ID Card Usage Instructions */}
                <Card className="border-[#E5E7EB] dark:border-[#1E293B] mt-4 sm:mt-6">
                    <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                            ID Card Usage
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                            {[
                                {
                                    title: "Events Access",
                                    description: "Required for entry to all association events",
                                    icon: Calendar
                                },
                                {
                                    title: "Library Access",
                                    description: "Digital access to member-only resources",
                                    icon: BookOpen
                                },
                                {
                                    title: "Discounts",
                                    description: "Show for partner discounts and offers",
                                    icon: CreditCard
                                },
                                {
                                    title: "Verification",
                                    description: "Digital verification for online events",
                                    icon: ShieldCheck
                                }
                            ].map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div key={index} className="text-center p-3 rounded-lg bg-[#F8FAFC] dark:bg-[#0F172A]">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#2563EB]/10 dark:bg-[#2563EB]/20 flex items-center justify-center mx-auto mb-2">
                                            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB] dark:text-[#3B82F6]" />
                                        </div>
                                        <h4 className="font-semibold text-sm text-[#0F172A] dark:text-[#E5E7EB]">
                                            {item.title}
                                        </h4>
                                        <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-1">
                                            {item.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-linear-to-b from-[#F8FAFC] to-white dark:from-[#020617] dark:to-[#0F172A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 ">
                {/* Header */}
                <div className="mb-4 sm:mb-6 lg:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="flex-1 min-w-0">
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                Profile Settings
                            </h1>
                            <p className="text-sm text-[#475569] dark:text-[#94A3B8] truncate">
                                Manage your personal information, activity, and account settings
                            </p>
                        </div>
                        <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
                            <Button variant="outline" className="gap-2 text-sm w-full xs:w-auto">
                                <QrCode className="w-4 h-4" />
                                <span className="hidden sm:inline">QR Code</span>
                                <span className="sm:hidden">QR</span>
                            </Button>
                            <Link href="/dashboard" className="w-full xs:w-auto">
                                <Button variant="outline" className="w-full">
                                    <span className="hidden sm:inline">Back to Dashboard</span>
                                    <span className="sm:hidden">Dashboard</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {/* Sidebar - Now visible on lg and larger screens */}
                    <div className="hidden lg:block lg:col-span-1">
                        <Card className="border-[#E5E7EB] dark:border-[#1E293B] sticky top-6">
                            <CardContent className="p-0">
                                <div className="p-4 lg:p-6 border-b border-[#E5E7EB] dark:border-[#1E293B]">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-10 h-10 lg:w-12 lg:h-12">
                                            <AvatarImage src={user?.avatarUrl || "https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small/user-icon-member-login-isolated-vector.jpg"} />
                                            <AvatarFallback className="bg-[#2563EB] text-white">
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-semibold text-sm lg:text-base text-[#0F172A] dark:text-[#E5E7EB] truncate">
                                                {user.name}
                                            </h3>
                                            <p className="text-xs lg:text-sm text-[#475569] dark:text-[#94A3B8] truncate">
                                                {user.studentId}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
                                        <TabsList className="flex flex-col h-auto p-0 bg-transparent">
                                            <TabsTrigger
                                                value="profile"
                                                className={cn(
                                                    "justify-start px-3 py-2 lg:py-3 mb-1 text-xs lg:text-sm",
                                                    "data-[state=active]:bg-[#2563EB]/10 data-[state=active]:text-[#2563EB]",
                                                    "dark:data-[state=active]:bg-[#2563EB]/20 dark:data-[state=active]:text-[#3B82F6]",
                                                    "hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]"
                                                )}
                                            >
                                                <User className="w-3 h-3 lg:w-4 lg:h-4 mr-2 lg:mr-3" />
                                                Profile
                                            </TabsTrigger>

                                            <TabsTrigger
                                                value="idcard"
                                                className={cn(
                                                    "justify-start px-3 py-2 lg:py-3 mb-1 text-xs lg:text-sm",
                                                    "data-[state=active]:bg-[#2563EB]/10 data-[state=active]:text-[#2563EB]",
                                                    "dark:data-[state=active]:bg-[#2563EB]/20 dark:data-[state=active]:text-[#3B82F6]",
                                                    "hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]"
                                                )}
                                            >
                                                <IdCard className="w-3 h-3 lg:w-4 lg:h-4 mr-2 lg:mr-3" />
                                                ID Card
                                            </TabsTrigger>
                                        </TabsList>
                                    </Tabs>
                                </div>

                                {/* Quick Stats */}
                                <div className="p-4 border-t border-[#E5E7EB] dark:border-[#1E293B]">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs lg:text-sm text-[#475569] dark:text-[#94A3B8]">Member Level</span>
                                            <span className="font-medium text-xs lg:text-sm text-[#0F172A] dark:text-[#E5E7EB]">Level {user.level}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs lg:text-sm text-[#475569] dark:text-[#94A3B8]">Points</span>
                                            <span className="font-medium text-xs lg:text-sm text-[#0F172A] dark:text-[#E5E7EB]">{user.points}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs lg:text-sm text-[#475569] dark:text-[#94A3B8]">Status</span>
                                            <Badge className={cn(
                                                "text-xs",
                                                user.membershipStatus === MembershipStatus.ACTIVE
                                                    ? "bg-[#22C55E]/10 text-[#22C55E] hover:bg-[#22C55E]/20"
                                                    : user.membershipStatus === MembershipStatus.EXPIRED
                                                        ? "bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444]/20"
                                                        : "bg-[#F59E0B]/10 text-[#F59E0B] hover:bg-[#F59E0B]/20"
                                            )}>
                                                {user.membershipStatus}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3">
                        {/* Mobile Tabs - Hidden on lg and larger screens */}
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="lg:hidden mb-4 sm:mb-6">
                            <TabsList className="grid grid-cols-4 w-full">
                                <TabsTrigger value="profile" className="text-xs px-2 py-2 sm:text-sm sm:px-4">
                                    <User className="w-4 h-4" />
                                    <span className="sr-only sm:not-sr-only sm:ml-2">Profile</span>
                                </TabsTrigger>

                                <TabsTrigger value="idcard" className="text-xs px-2 py-2 sm:text-sm sm:px-4">
                                    <IdCard className="w-4 h-4" />
                                    <span className="sr-only sm:not-sr-only sm:ml-2">ID Card</span>
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>

                        {activeTab === 'profile' && renderProfileTab()}
                        {activeTab === 'idcard' && renderIDCardTab()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;