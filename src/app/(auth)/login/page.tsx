"use client";

import React, { useState, useTransition } from 'react';
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Eye,
  EyeOff,
  LogIn,
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
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


// Define form schema with Zod
const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email or Student ID is required" })
    .refine(
      (value) => {
        // Accept email or student ID format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const studentIdRegex = /^[Ss]\d{5}$/;
        return emailRegex.test(value) || studentIdRegex.test(value);
      },
      {
        message: "Please enter a valid email address or Student ID (e.g., S12345)",
      }
    ),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()

  const [loginTransition, startLoginTransition] = useTransition()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });


  const onSubmit = async (data: LoginFormValues) => {
    startLoginTransition(async () => {
      try {
        const res = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (!res) {
          toast.error("Something went wrong");
          return;
        }

        if (res.error) {
          toast.error(res.error);
          return;
        }

        if (res.ok) {
          toast.success("Login successful");
          router.push('/dashboard')
          router.refresh(); // ✅ refresh only on success
        }
      } catch (error) {
        toast.error("Failed to login");
      }
    });
  };


  const features = [
    {
      icon: Shield,
      title: "Verified Access",
      description: "Only physically verified BCA Association members can login",
    },
    {
      icon: BookOpen,
      title: "Exclusive Resources",
      description: "Access study materials, workshop recordings, and more",
    },
    {
      icon: Calendar,
      title: "Event Registration",
      description: "Register for upcoming workshops, seminars, and hackathons",
    },
    {
      icon: Users,
      title: "Member Network",
      description: "Connect with fellow BCA students and alumni",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#F8FAFC] to-[#E5E7EB] dark:from-[#020617] dark:to-[#0F172A]">
      <div className="max-w-6xl w-full">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Left Side - Information & Features (Desktop Only) */}
          <div className="hidden lg:flex flex-col justify-center space-y-8">
            {/* Logo and Welcome */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center shadow-lg",
                  "bg-gradient-to-br from-[#2563EB] to-[#38BDF8]"
                )}>
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className={cn(
                    "text-3xl font-bold",
                    "text-[#0F172A] dark:text-[#E5E7EB]"
                  )}>
                    BCA Association
                  </h1>
                  <p className={cn(
                    "text-lg",
                    "text-[#475569] dark:text-[#94A3B8]"
                  )}>
                    MMMC College Portal
                  </p>
                </div>
              </div>
              <h2 className={cn(
                "text-4xl lg:text-5xl font-bold leading-tight",
                "text-[#0F172A] dark:text-[#E5E7EB]"
              )}>
                Welcome Back to Your
                <span className="text-[#2563EB] dark:text-[#3B82F6]"> Digital Campus</span>
              </h2>
              <p className={cn(
                "text-lg leading-relaxed",
                "text-[#475569] dark:text-[#94A3B8]"
              )}>
                Login to access exclusive member-only features, events, and resources.
                Your gateway to the BCA community awaits.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-4 rounded-xl space-y-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
                    "bg-white border border-[#E5E7EB]",
                    "dark:bg-[#0F172A] dark:border-[#1E293B]"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    "bg-[#2563EB]/10 dark:bg-[#2563EB]/20"
                  )}>
                    <feature.icon className="w-5 h-5 text-[#2563EB] dark:text-[#38BDF8]" />
                  </div>
                  <div>
                    <h3 className={cn(
                      "font-semibold mb-1",
                      "text-[#0F172A] dark:text-[#E5E7EB]"
                    )}>
                      {feature.title}
                    </h3>
                    <p className={cn(
                      "text-sm leading-relaxed",
                      "text-[#475569] dark:text-[#94A3B8]"
                    )}>
                      {feature.description}
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
              <AlertCircle className="h-4 w-4 text-[#F59E0B]" />
              <AlertDescription className={cn(
                "text-sm",
                "text-[#0F172A] dark:text-[#E5E7EB]"
              )}>
                <span className="font-semibold">Note:</span> If you haven&apos;t been physically verified
                as a BCA Association member, your account access will be limited until verification.
              </AlertDescription>
            </Alert>

            {/* Verification Status Info */}
            <div className={cn(
              "p-4 rounded-xl",
              "bg-white border border-[#E5E7EB]",
              "dark:bg-[#0F172A] dark:border-[#1E293B]"
            )}>
              <h4 className={cn(
                "font-bold mb-3 flex items-center gap-2",
                "text-[#0F172A] dark:text-[#E5E7EB]"
              )}>
                <Fingerprint className="w-4 h-4 text-[#2563EB] dark:text-[#38BDF8]" />
                Verification Status Guide
              </h4>
              <div className="space-y-2.5">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#22C55E] mt-0.5 flex-shrink-0" />
                  <span className={cn(
                    "text-sm",
                    "text-[#475569] dark:text-[#94A3B8]"
                  )}>
                    <span className="font-semibold text-[#0F172A] dark:text-[#E5E7EB]">Verified:</span> Full access to all features
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                  <span className={cn(
                    "text-sm",
                    "text-[#475569] dark:text-[#94A3B8]"
                  )}>
                    <span className="font-semibold text-[#0F172A] dark:text-[#E5E7EB]">Pending:</span> Limited access until admin approval
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-[#EF4444] mt-0.5 flex-shrink-0" />
                  <span className={cn(
                    "text-sm",
                    "text-[#475569] dark:text-[#94A3B8]"
                  )}>
                    <span className="font-semibold text-[#0F172A] dark:text-[#E5E7EB]">Rejected:</span> Contact association for clarification
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form (Mobile & Desktop) - SINGLE FORM */}
          <div className="flex items-center justify-center">
            <Card className={cn(
              "w-full max-w-md border-2 shadow-2xl",
              "bg-white border-[#E5E7EB]",
              "dark:bg-[#0F172A] dark:border-[#1E293B]"
            )}>
              <CardHeader className="space-y-2 text-center pb-6">
                {/* Mobile Logo (shown only on mobile) */}
                <div className="lg:hidden flex justify-center mb-2">
                  <div className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center shadow-lg",
                    "bg-gradient-to-br from-[#2563EB] to-[#38BDF8]"
                  )}>
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Desktop Logo (shown only on desktop) */}
                <div className="hidden lg:flex justify-center mb-2">
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center shadow-lg",
                    "bg-gradient-to-br from-[#2563EB] to-[#38BDF8]"
                  )}>
                    <LogIn className="w-8 h-8 text-white" />
                  </div>
                </div>

                <CardTitle className={cn(
                  "text-xl font-bold sm:text-2xl",
                  "text-[#0F172A] dark:text-[#E5E7EB]"
                )}>
                  Member Login
                </CardTitle>
                <CardDescription className={cn(
                  "text-sm sm:text-base",
                  "text-[#475569] dark:text-[#94A3B8]"
                )}>
                  Enter your credentials to access the member portal
                </CardDescription>
              </CardHeader>

              {/* Single Form using React Hook Form */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <CardContent className="space-y-4 px-4 sm:px-6">


                    {/* Email/Student ID Field */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={cn(
                            "text-sm font-medium",
                            "text-[#0F172A] dark:text-[#E5E7EB]"
                          )}>
                            Email Address or Student ID
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#475569] dark:text-[#94A3B8]" />
                              <Input
                                placeholder="student@mmmc.edu or S12345"
                                className={cn(
                                  "pl-10 h-11 text-sm sm:text-base",
                                  "border-[#E5E7EB] dark:border-[#1E293B]",
                                  "focus:border-[#2563EB] dark:focus:border-[#38BDF8]",
                                  form.formState.errors.email && "border-[#EF4444] focus:border-[#EF4444]"
                                )}
                                disabled={loginTransition}
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-[#EF4444]" />
                        </FormItem>
                      )}
                    />

                    {/* Password Field */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel className={cn(
                              "text-sm font-medium",
                              "text-[#0F172A] dark:text-[#E5E7EB]"
                            )}>
                              Password
                            </FormLabel>
                            <Link
                              href="/forgot-password"
                              className="text-xs sm:text-sm font-medium text-[#2563EB] dark:text-[#38BDF8] hover:underline"
                            >
                              Forgot password?
                            </Link>
                          </div>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#475569] dark:text-[#94A3B8]" />
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className={cn(
                                  "pl-10 pr-10 h-11 text-sm sm:text-base",
                                  "border-[#E5E7EB] dark:border-[#1E293B]",
                                  "focus:border-[#2563EB] dark:focus:border-[#38BDF8]",
                                  form.formState.errors.password && "border-[#EF4444] focus:border-[#EF4444]"
                                )}
                                disabled={loginTransition}
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={loginTransition}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4 text-[#475569] dark:text-[#94A3B8]" />
                                ) : (
                                  <Eye className="h-4 w-4 text-[#475569] dark:text-[#94A3B8]" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage className="text-[#EF4444]" />
                        </FormItem>
                      )}
                    />

                    {/* Remember Me & Security */}
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className={cn(
                                    "border-[#E5E7EB] dark:border-[#1E293B]",
                                    "data-[state=checked]:bg-[#2563EB] data-[state=checked]:border-[#2563EB]",
                                    "dark:data-[state=checked]:bg-[#3B82F6] dark:data-[state=checked]:border-[#3B82F6]"
                                  )}
                                  disabled={loginTransition}
                                />
                              </FormControl>
                              <FormLabel className={cn(
                                "text-sm font-medium cursor-pointer",
                                "text-[#475569] dark:text-[#94A3B8]"
                              )}>
                                Remember me
                              </FormLabel>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#22C55E]" />
                              <span className="text-xs text-[#475569] dark:text-[#94A3B8]">
                                Secure Login
                              </span>
                            </div>
                          </div>
                        </FormItem>
                      )}
                    />
                  </CardContent>

                  <CardFooter className="flex flex-col space-y-4 px-4 sm:px-6 pb-6">
                    {/* Login Button */}
                    <Button
                      type="submit"
                      className={cn(
                        "w-full h-12 text-base font-semibold",
                        "sm:h-14 sm:text-lg",
                        "bg-gradient-to-r from-[#2563EB] to-[#38BDF8]",
                        "hover:from-[#1D4ED8] hover:to-[#0EA5E9]",
                        "dark:from-[#2563EB] dark:to-[#3B82F6]",
                        "shadow-lg hover:shadow-xl",
                        "transition-all duration-300 transform hover:-translate-y-0.5",
                        loginTransition && "opacity-80 cursor-not-allowed"
                      )}
                      disabled={loginTransition}
                    >
                      {loginTransition ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Authenticating...
                        </>
                      ) : (
                        <>
                          <LogIn className="mr-2 h-5 w-5" />
                          Login to Portal
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    {/* Separator */}
                    <div className="relative w-full">
                      <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className={cn(
                          "px-2",
                          "bg-white dark:bg-[#0F172A]",
                          "text-[#475569] dark:text-[#94A3B8]"
                        )}>
                          Not a member yet?
                        </span>
                      </div>
                    </div>

                    {/* Register Button */}
                    <Link href="/register" className="w-full">
                      <Button
                        variant="outline"
                        type="button"
                        className={cn(
                          "w-full h-12 sm:h-14",
                          "border-2 border-[#E5E7EB] dark:border-[#1E293B]",
                          "hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]",
                          "hover:border-[#2563EB] dark:hover:border-[#38BDF8]",
                          "text-[#0F172A] dark:text-[#E5E7EB]",
                          "transition-all duration-300"
                        )}
                        disabled={loginTransition}
                      >
                        <UserPlus className="mr-2 h-5 w-5" />
                        Register as Association Member
                      </Button>
                    </Link>

                    {/* Guest Access Notice */}
                    <div className="text-center pt-2">
                      <p className={cn(
                        "text-xs sm:text-sm",
                        "text-[#475569] dark:text-[#94A3B8]"
                      )}>
                        Looking for public information?{' '}
                        <Link
                          href="/"
                          className="font-medium text-[#2563EB] dark:text-[#38BDF8] hover:underline"
                        >
                          Visit public site →
                        </Link>
                      </p>
                    </div>
                  </CardFooter>
                </form>
              </Form>

              {/* Verification Message */}
              <div className="px-4 sm:px-6 pb-6">
                <div className={cn(
                  "p-3 rounded-lg text-center",
                  "bg-[#F8FAFC] border border-[#E5E7EB]",
                  "dark:bg-[#1E293B] dark:border-[#334155]"
                )}>
                  <p className={cn(
                    "text-xs sm:text-sm font-medium",
                    "text-[#475569] dark:text-[#94A3B8]"
                  )}>
                    <span className="font-semibold text-[#0F172A] dark:text-[#E5E7EB]">
                      Pending Verification?
                    </span>{' '}
                    You can still login to check your status
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}