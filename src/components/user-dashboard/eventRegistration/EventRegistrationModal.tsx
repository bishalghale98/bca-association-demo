'use client'

import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, CalendarDays, User, Phone, MessageSquare, X } from "lucide-react"
import { toast } from "sonner"
import { IEvent } from '@/store/event/eventSlice'
import { useSession } from 'next-auth/react'

// Form validation schema
const formSchema = z.object({
    fullName: z.string()
        .min(2, "Full name must be at least 2 characters")
        .max(100, "Full name must be less than 100 characters"),
    phoneNo: z.string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number must be less than 15 digits")
        .regex(/^[0-9+\-\s()]*$/, "Please enter a valid phone number"),
    message: z.string()
        .max(500, "Message must be less than 500 characters")
        .optional()
        .or(z.literal('')),
})

type FormValues = z.infer<typeof formSchema>

interface EventRegistrationModalProps {
    event: IEvent | null;
    onClose: () => void;
    open: boolean; // Add this prop to control modal visibility
}

const EventRegistrationModal = ({
    event,
    onClose,
    open
}: EventRegistrationModalProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const { data: session } = useSession()



    // Initialize form
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            phoneNo: "",
            message: "",
        },
        mode: "onChange",
    })

    // Reset form when modal opens/closes
    useEffect(() => {
        if (open) {
            form.reset()
            setIsSuccess(false)
        }
    }, [open, form])

    // Handle form submission
    const onSubmit = async (data: FormValues) => {
        if (!event) return

        setIsSubmitting(true)

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))

            console.log('Registration data:', {
                ...data,
                eventId: event.id,
                userId: session?.user?.id,
                timestamp: new Date().toISOString(),
            })

            // Show success
            setIsSuccess(true)
            toast.success("Registration Successful!", {
                description: `You have successfully registered for "${event.title}"`,
            })

            // Reset form after delay
            setTimeout(() => {
                form.reset()
                setIsSuccess(false)
                onClose() // Close modal after success
            }, 2000)

        } catch (error) {
            toast.error("Registration Failed", {
                description: "Please try again later.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    // Handle cancel/close
    const handleCancel = () => {
        if (!isSubmitting) {
            form.reset()
            onClose()
        }
    }

    // If no event, don't render anything
    if (!event) return null

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleCancel()}>
            <DialogContent className="sm:max-w-md">
                {!isSuccess ? (
                    <>
                        <DialogHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                        <CalendarDays className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <DialogTitle className="text-xl">Register for Event</DialogTitle>
                                        <DialogDescription>
                                            {event.title}
                                        </DialogDescription>
                                    </div>
                                </div>
                            </div>
                        </DialogHeader>



                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                {/* Full Name Field */}
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <User className="w-4 h-4" />
                                                Full Name
                                                <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your full name"
                                                    className="h-11"
                                                    {...field}
                                                    disabled={isSubmitting}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Your name as it should appear on the registration
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Phone Number Field */}
                                <FormField
                                    control={form.control}
                                    name="phoneNo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Phone className="w-4 h-4" />
                                                Phone Number
                                                <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your phone number"
                                                    className="h-11"
                                                    {...field}
                                                    disabled={isSubmitting}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                We'll contact you for event updates
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Message Field */}
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <MessageSquare className="w-4 h-4" />
                                                Additional Message (Optional)
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Any special requirements or questions?"
                                                    className="min-h-[100px] resize-none"
                                                    {...field}
                                                    disabled={isSubmitting}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Let us know if you have any specific needs
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Terms and Conditions */}
                                <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                                    <p>
                                        By registering, you agree to our{" "}
                                        <button
                                            type="button"
                                            className="text-blue-600 dark:text-blue-400 hover:underline"
                                            onClick={() => {
                                                // Handle terms modal
                                            }}
                                        >
                                            Terms of Service
                                        </button>{" "}
                                        and{" "}
                                        <button
                                            type="button"
                                            className="text-blue-600 dark:text-blue-400 hover:underline"
                                            onClick={() => {
                                                // Handle privacy modal
                                            }}
                                        >
                                            Privacy Policy
                                        </button>
                                    </p>
                                    <p>
                                        You'll receive a confirmation email with event details.
                                    </p>
                                </div>

                                <DialogFooter className="gap-2 sm:gap-0 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleCancel}
                                        disabled={isSubmitting}
                                        className="flex-1"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Registering...
                                            </>
                                        ) : (
                                            <>
                                                Confirm Registration
                                            </>
                                        )}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </>
                ) : (
                    // Success State
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-8 h-8 text-green-600 dark:text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <DialogTitle className="text-xl mb-2">Registration Confirmed!</DialogTitle>
                        <DialogDescription className="text-base">
                            You're all set for <span className="font-semibold text-blue-600 dark:text-blue-400">{event.title}</span>
                        </DialogDescription>
                        <div className="mt-6 space-y-3">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                We've sent a confirmation to your registered phone number.
                            </p>
                            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4">
                                <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                                    Next Steps:
                                </p>
                                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                                    <li>• Check your SMS for event details</li>
                                    <li>• Arrive 15 minutes before the event</li>
                                    <li>• Bring your ID for verification</li>
                                </ul>
                            </div>
                        </div>
                        <Button
                            onClick={handleCancel}
                            className="mt-6 w-full"
                        >
                            Close
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default EventRegistrationModal