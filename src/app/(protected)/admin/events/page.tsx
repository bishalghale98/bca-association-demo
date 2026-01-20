'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { Info } from 'lucide-react'

// ShadCN Components (you'll need to install these)
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { eventFormSchema, EventFormValues } from '@/schema/event/createEvent'
import { useAppDispatch } from '@/store/hooks'
import { createEvent } from '@/store/event/eventSlice'

const AdminEventPage = () => {
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const dispatch = useAppDispatch()

    // Default form values
    const defaultValues: Partial<EventFormValues> = {
        title: '',
        description: '',
        location: '',
    }

    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventFormSchema),
        defaultValues,
        mode: 'onChange',
    })

    async function onSubmit(data: EventFormValues) {
        setIsSubmitting(true)

        try {
            await dispatch(createEvent(data))

            toast('Event created successfully!',
                {
                    description: `"${data.title}" has been scheduled.`,
                }
            )

            form.reset()

        } catch (error) {
            console.error('Error creating event:', error)
            toast.error('Error', {
                description: 'Failed to create event. Please try again.',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Create New Event</h1>
                    <p className="text-muted-foreground mt-2">
                        Schedule a new event and manage registrations.
                    </p>
                </div>

                {/* Event Creation Form */}
                <div className="border rounded-lg p-6 bg-card">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Title Field */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Event Title *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter event title"
                                                {...field}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            A clear, descriptive title for your event.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description Field */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Describe your event..."
                                                className="min-h-[100px]"
                                                {...field}
                                                disabled={isSubmitting}
                                                value={field.value || ''}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Provide details about what attendees can expect.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Location Field */}
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Virtual or physical location"
                                                {...field}
                                                disabled={isSubmitting}
                                                value={field.value || ''}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Where will this event take place?
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Note about date selection */}
                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                                <div className="flex items-start gap-2">
                                    <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-blue-700">
                                        <span className="font-medium">Note:</span> For single-day events, use the Event Date field. For multi-day events, use both Start Date and End Date fields.
                                    </p>
                                </div>
                            </div>

                            {/* Event Date Field for Single Day */}
                            <FormField
                                control={form.control}
                                name="eventDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Event Date & Time (for single-day events)</FormLabel>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <div className="flex-1">
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                className={cn(
                                                                    "w-full justify-start text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                                disabled={isSubmitting}
                                                            >
                                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date: Date) => date < new Date()}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                            <div className="flex-1">
                                                <Input
                                                    type="time"
                                                    disabled={isSubmitting}
                                                    value={field.value ? format(field.value, 'HH:mm') : ''}
                                                    onChange={(e) => {
                                                        const [hours, minutes] = e.target.value.split(':')
                                                        if (field.value && hours && minutes) {
                                                            const newDate = new Date(field.value)
                                                            newDate.setHours(parseInt(hours))
                                                            newDate.setMinutes(parseInt(minutes))
                                                            field.onChange(newDate)
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <FormDescription>
                                            For events that happen on a single day.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Start Date Field for Multi-Day Events */}
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Start Date & Time (for multi-day events)</FormLabel>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <div className="flex-1">
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                className={cn(
                                                                    "w-full justify-start text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                                disabled={isSubmitting}
                                                            >
                                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>Pick start date</span>
                                                                )}
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date: Date) => date < new Date()}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                            <div className="flex-1">
                                                <Input
                                                    type="time"
                                                    disabled={isSubmitting}
                                                    value={field.value ? format(field.value, 'HH:mm') : ''}
                                                    onChange={(e) => {
                                                        const [hours, minutes] = e.target.value.split(':')
                                                        if (field.value && hours && minutes) {
                                                            const newDate = new Date(field.value)
                                                            newDate.setHours(parseInt(hours))
                                                            newDate.setMinutes(parseInt(minutes))
                                                            field.onChange(newDate)
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <FormDescription>
                                            When your multi-day event begins.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* End Date Field for Multi-Day Events */}
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>End Date & Time (for multi-day events)</FormLabel>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <div className="flex-1">
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                className={cn(
                                                                    "w-full justify-start text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                                disabled={isSubmitting}
                                                            >
                                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>Pick end date</span>
                                                                )}
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date: Date) => {
                                                                const startDate = form.getValues('startDate')
                                                                return startDate ? date < startDate : date < new Date()
                                                            }}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                            <div className="flex-1">
                                                <Input
                                                    type="time"
                                                    disabled={isSubmitting}
                                                    value={field.value ? format(field.value, 'HH:mm') : ''}
                                                    onChange={(e) => {
                                                        const [hours, minutes] = e.target.value.split(':')
                                                        if (field.value && hours && minutes) {
                                                            const newDate = new Date(field.value)
                                                            newDate.setHours(parseInt(hours))
                                                            newDate.setMinutes(parseInt(minutes))
                                                            field.onChange(newDate)
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <FormDescription>
                                            When your multi-day event ends.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit Button */}
                            <div className="flex gap-4 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => form.reset()}
                                    disabled={isSubmitting}
                                >
                                    Reset
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="min-w-[100px]"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        'Create Event'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>

                {/* Help Section */}
                <div className="mt-8 p-6 border rounded-lg bg-muted/50">
                    <h3 className="font-semibold mb-2">Tips for creating events:</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0" />
                            Use clear, descriptive titles that explain the event purpose
                        </li>
                        <li className="flex items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0" />
                            Include all necessary details in the description
                        </li>
                        <li className="flex items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0" />
                            Specify if the event is virtual or in-person
                        </li>
                        <li className="flex items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0" />
                            <span className="font-medium">Date Selection:</span> For single-day events, use Event Date. For multi-day events, use both Start Date and End Date.
                        </li>
                        <li className="flex items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0" />
                            Set the event date and time accurately for all time zones
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AdminEventPage