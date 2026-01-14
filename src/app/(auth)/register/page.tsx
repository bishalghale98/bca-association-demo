"use client";

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
    Eye,
    EyeOff,
    UserPlus,
    Mail,
    Lock,
    Shield,
    GraduationCap,
    Users,
    ArrowRight,
    CheckCircle,
    AlertCircle,
    Fingerprint,
    BookOpen,
    Calendar,
    Phone,
    User,
    Hash,
    ChevronLeft,
    Loader2,
    LogIn,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Define form schema with Zod
const registerFormSchema = z.object({
    // Step 1: Personal Information
    fullName: z
        .string()
        .min(1, { message: "Full name is required" })
        .min(3, { message: "Full name must be at least 3 characters" }),

    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Please enter a valid email address" }),

    phone: z
        .string()
        .min(1, { message: "Phone number is required" })
        .regex(/^[0-9]{10}$/, { message: "Please enter a valid 10-digit phone number" }),

    studentId: z
        .string()
        .min(1, { message: "Student ID is required" })
        .regex(/^[Ss]\d{5}$/, { message: "Please enter a valid Student ID (e.g., S12345)" }),

    // Step 2: Academic Details
    batch: z.string().min(1, { message: "Batch selection is required" }),

    semester: z.string().min(1, { message: "Semester selection is required" }),

    // Step 3: Account Security
    password: z
        .string()
        .min(1, { message: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),

    confirmPassword: z.string().min(1, { message: "Please confirm your password" }),

    termsAccepted: z.boolean().refine(val => val === true, {
        message: "You must accept the terms and conditions",
    }),

    // Step 4: Association Agreement
    physicallyVerified: z.boolean().refine(val => val === true, {
        message: "You must confirm physical verification to proceed",
    }),

    associationRules: z.boolean().refine(val => val === true, {
        message: "You must agree to follow association rules",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Initialize form with react-hook-form
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            studentId: "",
            batch: "",
            semester: "",
            password: "",
            confirmPassword: "",
            termsAccepted: false,
            physicallyVerified: false,
            associationRules: false,
        },
        mode: "onChange",
    });

    // Batch and semester options
    const batchOptions = [
        { value: "2022-2025", label: "2022-2025" },
        { value: "2023-2026", label: "2023-2026" },
        { value: "2024-2027", label: "2024-2027" },
    ];

    const semesterOptions = [
        { value: "1", label: "Semester 1" },
        { value: "2", label: "Semester 2" },
        { value: "3", label: "Semester 3" },
        { value: "4", label: "Semester 4" },
        { value: "5", label: "Semester 5" },
        { value: "6", label: "Semester 6" },
    ];

    // Steps configuration
    const steps = [
        { id: 1, title: "Personal", description: "Basic info" },
        { id: 2, title: "Academic", description: "Education info" },
        { id: 3, title: "Security", description: "Password setup" },
        { id: 4, title: "Verify", description: "Agreement" },
    ];

    const onSubmit = async (data: RegisterFormValues) => {
        setIsLoading(true);
        setSubmitError(null);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setSubmitSuccess(true);
            console.log("Registration data:", data);
        }, 2000);
    };

    const nextStep = async () => {
        let isValid = false;

        switch (currentStep) {
            case 1:
                isValid = await form.trigger(["fullName", "email", "phone", "studentId"]);
                break;
            case 2:
                isValid = await form.trigger(["batch", "semester"]);
                break;
            case 3:
                isValid = await form.trigger(["password", "confirmPassword", "termsAccepted"]);
                break;
            case 4:
                isValid = await form.trigger(["physicallyVerified", "associationRules"]);
                break;
        }

        if (isValid && currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Registration benefits
    const benefits = [
        {
            icon: Shield,
            title: "Verified Membership",
            description: "Get officially recognized as a BCA Association member",
            color: "text-[#2563EB] bg-[#2563EB]/10",
        },
        {
            icon: BookOpen,
            title: "Study Resources",
            description: "Access exclusive study materials and workshop recordings",
            color: "text-[#38BDF8] bg-[#38BDF8]/10",
        },
        {
            icon: Users,
            title: "Networking",
            description: "Connect with seniors, alumni, and industry professionals",
            color: "text-[#22C55E] bg-[#22C55E]/10",
        },
        {
            icon: Calendar,
            title: "Events & Workshops",
            description: "Participate in hackathons, seminars, and tech workshops",
            color: "text-[#F59E0B] bg-[#F59E0B]/10",
        },
    ];

    // Password strength indicator
    const getPasswordStrength = (password: string) => {
        if (!password) return 0;

        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;

        return strength;
    };

    const passwordStrength = getPasswordStrength(form.watch("password"));

    if (submitSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-linear-to-br from-[#F8FAFC] to-[#E5E7EB] dark:from-[#020617] dark:to-[#0F172A]">
                <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg border-2 shadow-lg sm:shadow-2xl bg-white dark:bg-[#0F172A] border-[#E5E7EB] dark:border-[#1E293B]">
                    <CardHeader className="space-y-1 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-[#22C55E]" />
                            </div>
                        </div>
                        <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                            Registration Submitted!
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base text-[#475569] dark:text-[#94A3B8]">
                            Your application has been received successfully
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Alert className="bg-[#2563EB]/5 border-[#2563EB] dark:bg-[#2563EB]/10">
                            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#2563EB]" />
                            <AlertDescription className="text-xs sm:text-sm md:text-base">
                                <span className="font-semibold">Important:</span> Your account is now pending verification.
                                You will receive an email once the admin verifies your physical membership.
                            </AlertDescription>
                        </Alert>

                        <div className={cn(
                            "p-4 rounded-lg",
                            "bg-[#F8FAFC] border border-[#E5E7EB]",
                            "dark:bg-[#1E293B] dark:border-[#334155]"
                        )}>
                            <h4 className="font-semibold mb-2 text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">
                                What happens next?
                            </h4>
                            <ol className="space-y-2 text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] list-decimal pl-4">
                                <li>Admin will verify your physical association membership</li>
                                <li>You&apos;ll receive a verification email once approved</li>
                                <li>Login with your credentials to access the dashboard</li>
                                <li>Complete your profile to unlock all features</li>
                            </ol>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-3">
                        <Link href="/login" className="w-full">
                            <Button className="w-full h-10 sm:h-11 md:h-12 text-sm sm:text-base bg-linear-to-r from-[#2563EB] to-[#38BDF8] hover:from-[#1D4ED8] hover:to-[#0EA5E9]">
                                Go to Login
                            </Button>
                        </Link>
                        <Link href="/" className="w-full">
                            <Button variant="outline" className="w-full h-10 sm:h-11 md:h-12 text-sm sm:text-base">
                                Return to Home
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-[#F8FAFC] to-[#E5E7EB] dark:from-[#020617] dark:to-[#0F172A]">

            <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
                        {/* Left Side - Information & Benefits */}
                        <div className="lg:flex flex-col justify-center space-y-6 sm:space-y-8 md:space-y-10">
                            {/* Logo and Welcome - Mobile */}
                            <div className="sm:hidden mb-6 space-y-4">
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center mb-4">
                                        <div className={cn(
                                            "w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg",
                                            "bg-linear-to-br from-[#2563EB] to-[#38BDF8]"
                                        )}>
                                            <UserPlus className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                                        </div>
                                    </div>
                                    <h1 className={cn(
                                        "text-xl sm:text-2xl font-bold",
                                        "text-[#0F172A] dark:text-[#E5E7EB]"
                                    )}>
                                        Join BCA Association
                                    </h1>
                                    <p className={cn(
                                        "text-xs sm:text-sm mt-2",
                                        "text-[#475569] dark:text-[#94A3B8]"
                                    )}>
                                        Register as a verified member of MMMC College
                                    </p>
                                </div>
                            </div>

                            {/* Desktop Content */}
                            <div className="hidden sm:block space-y-6 sm:space-y-8 md:space-y-10">
                                {/* Logo and Welcome */}
                                <div className="space-y-4 sm:space-y-6">
                                    <div className="flex items-center space-x-3 sm:space-x-4">
                                        <div className={cn(
                                            "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg",
                                            "bg-linear-to-br from-[#2563EB] to-[#38BDF8]"
                                        )}>
                                            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                                        </div>
                                        <div>
                                            <h1 className={cn(
                                                "text-xl sm:text-2xl md:text-3xl font-bold",
                                                "text-[#0F172A] dark:text-[#E5E7EB]"
                                            )}>
                                                BCA Association
                                            </h1>
                                            <p className={cn(
                                                "text-sm sm:text-base md:text-lg",
                                                "text-[#475569] dark:text-[#94A3B8]"
                                            )}>
                                                MMMC College Registration
                                            </p>
                                        </div>
                                    </div>
                                    <h2 className={cn(
                                        "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight",
                                        "text-[#0F172A] dark:text-[#E5E7EB]"
                                    )}>
                                        Join the Exclusive
                                        <span className="text-[#2563EB] dark:text-[#3B82F6]"> BCA Community</span>
                                    </h2>
                                    <p className={cn(
                                        "text-sm sm:text-base md:text-lg leading-relaxed",
                                        "text-[#475569] dark:text-[#94A3B8]"
                                    )}>
                                        Register now to become a verified member of the BCA Association at MMMC College.
                                        Access exclusive resources, events, and networking opportunities.
                                    </p>
                                </div>

                                {/* Benefits Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                                    {benefits.map((benefit, index) => (
                                        <div
                                            key={index}
                                            className={cn(
                                                "p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl space-y-2 sm:space-y-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
                                                "bg-white border border-[#E5E7EB]",
                                                "dark:bg-[#0F172A] dark:border-[#1E293B]"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center",
                                                benefit.color
                                            )}>
                                                <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                            </div>
                                            <div>
                                                <h3 className={cn(
                                                    "font-semibold mb-1 text-xs sm:text-sm md:text-base",
                                                    "text-[#0F172A] dark:text-[#E5E7EB]"
                                                )}>
                                                    {benefit.title}
                                                </h3>
                                                <p className={cn(
                                                    "text-xs sm:text-sm leading-relaxed",
                                                    "text-[#475569] dark:text-[#94A3B8]"
                                                )}>
                                                    {benefit.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Important Notice */}
                                <Alert className={cn(
                                    "border-[#F59E0B] bg-[#F59E0B]/5",
                                    "dark:border-[#F59E0B] dark:bg-[#F59E0B]/10"
                                )}>
                                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#F59E0B]" />
                                    <AlertDescription className={cn(
                                        "text-xs sm:text-sm md:text-base",
                                        "text-[#0F172A] dark:text-[#E5E7EB]"
                                    )}>
                                        <span className="font-semibold">Important:</span> Registration is restricted to
                                        physically verified BCA Association members only. Admin verification required after submission.
                                    </AlertDescription>
                                </Alert>

                                {/* Verification Process */}
                                <div className={cn(
                                    "p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl",
                                    "bg-white border border-[#E5E7EB]",
                                    "dark:bg-[#0F172A] dark:border-[#1E293B]"
                                )}>
                                    <h4 className={cn(
                                        "font-bold mb-2 sm:mb-3 md:mb-4 flex items-center gap-2 text-xs sm:text-sm md:text-base",
                                        "text-[#0F172A] dark:text-[#E5E7EB]"
                                    )}>
                                        <Fingerprint className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#2563EB] dark:text-[#38BDF8]" />
                                        Registration Process
                                    </h4>
                                    <div className="space-y-2 sm:space-y-3 md:space-y-4">
                                        <div className="flex items-start space-x-2 sm:space-x-3">
                                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#2563EB] text-white text-xs flex items-center justify-center mt-0.5">
                                                1
                                            </div>
                                            <span className={cn(
                                                "text-xs sm:text-sm md:text-base",
                                                "text-[#475569] dark:text-[#94A3B8]"
                                            )}>
                                                <span className="font-semibold text-[#0F172A] dark:text-[#E5E7EB]">Register Online:</span> Fill this form
                                            </span>
                                        </div>
                                        <div className="flex items-start space-x-2 sm:space-x-3">
                                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#38BDF8] text-white text-xs flex items-center justify-center mt-0.5">
                                                2
                                            </div>
                                            <span className={cn(
                                                "text-xs sm:text-sm md:text-base",
                                                "text-[#475569] dark:text-[#94A3B8]"
                                            )}>
                                                <span className="font-semibold text-[#0F172A] dark:text-[#E5E7EB]">Admin Review:</span> Physical verification check
                                            </span>
                                        </div>
                                        <div className="flex items-start space-x-2 sm:space-x-3">
                                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#22C55E] text-white text-xs flex items-center justify-center mt-0.5">
                                                3
                                            </div>
                                            <span className={cn(
                                                "text-xs sm:text-sm md:text-base",
                                                "text-[#475569] dark:text-[#94A3B8]"
                                            )}>
                                                <span className="font-semibold text-[#0F172A] dark:text-[#E5E7EB]">Account Activation:</span> Full access granted
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Benefits - Show on small screens only */}
                            <div className="sm:hidden space-y-4">
                                <h3 className={cn(
                                    "text-lg font-bold text-center",
                                    "text-[#0F172A] dark:text-[#E5E7EB]"
                                )}>
                                    Why Join BCA Association?
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {benefits.map((benefit, index) => (
                                        <div
                                            key={index}
                                            className={cn(
                                                "p-3 rounded-lg text-center",
                                                "bg-white border border-[#E5E7EB]",
                                                "dark:bg-[#0F172A] dark:border-[#1E293B]"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2",
                                                benefit.color
                                            )}>
                                                <benefit.icon className="w-4 h-4" />
                                            </div>
                                            <h4 className={cn(
                                                "font-semibold text-xs mb-1",
                                                "text-[#0F172A] dark:text-[#E5E7EB]"
                                            )}>
                                                {benefit.title}
                                            </h4>
                                            <p className={cn(
                                                "text-xs",
                                                "text-[#475569] dark:text-[#94A3B8]"
                                            )}>
                                                {benefit.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Registration Form */}
                        <div className="flex items-center justify-center">
                            <Card className={cn(
                                "w-full max-w-sm sm:max-w-md md:max-w-lg border-2 shadow-lg sm:shadow-xl lg:shadow-2xl",
                                "bg-white border-[#E5E7EB]",
                                "dark:bg-[#0F172A] dark:border-[#1E293B]"
                            )}>
                                <CardHeader className="space-y-1 sm:space-y-2 text-center pb-3 sm:pb-4">
                                    {/* Desktop Logo */}
                                    <div className="hidden sm:flex justify-center mb-2">
                                        <div className={cn(
                                            "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg",
                                            "bg-linear-to-br from-[#2563EB] to-[#38BDF8]"
                                        )}>
                                            <UserPlus className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                                        </div>
                                    </div>

                                    <CardTitle className={cn(
                                        "text-base sm:text-lg md:text-xl lg:text-2xl font-bold",
                                        "text-[#0F172A] dark:text-[#E5E7EB]"
                                    )}>
                                        Member Registration
                                    </CardTitle>
                                    <CardDescription className={cn(
                                        "text-xs sm:text-sm md:text-base",
                                        "text-[#475569] dark:text-[#94A3B8]"
                                    )}>
                                        Complete all steps to register as a BCA Association member
                                    </CardDescription>
                                </CardHeader>

                                {/* Progress Steps - Responsive */}
                                <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4">
                                    <div className="flex justify-between items-center mb-1 sm:mb-2">
                                        {steps.map((step, index) => (
                                            <React.Fragment key={step.id}>
                                                <div className="flex flex-col items-center">
                                                    <div className={cn(
                                                        "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium",
                                                        step.id <= currentStep
                                                            ? "bg-[#2563EB] text-white"
                                                            : "bg-[#F8FAFC] text-[#94A3B8] border border-[#E5E7EB] dark:bg-[#1E293B] dark:border-[#334155]"
                                                    )}>
                                                        {step.id < currentStep ? (
                                                            <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                                                        ) : (
                                                            step.id
                                                        )}
                                                    </div>
                                                    <span className={cn(
                                                        "text-[10px] sm:text-xs md:text-sm mt-1",
                                                        step.id <= currentStep
                                                            ? "text-[#0F172A] dark:text-[#E5E7EB]"
                                                            : "text-[#94A3B8]"
                                                    )}>
                                                        {step.title}
                                                    </span>
                                                </div>
                                                {index < steps.length - 1 && (
                                                    <div className={cn(
                                                        "flex-1 h-0.5 sm:h-1 mx-1 sm:mx-2",
                                                        step.id < currentStep ? "bg-[#2563EB]" : "bg-[#E5E7EB] dark:bg-[#334155]"
                                                    )} />
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    <Progress value={(currentStep / steps.length) * 100} className="h-1 sm:h-1.5 md:h-2" />
                                    <p className="text-[10px] sm:text-xs md:text-sm text-center mt-1 sm:mt-2 text-[#475569] dark:text-[#94A3B8]">
                                        Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.description}
                                    </p>
                                </div>

                                {/* Single Multi-step Form using React Hook Form */}
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4 md:space-y-6">
                                        <CardContent className="space-y-2 sm:space-y-3 md:space-y-4 px-3 sm:px-4 md:px-6">
                                            {/* Error Alert */}
                                            {submitError && (
                                                <Alert variant="destructive" className="bg-[#EF4444]/10 border-[#EF4444] p-2 sm:p-3">
                                                    <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                                                    <AlertDescription className="text-xs sm:text-sm md:text-base">
                                                        {submitError}
                                                    </AlertDescription>
                                                </Alert>
                                            )}

                                            {/* Step 1: Personal Information */}
                                            {currentStep === 1 && (
                                                <div className="space-y-2 sm:space-y-3 md:space-y-4 animate-in fade-in duration-300">
                                                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
                                                        Personal Information
                                                    </h3>

                                                    <FormField
                                                        control={form.control}
                                                        name="fullName"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-xs sm:text-sm md:text-base font-medium">
                                                                    Full Name
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <div className="relative">
                                                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-[#475569] dark:text-[#94A3B8]" />
                                                                        <Input
                                                                            placeholder="John Doe"
                                                                            className="pl-9 sm:pl-10 text-sm h-9 sm:h-10 md:h-11"
                                                                            disabled={isLoading}
                                                                            {...field}
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage className="text-xs" />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="email"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-xs sm:text-sm md:text-base font-medium">
                                                                    College Email
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <div className="relative">
                                                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-[#475569] dark:text-[#94A3B8]" />
                                                                        <Input
                                                                            placeholder="student@mmmc.edu"
                                                                            className="pl-9 sm:pl-10 text-sm h-9 sm:h-10 md:h-11"
                                                                            disabled={isLoading}
                                                                            {...field}
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                                <FormDescription className="text-xs sm:text-sm">
                                                                    Please use your college email address
                                                                </FormDescription>
                                                                <FormMessage className="text-xs" />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name="phone"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="text-xs sm:text-sm md:text-base font-medium">
                                                                        Phone
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <div className="relative">
                                                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-[#475569] dark:text-[#94A3B8]" />
                                                                            <Input
                                                                                placeholder="9876543210"
                                                                                className="pl-9 sm:pl-10 text-sm h-9 sm:h-10 md:h-11"
                                                                                disabled={isLoading}
                                                                                {...field}
                                                                            />
                                                                        </div>
                                                                    </FormControl>
                                                                    <FormMessage className="text-xs" />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name="studentId"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="text-xs sm:text-sm md:text-base font-medium">
                                                                        Student ID
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <div className="relative">
                                                                            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-[#475569] dark:text-[#94A3B8]" />
                                                                            <Input
                                                                                placeholder="S12345"
                                                                                className="pl-9 sm:pl-10 text-sm h-9 sm:h-10 md:h-11"
                                                                                disabled={isLoading}
                                                                                {...field}
                                                                            />
                                                                        </div>
                                                                    </FormControl>
                                                                    <FormMessage className="text-xs" />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Step 2: Academic Details */}
                                            {currentStep === 2 && (
                                                <div className="space-y-2 sm:space-y-3 md:space-y-4 animate-in fade-in duration-300">
                                                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
                                                        Academic Details
                                                    </h3>

                                                    <FormField
                                                        control={form.control}
                                                        name="batch"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-xs sm:text-sm md:text-base font-medium">
                                                                    Batch
                                                                </FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger className="h-9 sm:h-10 md:h-11 text-sm">
                                                                            <SelectValue placeholder="Select your batch" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        {batchOptions.map((option) => (
                                                                            <SelectItem key={option.value} value={option.value} className="text-sm">
                                                                                {option.label}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage className="text-xs" />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="semester"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-xs sm:text-sm md:text-base font-medium">
                                                                    Current Semester
                                                                </FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger className="h-9 sm:h-10 md:h-11 text-sm">
                                                                            <SelectValue placeholder="Select current semester" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        {semesterOptions.map((option) => (
                                                                            <SelectItem key={option.value} value={option.value} className="text-sm">
                                                                                {option.label}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage className="text-xs" />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <Alert className="bg-[#2563EB]/5 border-[#2563EB] p-2 sm:p-3">
                                                        <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#2563EB]" />
                                                        <AlertDescription className="text-xs sm:text-sm md:text-base">
                                                            This information helps us provide you with relevant resources and events.
                                                        </AlertDescription>
                                                    </Alert>
                                                </div>
                                            )}

                                            {/* Step 3: Account Security */}
                                            {currentStep === 3 && (
                                                <div className="space-y-2 sm:space-y-3 md:space-y-4 animate-in fade-in duration-300">
                                                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
                                                        Account Security
                                                    </h3>

                                                    <FormField
                                                        control={form.control}
                                                        name="password"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-xs sm:text-sm md:text-base font-medium">
                                                                    Password
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <div className="relative">
                                                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-[#475569] dark:text-[#94A3B8]" />
                                                                        <Input
                                                                            type={showPassword ? "text" : "password"}
                                                                            placeholder="Create a strong password"
                                                                            className="pl-9 sm:pl-10 pr-10 text-sm h-9 sm:h-10 md:h-11"
                                                                            disabled={isLoading}
                                                                            {...field}
                                                                        />
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                                                            onClick={() => setShowPassword(!showPassword)}
                                                                            disabled={isLoading}
                                                                        >
                                                                            {showPassword ? (
                                                                                <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" />
                                                                            ) : (
                                                                                <Eye className="h-3 w-3 sm:w-4 sm:h-4" />
                                                                            )}
                                                                        </Button>
                                                                    </div>
                                                                </FormControl>
                                                                <div className="space-y-1 sm:space-y-2">
                                                                    <Progress value={passwordStrength} className="h-1 sm:h-1.5" />
                                                                    <div className="grid grid-cols-4 gap-1 sm:gap-2 text-[10px] sm:text-xs">
                                                                        <div className={cn(
                                                                            "text-center p-1 rounded",
                                                                            passwordStrength >= 25 ? "bg-[#22C55E]/20 text-[#22C55E]" : "bg-[#E5E7EB] text-[#94A3B8]"
                                                                        )}>
                                                                            Length
                                                                        </div>
                                                                        <div className={cn(
                                                                            "text-center p-1 rounded",
                                                                            passwordStrength >= 50 ? "bg-[#22C55E]/20 text-[#22C55E]" : "bg-[#E5E7EB] text-[#94A3B8]"
                                                                        )}>
                                                                            Uppercase
                                                                        </div>
                                                                        <div className={cn(
                                                                            "text-center p-1 rounded",
                                                                            passwordStrength >= 75 ? "bg-[#22C55E]/20 text-[#22C55E]" : "bg-[#E5E7EB] text-[#94A3B8]"
                                                                        )}>
                                                                            Number
                                                                        </div>
                                                                        <div className={cn(
                                                                            "text-center p-1 rounded",
                                                                            passwordStrength >= 100 ? "bg-[#22C55E]/20 text-[#22C55E]" : "bg-[#E5E7EB] text-[#94A3B8]"
                                                                        )}>
                                                                            Special
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <FormMessage className="text-xs" />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="confirmPassword"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-xs sm:text-sm md:text-base font-medium">
                                                                    Confirm Password
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <div className="relative">
                                                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-[#475569] dark:text-[#94A3B8]" />
                                                                        <Input
                                                                            type={showConfirmPassword ? "text" : "password"}
                                                                            placeholder="Confirm your password"
                                                                            className="pl-9 sm:pl-10 pr-10 text-sm h-9 sm:h-10 md:h-11"
                                                                            disabled={isLoading}
                                                                            {...field}
                                                                        />
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                                            disabled={isLoading}
                                                                        >
                                                                            {showConfirmPassword ? (
                                                                                <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" />
                                                                            ) : (
                                                                                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                                                                            )}
                                                                        </Button>
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage className="text-xs" />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="termsAccepted"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-start space-x-2 sm:space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange}
                                                                        disabled={isLoading}
                                                                        className="mt-0.5 sm:mt-1"
                                                                    />
                                                                </FormControl>
                                                                <div className="space-y-1 leading-none">
                                                                    <FormLabel className="text-xs sm:text-sm md:text-base">
                                                                        I agree to the{' '}
                                                                        <Link href="/terms" className="text-[#2563EB] hover:underline">
                                                                            Terms
                                                                        </Link>{' '}
                                                                        and{' '}
                                                                        <Link href="/privacy" className="text-[#2563EB] hover:underline">
                                                                            Privacy Policy
                                                                        </Link>
                                                                    </FormLabel>
                                                                    <FormMessage className="text-xs" />
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            )}

                                            {/* Step 4: Verification */}
                                            {currentStep === 4 && (
                                                <div className="space-y-2 sm:space-y-3 md:space-y-4 animate-in fade-in duration-300">
                                                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
                                                        Final Verification
                                                    </h3>

                                                    <Alert className="bg-[#F59E0B]/5 border-[#F59E0B] p-2 sm:p-3">
                                                        <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#F59E0B]" />
                                                        <AlertDescription className="text-xs sm:text-sm md:text-base">
                                                            <span className="font-semibold">Important:</span> Registration is restricted to
                                                            physically verified BCA Association members only.
                                                        </AlertDescription>
                                                    </Alert>

                                                    <FormField
                                                        control={form.control}
                                                        name="physicallyVerified"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-start space-x-2 sm:space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange}
                                                                        disabled={isLoading}
                                                                        className="mt-0.5 sm:mt-1"
                                                                    />
                                                                </FormControl>
                                                                <div className="space-y-1 leading-none">
                                                                    <FormLabel className="text-xs sm:text-sm md:text-base font-medium">
                                                                        I confirm that I am a physically verified member of BCA Association
                                                                    </FormLabel>
                                                                    <FormDescription className="text-xs sm:text-sm">
                                                                        Your registration will be verified by association admin
                                                                    </FormDescription>
                                                                    <FormMessage className="text-xs" />
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="associationRules"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-start space-x-2 sm:space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange}
                                                                        disabled={isLoading}
                                                                        className="mt-0.5 sm:mt-1"
                                                                    />
                                                                </FormControl>
                                                                <div className="space-y-1 leading-none">
                                                                    <FormLabel className="text-xs sm:text-sm md:text-base font-medium">
                                                                        I agree to follow all BCA Association rules and regulations
                                                                    </FormLabel>
                                                                    <FormDescription className="text-xs sm:text-sm">
                                                                        This includes code of conduct and participation requirements
                                                                    </FormDescription>
                                                                    <FormMessage className="text-xs" />
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <div className={cn(
                                                        "p-2 sm:p-3 md:p-4 rounded-lg",
                                                        "bg-[#F8FAFC] border border-[#E5E7EB]",
                                                        "dark:bg-[#1E293B] dark:border-[#334155]"
                                                    )}>
                                                        <p className="text-xs sm:text-sm md:text-base text-[#475569] dark:text-[#94A3B8]">
                                                            <span className="font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
                                                                After submission:
                                                            </span>{' '}
                                                            Your account will be in &quot;Pending Verification&quot; status until admin approval.
                                                            You will receive an email notification once verified.
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>

                                        <CardFooter className="flex flex-col space-y-2 sm:space-y-3 md:space-y-4 px-3 sm:px-4 md:px-6 pb-4 sm:pb-6">
                                            {/* Navigation Buttons */}
                                            <div className="flex justify-between w-full">
                                                {currentStep > 1 ? (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={prevStep}
                                                        className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base h-8 sm:h-9 md:h-10"
                                                        disabled={isLoading}
                                                    >
                                                        <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                                                        Previous
                                                    </Button>
                                                ) : (
                                                    <div />
                                                )}

                                                {currentStep < 4 ? (
                                                    <Button
                                                        type="button"
                                                        onClick={nextStep}
                                                        className="bg-linear-to-r from-[#2563EB] to-[#38BDF8] hover:from-[#1D4ED8] hover:to-[#0EA5E9] text-xs sm:text-sm md:text-base h-8 sm:h-9 md:h-10"
                                                        disabled={isLoading}
                                                    >
                                                        Next Step
                                                        <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        type="submit"
                                                        className="bg-linear-to-r from-[#2563EB] to-[#38BDF8] hover:from-[#1D4ED8] hover:to-[#0EA5E9] text-xs sm:text-sm md:text-base h-8 sm:h-9 md:h-10"
                                                        disabled={isLoading}
                                                    >
                                                        {isLoading ? (
                                                            <>
                                                                <Loader2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                                                                Submitting...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <UserPlus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                                                Complete Registration
                                                            </>
                                                        )}
                                                    </Button>
                                                )}
                                            </div>

                                            {/* Separator */}
                                            <div className="relative w-full">
                                                <div className="absolute inset-0 flex items-center">
                                                    <Separator className="w-full" />
                                                </div>
                                                <div className="relative flex justify-center text-[10px] sm:text-xs md:text-sm uppercase">
                                                    <span className={cn(
                                                        "px-2",
                                                        "bg-white dark:bg-[#0F172A]",
                                                        "text-[#475569] dark:text-[#94A3B8]"
                                                    )}>
                                                        Already have an account?
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Login Button */}
                                            <Link href="/login" className="w-full">
                                                <Button
                                                    variant="outline"
                                                    type="button"
                                                    className="w-full text-xs sm:text-sm md:text-base h-8 sm:h-9 md:h-10"
                                                    disabled={isLoading}
                                                >
                                                    <LogIn className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                                    Login to Existing Account
                                                </Button>
                                            </Link>
                                        </CardFooter>
                                    </form>
                                </Form>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}