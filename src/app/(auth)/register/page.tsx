"use client";

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
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
    Calendar,
    Phone,
    User,
    Hash,
    ChevronLeft,
    Loader2,
    LogIn,
    BookOpen,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Gender } from '@/types/user/enums';
import { RegisterFormSchema, RegisterFormValues } from '@/schema/auth.schema';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { registerUser, resetState, Status } from '@/store/auth/authSlice';
import { toast } from 'sonner';

export default function RegisterPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    // Initialize form
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            studentId: "",
            semester: "1",
            phone: "",
            course: "",
            specialization: "",
            year: "",
            dateOfBirth: "",
            gender: undefined,
            address: "",
            bio: "",
            bloodGroup: "",
            emergencyContact: "",
            termsAccepted: false,
            physicallyVerified: false,
            associationRules: false,
        },
        mode: "onChange",
    });

    const genderOptions = [
        { value: Gender.MALE, label: "Male" },
        { value: Gender.FEMALE, label: "Female" },
        { value: Gender.OTHER, label: "Other" },
    ];

    const semesterOptions = [
        { value: "1", label: "Semester 1" },
        { value: "2", label: "Semester 2" },
        { value: "3", label: "Semester 3" },
        { value: "4", label: "Semester 4" },
        { value: "5", label: "Semester 5" },
        { value: "6", label: "Semester 6" },
    ];

    const courseOptions = [
        { value: "BCA", label: "BCA" },
        { value: "BSC_CS", label: "B.Sc Computer Science" },
        { value: "BSC_IT", label: "B.Sc Information Technology" },
    ];

    const steps = [
        { id: 1, title: "Basic Info", description: "Personal details" },
        { id: 2, title: "Academic", description: "Education info" },
        { id: 3, title: "Account", description: "Security setup" },
        { id: 4, title: "Agreement", description: "Terms & verification" },
    ];

    const dispatch = useAppDispatch()

    const { status, error } = useAppSelector((store) => store.auth)

    const onSubmit = async (data: RegisterFormValues) => {

        await dispatch(registerUser(data))

        if (status === Status.AUTHENTICATED) {
            toast.success("User register Successfully")
            dispatch(resetState())
        }

        if (status === Status.ERROR) {
            toast.error(error)
            dispatch(resetState())

        }
    };

    const nextStep = async () => {
        let isValid = false;

        switch (currentStep) {
            case 1:
                isValid = await form.trigger(["name", "email", "studentId"]);
                break;
            case 2:
                isValid = await form.trigger(["course", "semester"]);
                break;
            case 3:
                isValid = await form.trigger(["password", "confirmPassword"]);
                break;
            case 4:
                isValid = await form.trigger(["termsAccepted", "physicallyVerified", "associationRules"]);
                break;
        }

        if (isValid && currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const benefits = [
        { icon: Shield, title: "Verified Membership", description: "Official BCA Association recognition" },
        { icon: BookOpen, title: "Study Resources", description: "Exclusive materials and recordings" },
        { icon: Users, title: "Networking", description: "Connect with peers and professionals" },
        { icon: Calendar, title: "Events", description: "Workshops, seminars, and hackathons" },
    ];

    const passwordStrength = (password: string) => {
        if (!password) return 0;
        let strength = 0;
        if (password.length >= 6) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;
        return strength;
    };

    if (status === Status.AUTHENTICATED) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <Card className="w-full max-w-md border shadow-lg">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4">
                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold">Registration Submitted!</CardTitle>
                        <CardDescription>
                            Your application has been received successfully
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                <span className="font-semibold">Important:</span> Your account is pending verification.
                                You&apos;ll receive an email once approved.
                            </AlertDescription>
                        </Alert>
                        <div className="p-4 rounded-lg bg-gray-50">
                            <h4 className="font-semibold mb-2">What happens next?</h4>
                            <ol className="space-y-2 text-sm text-gray-600 list-decimal pl-4">
                                <li>Admin will verify your membership</li>
                                <li>You&apos;ll receive a verification email</li>
                                <li>Login to access your dashboard</li>
                                <li>Complete your profile</li>
                            </ol>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-3">
                        <Link href="/login" className="w-full">
                            <Button className="w-full">Go to Login</Button>
                        </Link>
                        <Link href="/" className="w-full">
                            <Button variant="outline" className="w-full">Return Home</Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left Side - Benefits */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
                                        <GraduationCap className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold">BCA Association</h1>
                                        <p className="text-gray-600">MMMC College Registration</p>
                                    </div>
                                </div>
                                <h2 className="text-3xl font-bold">
                                    Join the <span className="text-blue-600">BCA Community</span>
                                </h2>
                                <p className="text-gray-600">
                                    Register as a verified member to access exclusive resources, events, and networking opportunities.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="p-4 rounded-lg bg-white border space-y-2">
                                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                            <benefit.icon className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <h3 className="font-semibold">{benefit.title}</h3>
                                        <p className="text-sm text-gray-600">{benefit.description}</p>
                                    </div>
                                ))}
                            </div>

                            <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    <span className="font-semibold">Note:</span> Registration requires physical verification by association admin.
                                </AlertDescription>
                            </Alert>
                        </div>

                        {/* Right Side - Form */}
                        <Card className="border shadow-lg">
                            <CardHeader className="text-center">
                                <div className="mx-auto mb-4">
                                    <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center">
                                        <UserPlus className="w-7 h-7 text-white" />
                                    </div>
                                </div>
                                <CardTitle className="text-xl font-bold">Member Registration</CardTitle>
                                <CardDescription>
                                    Complete {steps.length} steps to register
                                </CardDescription>
                            </CardHeader>

                            {/* Progress Bar */}
                            <div className="px-6 pb-4">
                                <div className="flex justify-between items-center mb-2">
                                    {steps.map((step) => (
                                        <div key={step.id} className="flex flex-col items-center">
                                            <div className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                                                step.id <= currentStep
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-gray-100 text-gray-400"
                                            )}>
                                                {step.id < currentStep ? <CheckCircle className="w-4 h-4" /> : step.id}
                                            </div>
                                            <span className="text-xs mt-1">{step.title}</span>
                                        </div>
                                    ))}
                                </div>
                                <Progress value={(currentStep / steps.length) * 100} />
                                <p className="text-xs text-center mt-2 text-gray-500">
                                    Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.description}
                                </p>
                            </div>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <CardContent className="space-y-6 max-h-125 overflow-y-auto px-6">


                                        {/* Step 1: Basic Information */}
                                        {currentStep === 1 && (
                                            <div className="space-y-4 animate-in fade-in">
                                                <h3 className="font-semibold">Basic Information</h3>

                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Full Name *</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                                                    <Input placeholder="John Doe" className="pl-10" {...field} disabled={status === Status.LOADING} />
                                                                </div>
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
                                                            <FormLabel>Email *</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                                                    <Input type="email" placeholder="student@college.edu" className="pl-10" {...field} disabled={status === Status.LOADING} />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="phone"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Phone (Optional)</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                                                    <Input placeholder="9876543210" className="pl-10" {...field} disabled={status === Status.LOADING} />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="studentId"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Student ID *</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Hash className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                                                    <Input placeholder="S12345" className="pl-10" {...field} disabled={status === Status.LOADING} />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        )}

                                        {/* Step 2: Academic Details */}
                                        {currentStep === 2 && (
                                            <div className="space-y-4 animate-in fade-in">
                                                <h3 className="font-semibold">Academic Details</h3>

                                                <FormField
                                                    control={form.control}
                                                    name="course"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Course (Optional)</FormLabel>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={status === Status.LOADING}>
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select course" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {courseOptions.map((option) => (
                                                                        <SelectItem key={option.value} value={option.value}>
                                                                            {option.label}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                {/* ✅ Fixed: semester as string */}
                                                <FormField
                                                    control={form.control}
                                                    name="semester"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Semester *</FormLabel>
                                                            <Select
                                                                value={field.value}
                                                                onValueChange={field.onChange}
                                                                disabled={status === Status.LOADING}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select semester" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {semesterOptions.map((option) => (
                                                                        <SelectItem key={option.value} value={option.value}>
                                                                            {option.label}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <div className="grid grid-cols-2 gap-4">
                                                    {/* ✅ Fixed: year as string */}
                                                    <FormField
                                                        control={form.control}
                                                        name="year"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Year (Optional)</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder="2024"
                                                                        {...field}
                                                                        disabled={status === Status.LOADING}
                                                                        value={field.value || ""}
                                                                        onChange={(e) => field.onChange(e.target.value)}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="gender"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Gender (Optional)</FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={status === Status.LOADING}>
                                                                    <FormControl>
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Select gender" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        {genderOptions.map((option) => (
                                                                            <SelectItem key={option.value} value={option.value}>
                                                                                {option.label}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <FormField
                                                    control={form.control}
                                                    name="specialization"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Specialization (Optional)</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="e.g., Web Development" {...field} disabled={status === Status.LOADING} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        )}

                                        {/* Step 3: Account Security */}
                                        {currentStep === 3 && (
                                            <div className="space-y-4 animate-in fade-in">
                                                <h3 className="font-semibold">Account Security</h3>

                                                <FormField
                                                    control={form.control}
                                                    name="password"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Password *</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                                                    <Input
                                                                        type={showPassword ? "text" : "password"}
                                                                        placeholder="Create password"
                                                                        className="pl-10 pr-10"
                                                                        {...field}
                                                                        disabled={status === Status.LOADING}
                                                                    />
                                                                    <Button
                                                                        type="button"
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="absolute right-0 top-0 h-full px-3"
                                                                        onClick={() => setShowPassword(!showPassword)}
                                                                        disabled={status === Status.LOADING}
                                                                    >
                                                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                                    </Button>
                                                                </div>
                                                            </FormControl>
                                                            <div className="space-y-2">
                                                                <Progress value={passwordStrength(field.value)} className="h-1" />
                                                                <p className="text-xs text-gray-500">
                                                                    Password strength: {passwordStrength(field.value)}%
                                                                </p>
                                                            </div>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="confirmPassword"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Confirm Password *</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                                                    <Input
                                                                        type={showConfirmPassword ? "text" : "password"}
                                                                        placeholder="Confirm password"
                                                                        className="pl-10 pr-10"
                                                                        {...field}
                                                                        disabled={status === Status.LOADING}
                                                                    />
                                                                    <Button
                                                                        type="button"
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="absolute right-0 top-0 h-full px-3"
                                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                                        disabled={status === Status.LOADING}
                                                                    >
                                                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                                    </Button>
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        )}

                                        {/* Step 4: Agreement */}
                                        {currentStep === 4 && (
                                            <div className="space-y-4 animate-in fade-in">
                                                <h3 className="font-semibold">Agreement & Verification</h3>

                                                <Alert>
                                                    <AlertCircle className="h-4 w-4" />
                                                    <AlertDescription>
                                                        Registration is restricted to physically verified BCA Association members only.
                                                    </AlertDescription>
                                                </Alert>

                                                <FormField
                                                    control={form.control}
                                                    name="termsAccepted"
                                                    render={({ field }) => (
                                                        <FormItem className="flex items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                    disabled={status === Status.LOADING}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1">
                                                                <FormLabel>
                                                                    I agree to the{' '}
                                                                    <Link href="/terms" className="text-blue-600 hover:underline">Terms</Link>
                                                                    {' '}and{' '}
                                                                    <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link> *
                                                                </FormLabel>
                                                                <FormMessage />
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="physicallyVerified"
                                                    render={({ field }) => (
                                                        <FormItem className="flex items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                    disabled={status === Status.LOADING}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1">
                                                                <FormLabel>
                                                                    I confirm that I am a physically verified member of BCA Association *
                                                                </FormLabel>
                                                                <FormMessage />
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="associationRules"
                                                    render={({ field }) => (
                                                        <FormItem className="flex items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                    disabled={status === Status.LOADING}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1">
                                                                <FormLabel>
                                                                    I agree to follow all BCA Association rules and regulations *
                                                                </FormLabel>
                                                                <FormMessage />
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />

                                                <div className="p-4 rounded-lg bg-gray-50">
                                                    <p className="text-sm text-gray-600">
                                                        <span className="font-semibold">After submission:</span> Your account will be in
                                                        &quot;Pending Verification&quot; status until admin approval. You will receive an
                                                        email notification once verified.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>

                                    <CardFooter className="flex flex-col space-y-4 px-6 pb-6">
                                        {/* Navigation Buttons */}
                                        <div className="flex justify-between w-full">
                                            {currentStep > 1 && (
                                                <Button type="button" variant="outline" onClick={prevStep} disabled={status === Status.LOADING}>
                                                    <ChevronLeft className="mr-2 h-4 w-4" />
                                                    Previous
                                                </Button>
                                            )}

                                            {currentStep < steps.length ? (
                                                <Button type="button" onClick={nextStep} disabled={status === Status.LOADING} className="ml-auto">
                                                    Next Step
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            ) : (
                                                <Button type="submit" disabled={status === Status.LOADING} className="ml-auto">
                                                    {status === Status.LOADING ? (
                                                        <>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            Submitting...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <UserPlus className="mr-2 h-4 w-4" />
                                                            Complete Registration
                                                        </>
                                                    )}
                                                </Button>
                                            )}
                                        </div>

                                        <Separator />

                                        {/* Login Link */}
                                        <div className="text-center">
                                            <Link href="/login">
                                                <Button variant="link" disabled={status === Status.LOADING}>
                                                    <LogIn className="mr-2 h-4 w-4" />
                                                    Already have an account? Login
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardFooter>
                                </form>
                            </Form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}