'use client'

import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
    User,
    Mail,
    Phone,
    Calendar,
    MapPin,
    Edit,
    Save,
    X,
    Camera,
    Shield,
    Bell,
    Lock,
    Globe,
    Smartphone,
    CreditCard,
    Award,
    Trophy,
    BookOpen,
    Users,
    History,
    CheckCircle,
    AlertCircle,
    Upload,
    Download,
    Trash2,
    Eye,
    EyeOff,
    QrCode,
    Key,
    LogOut,
    Settings,
    IdCard,
    Printer,
    Share2,
    Copy,
    Building,
    GraduationCap,
    Hash,
    ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface UserProfile {
    id: number;
    name: string;
    email: string;
    phone: string;
    studentId: string;
    course: string;
    specialization: string;
    semester: number;
    year: number;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    address: string;
    bio: string;
    avatarUrl?: string;
    role: 'member' | 'admin' | 'super_admin';
    joinDate: string;
    membershipStatus: 'active' | 'expired' | 'pending';
    points: number;
    level: number;
    nextLevelPoints: number;
    bloodGroup?: string;
    emergencyContact?: string;
}

interface Activity {
    id: number;
    type: 'event' | 'certificate' | 'login' | 'profile_update' | 'payment';
    title: string;
    description: string;
    timestamp: string;
    icon: React.ComponentType<any>;
}

interface Certificate {
    id: number;
    title: string;
    event: string;
    issueDate: string;
    downloadUrl: string;
    verified: boolean;
}

interface SecurityLog {
    id: number;
    action: string;
    device: string;
    location: string;
    timestamp: string;
    status: 'success' | 'failed' | 'warning';
}

const UserProfilePage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const idCardRef = useRef<HTMLDivElement>(null);

    const [user, setUser] = useState<UserProfile>({
        id: 1,
        name: "John Doe",
        email: "john.doe@mmmc.edu",
        phone: "+1 (555) 123-4567",
        studentId: "BCA20240123",
        course: "Bachelor of Computer Applications",
        specialization: "Full Stack Development",
        semester: 5,
        year: 3,
        dateOfBirth: "2002-05-15",
        gender: 'male',
        address: "123 College Street, City, State 12345",
        bio: "Passionate about web development and AI. Currently learning React and Node.js. Looking forward to contributing to open source projects.",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        role: 'member',
        joinDate: "2023-08-15",
        membershipStatus: 'active',
        points: 850,
        level: 3,
        nextLevelPoints: 1000,
        bloodGroup: "O+",
        emergencyContact: "+1 (555) 987-6543"
    });

    const [editedUser, setEditedUser] = useState<UserProfile>({ ...user });

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        smsNotifications: false,
        eventReminders: true,
        newsletter: true,
        securityAlerts: true,
        promotionEmails: false,
    });

    const [security, setSecurity] = useState({
        twoFactorEnabled: false,
        requireLoginVerification: true,
        sessionTimeout: "30",
        showLastLogin: true,
    });

    const activities: Activity[] = [
        {
            id: 1,
            type: 'event',
            title: "Attended AI Workshop",
            description: "Successfully completed Advanced AI Workshop",
            timestamp: "2 hours ago",
            icon: Award
        },
        {
            id: 2,
            type: 'certificate',
            title: "Certificate Downloaded",
            description: "Downloaded Web Development Bootcamp certificate",
            timestamp: "1 day ago",
            icon: Download
        },
        {
            id: 3,
            type: 'login',
            title: "New Device Login",
            description: "Logged in from Chrome on Windows",
            timestamp: "2 days ago",
            icon: Shield
        },
        {
            id: 4,
            type: 'profile_update',
            title: "Profile Updated",
            description: "Updated contact information",
            timestamp: "3 days ago",
            icon: Edit
        },
        {
            id: 5,
            type: 'payment',
            title: "Membership Renewal",
            description: "Successfully renewed annual membership",
            timestamp: "1 week ago",
            icon: CreditCard
        },
    ];

    const certificates: Certificate[] = [
        {
            id: 1,
            title: "Web Development Bootcamp",
            event: "BCA Association Workshop",
            issueDate: "2024-11-15",
            downloadUrl: "#",
            verified: true
        },
        {
            id: 2,
            title: "AI & Machine Learning",
            event: "Tech Conference 2024",
            issueDate: "2024-10-20",
            downloadUrl: "#",
            verified: true
        },
        {
            id: 3,
            title: "Cybersecurity Fundamentals",
            event: "Security Workshop",
            issueDate: "2024-09-10",
            downloadUrl: "#",
            verified: true
        },
        {
            id: 4,
            title: "React Native Masterclass",
            event: "Mobile Development Series",
            issueDate: "2024-08-05",
            downloadUrl: "#",
            verified: false
        },
    ];

    const securityLogs: SecurityLog[] = [
        {
            id: 1,
            action: "Successful Login",
            device: "Chrome on Windows",
            location: "New York, USA",
            timestamp: "10 minutes ago",
            status: 'success'
        },
        {
            id: 2,
            action: "Password Changed",
            device: "Chrome on Windows",
            location: "New York, USA",
            timestamp: "2 days ago",
            status: 'success'
        },
        {
            id: 3,
            action: "Failed Login Attempt",
            device: "Unknown Browser",
            location: "Tokyo, Japan",
            timestamp: "5 days ago",
            status: 'failed'
        },
        {
            id: 4,
            action: "New Device Registered",
            device: "Safari on iPhone",
            location: "New York, USA",
            timestamp: "1 week ago",
            status: 'warning'
        },
    ];

    const progressPercentage = (user.points / user.nextLevelPoints) * 100;

    const handleSave = () => {
        setUser(editedUser);
        setIsEditing(false);
        toast.success("Profile updated successfully!");
    };

    const handleCancel = () => {
        setEditedUser({ ...user });
        setIsEditing(false);
    };

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size should be less than 5MB");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedUser({
                    ...editedUser,
                    avatarUrl: reader.result as string
                });
                toast.success("Profile picture updated!");
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNotificationChange = (key: keyof typeof notifications) => {
        setNotifications({
            ...notifications,
            [key]: !notifications[key]
        });
        toast.success(`Notifications ${!notifications[key] ? 'enabled' : 'disabled'}`);
    };

    const handleSecurityChange = (key: keyof typeof security) => {
        if (key === 'twoFactorEnabled' || key === 'requireLoginVerification' || key === 'showLastLogin') {
            setSecurity({
                ...security,
                [key]: !security[key]
            });
            toast.success(`${key.replace(/([A-Z])/g, ' $1')} ${!security[key as keyof typeof security] ? 'enabled' : 'disabled'}`);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'success': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
            case 'failed': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
            case 'warning': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
        }
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'event': return Award;
            case 'certificate': return Download;
            case 'login': return Shield;
            case 'profile_update': return Edit;
            case 'payment': return CreditCard;
            default: return History;
        }
    };

    // ID Card download function
    const handleDownloadIDCard = () => {
        toast.success("ID Card downloaded successfully!");
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
        <div className="space-y-6">
            {/* Profile Header */}
            <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6">
                        {/* Avatar Section */}
                        <div className="relative">
                            <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-white dark:border-[#0F172A] shadow-lg">
                                <AvatarImage src={editedUser.avatarUrl} />
                                <AvatarFallback className="bg-[#2563EB] text-white text-xl sm:text-2xl">
                                    {editedUser.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                            {isEditing && (
                                <label className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 cursor-pointer">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#2563EB] flex items-center justify-center hover:bg-[#1D4ED8] transition-colors">
                                        <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleAvatarUpload}
                                    />
                                </label>
                            )}
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 mb-4">
                                <div className="flex-1 min-w-0">
                                    {isEditing ? (
                                        <Input
                                            value={editedUser.name}
                                            onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                                            className="text-xl sm:text-2xl font-bold mb-2"
                                        />
                                    ) : (
                                        <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-[#E5E7EB] truncate">
                                            {user.name}
                                        </h2>
                                    )}
                                    <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                                        <Badge className={cn(
                                            "text-xs sm:text-sm",
                                            user.membershipStatus === 'active'
                                                ? "bg-[#22C55E]/10 text-[#22C55E] hover:bg-[#22C55E]/20"
                                                : user.membershipStatus === 'expired'
                                                    ? "bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444]/20"
                                                    : "bg-[#F59E0B]/10 text-[#F59E0B] hover:bg-[#F59E0B]/20"
                                        )}>
                                            {user.membershipStatus === 'active' ? 'Active Member' :
                                                user.membershipStatus === 'expired' ? 'Membership Expired' : 'Pending'}
                                        </Badge>
                                        <Badge variant="outline" className="text-xs sm:text-sm border-[#2563EB] text-[#2563EB]">
                                            Level {user.level}
                                        </Badge>
                                        {user.role === 'admin' && (
                                            <Badge variant="outline" className="text-xs sm:text-sm border-[#8B5CF6] text-[#8B5CF6]">
                                                Admin
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 w-full md:w-auto mt-2 md:mt-0">
                                    {isEditing ? (
                                        <>
                                            <Button onClick={handleSave} className="gap-1 sm:gap-2 flex-1 md:flex-none">
                                                <Save className="w-4 h-4" />
                                                <span className="hidden sm:inline">Save</span>
                                            </Button>
                                            <Button variant="outline" onClick={handleCancel} className="gap-1 sm:gap-2 flex-1 md:flex-none">
                                                <X className="w-4 h-4" />
                                                <span className="hidden sm:inline">Cancel</span>
                                            </Button>
                                        </>
                                    ) : (
                                        <Button onClick={() => setIsEditing(true)} className="gap-1 sm:gap-2 w-full md:w-auto">
                                            <Edit className="w-4 h-4" />
                                            <span className="hidden sm:inline">Edit Profile</span>
                                            <span className="sm:hidden">Edit</span>
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="mb-4 sm:mb-6">
                                <label className="block text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-2">
                                    Bio
                                </label>
                                {isEditing ? (
                                    <Textarea
                                        value={editedUser.bio}
                                        onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                                        rows={3}
                                        placeholder="Tell us about yourself..."
                                        className="text-sm sm:text-base"
                                    />
                                ) : (
                                    <p className="text-sm sm:text-base text-[#475569] dark:text-[#94A3B8]">
                                        {user.bio}
                                    </p>
                                )}
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
                                <Progress value={progressPercentage} className="h-1.5 sm:h-2 mb-2" />
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
                <CardHeader>
                    <CardTitle className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#E5E7EB] flex items-center gap-2">
                        <User className="w-4 h-4 sm:w-5 sm:h-5" />
                        Personal Information
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        Your personal details and contact information
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-3 sm:space-y-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                                    Email Address
                                </label>
                                {isEditing ? (
                                    <Input
                                        type="email"
                                        value={editedUser.email}
                                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                                        className="text-sm sm:text-base"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#475569] dark:text-[#94A3B8]" />
                                        <span className="text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB] truncate">{user.email}</span>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                                    Phone Number
                                </label>
                                {isEditing ? (
                                    <Input
                                        value={editedUser.phone}
                                        onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                                        className="text-sm sm:text-base"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#475569] dark:text-[#94A3B8]" />
                                        <span className="text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">{user.phone}</span>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                                    Student ID
                                </label>
                                <div className="flex items-center gap-2">
                                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#475569] dark:text-[#94A3B8]" />
                                    <span className="text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">{user.studentId}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                                    Date of Birth
                                </label>
                                {isEditing ? (
                                    <Input
                                        type="date"
                                        value={editedUser.dateOfBirth}
                                        onChange={(e) => setEditedUser({ ...editedUser, dateOfBirth: e.target.value })}
                                        className="text-sm sm:text-base"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#475569] dark:text-[#94A3B8]" />
                                        <span className="text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">
                                            {new Date(user.dateOfBirth).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                                    Gender
                                </label>
                                {isEditing ? (
                                    <Select
                                        value={editedUser.gender}
                                        onValueChange={(value) => setEditedUser({ ...editedUser, gender: value as 'male' | 'female' | 'other' })}
                                    >
                                        <SelectTrigger className="text-sm sm:text-base">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male" className="text-sm sm:text-base">Male</SelectItem>
                                            <SelectItem value="female" className="text-sm sm:text-base">Female</SelectItem>
                                            <SelectItem value="other" className="text-sm sm:text-base">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <span className="text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB] capitalize">{user.gender}</span>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                                    Membership Since
                                </label>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#475569] dark:text-[#94A3B8]" />
                                    <span className="text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">
                                        {new Date(user.joinDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long'
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="mt-4 sm:mt-6">
                        <label className="block text-xs sm:text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                            Address
                        </label>
                        {isEditing ? (
                            <Textarea
                                value={editedUser.address}
                                onChange={(e) => setEditedUser({ ...editedUser, address: e.target.value })}
                                rows={2}
                                placeholder="Enter your address"
                                className="text-sm sm:text-base"
                            />
                        ) : (
                            <div className="flex items-start gap-2">
                                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#475569] dark:text-[#94A3B8] mt-0.5" />
                                <span className="text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">{user.address}</span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Academic Information */}
            <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                <CardHeader>
                    <CardTitle className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#E5E7EB] flex items-center gap-2">
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                        Academic Information
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                                Course
                            </label>
                            {isEditing ? (
                                <Input
                                    value={editedUser.course}
                                    onChange={(e) => setEditedUser({ ...editedUser, course: e.target.value })}
                                    className="text-sm sm:text-base"
                                />
                            ) : (
                                <span className="text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">{user.course}</span>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                                Specialization
                            </label>
                            {isEditing ? (
                                <Input
                                    value={editedUser.specialization}
                                    onChange={(e) => setEditedUser({ ...editedUser, specialization: e.target.value })}
                                    className="text-sm sm:text-base"
                                />
                            ) : (
                                <span className="text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">{user.specialization}</span>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                                Current Semester
                            </label>
                            {isEditing ? (
                                <Select
                                    value={editedUser.semester.toString()}
                                    onValueChange={(value) => setEditedUser({ ...editedUser, semester: parseInt(value) })}
                                >
                                    <SelectTrigger className="text-sm sm:text-base">
                                        <SelectValue placeholder="Select semester" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[1, 2, 3, 4, 5, 6].map((sem) => (
                                            <SelectItem key={sem} value={sem.toString()} className="text-sm sm:text-base">
                                                Semester {sem}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <span className="text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">Semester {user.semester}</span>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );





    const renderIDCardTab = () => (
        <div className="space-y-6">
            {/* ID Card Actions */}
            <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                <CardHeader>
                    <CardTitle className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#E5E7EB] flex items-center gap-2">
                        <IdCard className="w-4 h-4 sm:w-5 sm:h-5" />
                        Digital ID Card
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        Download, print, or share your digital ID card
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        <Button onClick={handleDownloadIDCard} className="gap-1 sm:gap-2 flex-1 sm:flex-none">
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Download PDF</span>
                            <span className="sm:hidden">Download</span>
                        </Button>
                        <Button onClick={handlePrintIDCard} variant="outline" className="gap-1 sm:gap-2 flex-1 sm:flex-none">
                            <Printer className="w-4 h-4" />
                            <span className="hidden sm:inline">Print</span>
                        </Button>
                        <Button onClick={handleShareIDCard} variant="outline" className="gap-1 sm:gap-2 flex-1 sm:flex-none">
                            <Share2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Share</span>
                        </Button>
                        <Button variant="outline" className="gap-1 sm:gap-2 flex-1 sm:flex-none">
                            <QrCode className="w-4 h-4" />
                            <span className="hidden sm:inline">QR Code</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* ID Card Display */}
            <div ref={idCardRef} className="print:block">
                <Card className="border-[#E5E7EB] dark:border-[#1E293B] overflow-hidden print:border-2 print:border-gray-300">
                    <CardContent className="p-0">
                        {/* ID Card Header */}
                        <div className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] p-4 sm:p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <Building className="w-6 h-6 sm:w-8 sm:h-8" />
                                    <div>
                                        <h2 className="text-lg sm:text-2xl font-bold">BCA Association</h2>
                                        <p className="text-xs sm:text-sm opacity-90">Member Identity Card</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs sm:text-sm opacity-90">Valid Until</div>
                                    <div className="font-bold text-sm sm:text-base">Dec 2025</div>
                                </div>
                            </div>
                        </div>

                        {/* ID Card Body */}
                        <div className="p-4 sm:p-6">
                            <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                                {/* Left Column - Photo and Basic Info */}
                                <div className="flex flex-col items-center md:items-start gap-3 sm:gap-4 md:w-1/3">
                                    <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-[#2563EB]/20">
                                        <AvatarImage src={user.avatarUrl} />
                                        <AvatarFallback className="bg-[#2563EB] text-white text-2xl">
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="text-center md:text-left">
                                        <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB] mb-1">
                                            {user.name}
                                        </h3>
                                        <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                                            <Badge className="bg-[#22C55E]/10 text-[#22C55E] text-xs">
                                                Active Member
                                            </Badge>
                                            <Badge variant="outline" className="border-[#2563EB] text-[#2563EB] text-xs">
                                                Level {user.level}
                                            </Badge>
                                        </div>
                                        <div className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">
                                            Member ID: {user.studentId}
                                        </div>
                                    </div>

                                    {/* QR Code Placeholder */}
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                                        <QrCode className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
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
                                                {user.course}
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-[#475569] dark:text-[#94A3B8]" />
                                                <span className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">Semester</span>
                                            </div>
                                            <div className="font-medium text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">
                                                Semester {user.semester}
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-[#475569] dark:text-[#94A3B8]" />
                                                <span className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">Email</span>
                                            </div>
                                            <div className="font-medium text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB] truncate">
                                                {user.email}
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-[#475569] dark:text-[#94A3B8]" />
                                                <span className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">Phone</span>
                                            </div>
                                            <div className="font-medium text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">
                                                {user.phone}
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-[#475569] dark:text-[#94A3B8]" />
                                                <span className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">Member Since</span>
                                            </div>
                                            <div className="font-medium text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">
                                                {new Date(user.joinDate).toLocaleDateString('en-US', {
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
                <Card className="border-[#E5E7EB] dark:border-[#1E293B] mt-6">
                    <CardHeader>
                        <CardTitle className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                            ID Card Usage
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
                                        <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 dark:bg-[#2563EB]/20 flex items-center justify-center mx-auto mb-2">
                                            <Icon className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6]" />
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
        <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white dark:from-[#020617] dark:to-[#0F172A]">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="flex-1 min-w-0">
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                Profile Settings
                            </h1>
                            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] truncate">
                                Manage your personal information, activity, and account settings
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                            <Button variant="outline" className="gap-1 sm:gap-2 text-xs sm:text-sm flex-1 sm:flex-none">
                                <QrCode className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline">QR Code</span>
                            </Button>
                            <Link href="/dashboard" className="flex-1 sm:flex-none">
                                <Button variant="outline" className="w-full text-xs sm:text-sm">
                                    <span className="hidden sm:inline">Back to Dashboard</span>
                                    <span className="sm:hidden">Dashboard</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                    {/* Sidebar - Hidden on small screens */}
                    <div className="hidden lg:block lg:col-span-1">
                        <Card className="border-[#E5E7EB] dark:border-[#1E293B] sticky top-6">
                            <CardContent className="p-0">
                                <div className="p-4 sm:p-6 border-b border-[#E5E7EB] dark:border-[#1E293B]">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                                            <AvatarImage src={user.avatarUrl} />
                                            <AvatarFallback className="bg-[#2563EB] text-white">
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-semibold text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB] truncate">
                                                {user.name}
                                            </h3>
                                            <p className="text-xs text-[#475569] dark:text-[#94A3B8] truncate">
                                                {user.studentId}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-3 sm:p-4">
                                    <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
                                        <TabsList className="flex flex-col h-auto p-0 bg-transparent">
                                            <TabsTrigger
                                                value="profile"
                                                className={cn(
                                                    "justify-start px-3 py-2 sm:py-3 mb-1 text-xs sm:text-sm",
                                                    "data-[state=active]:bg-[#2563EB]/10 data-[state=active]:text-[#2563EB]",
                                                    "dark:data-[state=active]:bg-[#2563EB]/20 dark:data-[state=active]:text-[#3B82F6]",
                                                    "hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]"
                                                )}
                                            >
                                                <User className="w-3.5 h-3.5 sm:w-4 h-4 mr-2 sm:mr-3" />
                                                Profile
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="activity"
                                                className={cn(
                                                    "justify-start px-3 py-2 sm:py-3 mb-1 text-xs sm:text-sm",
                                                    "data-[state=active]:bg-[#2563EB]/10 data-[state=active]:text-[#2563EB]",
                                                    "dark:data-[state=active]:bg-[#2563EB]/20 dark:data-[state=active]:text-[#3B82F6]",
                                                    "hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]"
                                                )}
                                            >
                                                <History className="w-3.5 h-3.5 sm:w-4 h-4 mr-2 sm:mr-3" />
                                                Activity
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="idcard"
                                                className={cn(
                                                    "justify-start px-3 py-2 sm:py-3 mb-1 text-xs sm:text-sm",
                                                    "data-[state=active]:bg-[#2563EB]/10 data-[state=active]:text-[#2563EB]",
                                                    "dark:data-[state=active]:bg-[#2563EB]/20 dark:data-[state=active]:text-[#3B82F6]",
                                                    "hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]"
                                                )}
                                            >
                                                <IdCard className="w-3.5 h-3.5 sm:w-4 h-4 mr-2 sm:mr-3" />
                                                ID Card
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="settings"
                                                className={cn(
                                                    "justify-start px-3 py-2 sm:py-3 mb-1 text-xs sm:text-sm",
                                                    "data-[state=active]:bg-[#2563EB]/10 data-[state=active]:text-[#2563EB]",
                                                    "dark:data-[state=active]:bg-[#2563EB]/20 dark:data-[state=active]:text-[#3B82F6]",
                                                    "hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]"
                                                )}
                                            >
                                                <Settings className="w-3.5 h-3.5 sm:w-4 h-4 mr-2 sm:mr-3" />
                                                Settings
                                            </TabsTrigger>
                                        </TabsList>
                                    </Tabs>
                                </div>

                                {/* Quick Stats */}
                                <div className="p-3 sm:p-4 border-t border-[#E5E7EB] dark:border-[#1E293B]">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-[#475569] dark:text-[#94A3B8]">Member Level</span>
                                            <span className="font-medium text-xs sm:text-sm text-[#0F172A] dark:text-[#E5E7EB]">Level {user.level}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-[#475569] dark:text-[#94A3B8]">Points</span>
                                            <span className="font-medium text-xs sm:text-sm text-[#0F172A] dark:text-[#E5E7EB]">{user.points}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-[#475569] dark:text-[#94A3B8]">Status</span>
                                            <Badge className={cn(
                                                "text-xs",
                                                user.membershipStatus === 'active'
                                                    ? "bg-[#22C55E]/10 text-[#22C55E] hover:bg-[#22C55E]/20"
                                                    : user.membershipStatus === 'expired'
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
                        {/* Mobile Tabs */}
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="lg:hidden mb-4 sm:mb-6">
                            <TabsList className="grid grid-cols-4 w-full">
                                <TabsTrigger value="profile" className="text-xs px-2">
                                    <User className="w-3.5 h-3.5 sm:w-4 h-4" />
                                    <span className="sr-only sm:not-sr-only sm:ml-1">Profile</span>
                                </TabsTrigger>
                                <TabsTrigger value="activity" className="text-xs px-2">
                                    <History className="w-3.5 h-3.5 sm:w-4 h-4" />
                                    <span className="sr-only sm:not-sr-only sm:ml-1">Activity</span>
                                </TabsTrigger>
                                <TabsTrigger value="idcard" className="text-xs px-2">
                                    <IdCard className="w-3.5 h-3.5 sm:w-4 h-4" />
                                    <span className="sr-only sm:not-sr-only sm:ml-1">ID Card</span>
                                </TabsTrigger>
                                <TabsTrigger value="settings" className="text-xs px-2">
                                    <Settings className="w-3.5 h-3.5 sm:w-4 h-4" />
                                    <span className="sr-only sm:not-sr-only sm:ml-1">Settings</span>
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