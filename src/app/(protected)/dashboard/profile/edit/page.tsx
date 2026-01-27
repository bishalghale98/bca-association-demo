'use client'

import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
    User,
    Mail,
    Phone,
    Calendar,
    MapPin,
    Save,
    X,
    Camera,
    BookOpen,
    GraduationCap,
    Hash,
    AlertCircle,
    Droplets,
    Shield,
    BadgeCheck,
    Award,
    TrendingUp
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Gender, MembershipStatus, UserRole } from '@/types/user/enums';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateUser, AllStatus, resetState } from '@/store/auth/authSlice';

// Define validation schema
const profileFormSchema = z.object({
    avatar: z.instanceof(File).optional().nullable(),
    phone: z.string().optional().nullable(),
    bio: z.string().max(500, "Bio must be less than 500 characters").optional().nullable(),
    course: z.string().max(100, "Course name too long").optional().nullable(),
    specialization: z.string().max(100, "Specialization name too long").optional().nullable(),
    semester: z.string().optional().nullable(),
    dateOfBirth: z.string().optional().nullable(),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER'] as const).optional().nullable(),
    address: z.string().max(200, "Address too long").optional().nullable(),
    bloodGroup: z.string().optional().nullable(),
    emergencyContact: z.string().max(100, "Emergency contact too long").optional().nullable(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const EditProfilePage = () => {
    const { data: session, status, update } = useSession();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const dispatch = useAppDispatch()
    const { allStatus, error, updatedUser } = useAppSelector((store) => store.auth)

    // Initialize form with current user data
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            avatar: null,
            phone: session?.user.phone || '',
            bio: session?.user.bio || '',
            course: session?.user.course || '',
            specialization: session?.user.specialization || '',
            semester: session?.user.semester || '',
            dateOfBirth: session?.user.dateOfBirth
                ? new Date(session.user.dateOfBirth).toISOString().split('T')[0]
                : '',
            gender: session?.user.gender,
            address: session?.user.address || '',
            bloodGroup: session?.user.bloodGroup || '',
            emergencyContact: session?.user.emergencyContact || '',
        },
        mode: 'onChange',
    });

    // Reset form when session data changes
    useEffect(() => {
        if (session?.user) {
            form.reset({
                avatar: null,
                phone: session.user.phone || '',
                bio: session.user.bio || '',
                course: session.user.course || '',
                specialization: session.user.specialization || '',
                semester: session.user.semester || '',
                dateOfBirth: session.user.dateOfBirth
                    ? new Date(session.user.dateOfBirth).toISOString().split('T')[0]
                    : '',
                gender: session.user.gender,
                address: session.user.address || '',
                bloodGroup: session.user.bloodGroup || '',
                emergencyContact: session.user.emergencyContact || '',
            });
        }
    }, [session, form]);

    // Handle Redux update success
    useEffect(() => {
        if (allStatus === AllStatus.SUCCESS) {

            // Update NextAuth session with the updated user data
            if (updatedUser) {
                update({
                    ...session,
                    user: {
                        ...session?.user,
                        ...updatedUser
                    }
                }).then(() => {
                    // Redirect to profile page after successful update
                    toast.success("Profile successfully updated");

                    dispatch(resetState())
                    router.push('/dashboard/profile');
                });
            }
            setIsSubmitting(false);
        }

        if (allStatus === AllStatus.ERROR) {
            toast.error(error || "Failed to update profile");
            setIsSubmitting(false);
        }
    }, [allStatus, error, updatedUser, update, session, router]);

    // Update avatar preview
    const watchedAvatar = form.watch('avatar');
    React.useEffect(() => {
        if (watchedAvatar && watchedAvatar instanceof File) {
            const previewUrl = URL.createObjectURL(watchedAvatar);
            setAvatarPreview(previewUrl);
            return () => URL.revokeObjectURL(previewUrl);
        } else if (session?.user?.avatarUrl) {
            setAvatarPreview(session.user.avatarUrl);
        }
    }, [watchedAvatar, session?.user?.avatarUrl]);

    // Show loading state while session is loading
    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-linear-to-b from-[#F8FAFC] to-white dark:from-[#020617] dark:to-[#0F172A]">
                <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
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
                <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
                    <div className="text-center py-16">
                        <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB] mb-2">
                            Please sign in to edit your profile
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

    const onSubmit = async (data: ProfileFormValues) => {
        setIsSubmitting(true);

        const formData = new FormData();

        // Add avatar file if exists
        if (data.avatar && data.avatar instanceof File) {
            formData.append('avatar', data.avatar);
        }

        // Add other form data as JSON
        const otherData = {
            phone: data.phone || null,
            bio: data.bio || null,
            course: data.course || null,
            specialization: data.specialization || null,
            semester: data.semester || null,
            dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString() : null,
            gender: data.gender,
            address: data.address || null,
            bloodGroup: data.bloodGroup || null,
            emergencyContact: data.emergencyContact || null,
        };

        formData.append('data', JSON.stringify(otherData));

        // Dispatch update action
        await dispatch(updateUser(formData));
    };

    const handleCancel = () => {
        router.push('/dashboard/profile');
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-[#F8FAFC] to-white dark:from-[#020617] dark:to-[#0F172A]">
            <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="flex-1 min-w-0">
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                                Edit Profile
                            </h1>
                            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">
                                Update your personal and academic information
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                            <Link href="/dashboard/profile" className="flex-1 sm:flex-none">
                                <Button variant="outline" className="w-full text-xs sm:text-sm">
                                    <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Profile Header Card */}
                        <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                            <CardContent className="p-4 sm:p-6">
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6">
                                    {/* Avatar Section */}
                                    <FormField
                                        control={form.control}
                                        name="avatar"
                                        render={({ field: { onChange, value, ...field } }) => (
                                            <FormItem className="relative">
                                                <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-white dark:border-[#0F172A] shadow-lg">
                                                    <AvatarImage src={avatarPreview || user.avatarUrl || ''} />
                                                    <AvatarFallback className="bg-[#2563EB] text-white text-xl sm:text-2xl">
                                                        {user.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <label className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 cursor-pointer">
                                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#2563EB] flex items-center justify-center hover:bg-[#1D4ED8] transition-colors">
                                                        <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                                    </div>
                                                    <FormControl>
                                                        <Input
                                                            type="file"
                                                            className="hidden"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) {
                                                                    if (file.size > 5 * 1024 * 1024) {
                                                                        toast.error("File size should be less than 5MB");
                                                                        return;
                                                                    }
                                                                    if (!file.type.startsWith('image/')) {
                                                                        toast.error("Please select an image file");
                                                                        return;
                                                                    }
                                                                    onChange(file);
                                                                }
                                                            }}
                                                            {...field}
                                                            value={value?.name || ''}
                                                        />
                                                    </FormControl>
                                                </label>
                                                {isSubmitting && (
                                                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
                                                        <span className="text-white text-sm animate-pulse">
                                                            Uploading...
                                                        </span>
                                                    </div>
                                                )}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Profile Info */}
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 mb-4">
                                            <div className="flex-1 min-w-0">
                                                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-[#E5E7EB] truncate">
                                                    {user.name}
                                                </h2>
                                                <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-2">
                                                    <Badge className={cn(
                                                        "text-xs sm:text-sm",
                                                        user.membershipStatus === MembershipStatus.ACTIVE
                                                            ? "bg-[#22C55E]/10 text-[#22C55E] hover:bg-[#22C55E]/20"
                                                            : user.membershipStatus === MembershipStatus.EXPIRED
                                                                ? "bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444]/20"
                                                                : "bg-[#F59E0B]/10 text-[#F59E0B] hover:bg-[#F59E0B]/20"
                                                    )}>
                                                        {user.membershipStatus}
                                                    </Badge>
                                                    <Badge variant="outline" className="text-xs sm:text-sm border-[#2563EB] text-[#2563EB]">
                                                        Level {user.level}
                                                    </Badge>
                                                    {user.role === UserRole.ADMIN && (
                                                        <Badge variant="outline" className="text-xs sm:text-sm border-[#8B5CF6] text-[#8B5CF6]">
                                                            Admin
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bio Field */}
                                        <FormField
                                            control={form.control}
                                            name="bio"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-medium text-[#475569] dark:text-[#94A3B8]">
                                                        Bio
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Tell us about yourself..."
                                                            className="resize-none min-h-25 text-sm sm:text-base"
                                                            {...field}
                                                            value={field.value || ''}
                                                            disabled={isSubmitting}
                                                        />
                                                    </FormControl>
                                                    <FormDescription className="text-xs">
                                                        Briefly describe yourself, your interests, or your goals
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Points Progress - Read Only */}
                                        <div className="bg-[#F8FAFC] dark:bg-[#0F172A] rounded-lg p-3 sm:p-4 mt-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Award className="w-4 h-4 text-[#2563EB]" />
                                                    <span className="text-xs sm:text-sm font-medium text-[#475569] dark:text-[#94A3B8]">
                                                        Member Points
                                                    </span>
                                                </div>
                                                <span className="text-xs sm:text-sm font-bold text-[#2563EB] dark:text-[#3B82F6]">
                                                    {user.points} / {user.nextLevelPoints}
                                                </span>
                                            </div>
                                            <Progress value={progressPercentage} className="h-1.5 sm:h-2 mb-2" />
                                            <div className="text-xs text-[#475569] dark:text-[#94A3B8] flex items-center justify-between">
                                                <span>
                                                    {user.nextLevelPoints - user.points} points to Level {user.level + 1}
                                                </span>
                                                <TrendingUp className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Read-Only Information Card */}
                        <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                            <CardHeader>
                                <CardTitle className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#E5E7EB] flex items-center gap-2">
                                    <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                                    Account Information
                                </CardTitle>
                                <CardDescription className="text-xs sm:text-sm">
                                    These details cannot be changed
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="space-y-3 sm:space-y-4">
                                        <div>
                                            <Label className="block text-xs sm:text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                                                <div className="flex items-center gap-2">
                                                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    Full Name
                                                </div>
                                            </Label>
                                            <Input
                                                value={user.name}
                                                readOnly
                                                className="text-sm sm:text-base bg-gray-50 dark:bg-gray-900"
                                            />
                                        </div>

                                        <div>
                                            <Label className="block text-xs sm:text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                                                <div className="flex items-center gap-2">
                                                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    Email Address
                                                </div>
                                            </Label>
                                            <Input
                                                value={user.email}
                                                readOnly
                                                className="text-sm sm:text-base bg-gray-50 dark:bg-gray-900"
                                            />
                                        </div>

                                        <div>
                                            <Label className="block text-xs sm:text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                                                <div className="flex items-center gap-2">
                                                    <Hash className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    Student ID
                                                </div>
                                            </Label>
                                            <Input
                                                value={user.studentId}
                                                readOnly
                                                className="text-sm sm:text-base bg-gray-50 dark:bg-gray-900"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3 sm:space-y-4">
                                        <div>
                                            <Label className="block text-xs sm:text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    Join Date
                                                </div>
                                            </Label>
                                            <Input
                                                value={new Date(user.joinDate as Date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                                readOnly
                                                className="text-sm sm:text-base bg-gray-50 dark:bg-gray-900"
                                            />
                                        </div>

                                        <div>
                                            <Label className="block text-xs sm:text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                                                <div className="flex items-center gap-2">
                                                    <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    Membership Status
                                                </div>
                                            </Label>
                                            <Input
                                                value={user.membershipStatus}
                                                readOnly
                                                className="text-sm sm:text-base bg-gray-50 dark:bg-gray-900"
                                            />
                                        </div>

                                        <div>
                                            <Label className="block text-xs sm:text-sm font-medium text-[#475569] dark:text-[#94A3B8] mb-1">
                                                <div className="flex items-center gap-2">
                                                    <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    Member Level
                                                </div>
                                            </Label>
                                            <Input
                                                value={`Level ${user.level}`}
                                                readOnly
                                                className="text-sm sm:text-base bg-gray-50 dark:bg-gray-900"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Editable Personal Information */}
                        <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                            <CardHeader>
                                <CardTitle className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#E5E7EB] flex items-center gap-2">
                                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                                    Personal Information
                                </CardTitle>
                                <CardDescription className="text-xs sm:text-sm">
                                    Update your personal details
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                                    {/* Phone Number */}
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2 text-xs sm:text-sm">
                                                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    Phone Number
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="tel"
                                                        placeholder="Enter your phone number"
                                                        className="text-sm sm:text-base"
                                                        {...field}
                                                        value={field.value || ''}
                                                        disabled={isSubmitting}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Gender */}
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2 text-xs sm:text-sm">
                                                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    Gender
                                                </FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value || ''}
                                                    value={field.value || ''}
                                                    disabled={isSubmitting}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="text-sm sm:text-base">
                                                            <SelectValue placeholder="Select gender" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="MALE">Male</SelectItem>
                                                        <SelectItem value="FEMALE">Female</SelectItem>
                                                        <SelectItem value="OTHER">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Date of Birth */}
                                    <FormField
                                        control={form.control}
                                        name="dateOfBirth"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2 text-xs sm:text-sm">
                                                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    Date of Birth
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="date"
                                                        className="text-sm sm:text-base"
                                                        {...field}
                                                        value={field.value || ''}
                                                        disabled={isSubmitting}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Blood Group */}
                                    <FormField
                                        control={form.control}
                                        name="bloodGroup"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2 text-xs sm:text-sm">
                                                    <Droplets className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    Blood Group
                                                </FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value || ''}
                                                    value={field.value || ''}
                                                    disabled={isSubmitting}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="text-sm sm:text-base">
                                                            <SelectValue placeholder="Select blood group" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="A+">A+</SelectItem>
                                                        <SelectItem value="A-">A-</SelectItem>
                                                        <SelectItem value="B+">B+</SelectItem>
                                                        <SelectItem value="B-">B-</SelectItem>
                                                        <SelectItem value="AB+">AB+</SelectItem>
                                                        <SelectItem value="AB-">AB-</SelectItem>
                                                        <SelectItem value="O+">O+</SelectItem>
                                                        <SelectItem value="O-">O-</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Address */}
                                <div className="mt-4 sm:mt-6">
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2 text-xs sm:text-sm">
                                                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    Address
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Enter your address"
                                                        className="text-sm sm:text-base min-h-20"
                                                        {...field}
                                                        value={field.value || ''}
                                                        disabled={isSubmitting}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
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
                                <CardDescription className="text-xs sm:text-sm">
                                    Update your academic details
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                                    {/* Course */}
                                    <FormField
                                        control={form.control}
                                        name="course"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2 text-xs sm:text-sm">
                                                    <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    Course
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your course"
                                                        className="text-sm sm:text-base"
                                                        {...field}
                                                        value={field.value || ''}
                                                        disabled={isSubmitting}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Specialization */}
                                    <FormField
                                        control={form.control}
                                        name="specialization"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2 text-xs sm:text-sm">
                                                    <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    Specialization
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your specialization"
                                                        className="text-sm sm:text-base"
                                                        {...field}
                                                        value={field.value || ''}
                                                        disabled={isSubmitting}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Semester */}
                                    <FormField
                                        control={form.control}
                                        name="semester"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2 text-xs sm:text-sm">
                                                    <Hash className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    Current Semester
                                                </FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value || ''}
                                                        value={field.value || ''}
                                                        disabled={isSubmitting}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="text-sm sm:text-base">
                                                                <SelectValue placeholder="Select semester" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                                                                <SelectItem key={sem} value={sem.toString()}>
                                                                    Semester {sem}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Emergency Information */}
                        <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                            <CardHeader>
                                <CardTitle className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#E5E7EB] flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                    Emergency Information
                                </CardTitle>
                                <CardDescription className="text-xs sm:text-sm">
                                    For emergency situations
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="md:grid md:grid-cols-2 gap-4 sm:gap-6">
                                    <FormField
                                        control={form.control}
                                        name="emergencyContact"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2 text-xs sm:text-sm">
                                                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    Emergency Contact
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter emergency contact number"
                                                        className="text-sm sm:text-base"
                                                        {...field}
                                                        value={field.value || ''}
                                                        disabled={isSubmitting}
                                                    />
                                                </FormControl>
                                                <FormDescription className="text-xs">
                                                    Include name and relationship (e.g., &quot;John Doe - Father&quot;)
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                                className="flex-1 sm:flex-none"
                                disabled={isSubmitting}
                            >
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1 sm:flex-none"
                                disabled={isSubmitting || !form.formState.isDirty}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default EditProfilePage;