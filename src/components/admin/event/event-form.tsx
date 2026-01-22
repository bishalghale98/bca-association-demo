'use client'

import { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { format, parseISO } from 'date-fns'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { Info } from 'lucide-react'

// ShadCN Components
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
import { createEvent, updateEvent, IEvent } from '@/store/event/eventSlice'

interface IEventFormProps {
    id?: string | null
    event?: IEvent | null // Make optional for create mode
    onSuccess?: () => void // Optional callback for success
}

const EventForm = ({ id, event, onSuccess }: IEventFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const dispatch = useAppDispatch()

    // Function to convert ISO string to Date object
    const parseDate = (dateString?: string | null): Date | undefined => {
        if (!dateString) return undefined
        try {
            return parseISO(dateString)
        } catch (error) {
            console.error('Error parsing date:', error)
            return undefined
        }
    }

    // Set default values based on whether we're editing or creating
    const getDefaultValues = (): Partial<EventFormValues> => {
        if (event && id) {
            // Editing mode - populate with event data
            return {
                title: event.title || '',
                description: event.description || '',
                location: event.location || '',
                type: event.type || '',
                eventDate: parseDate(event.eventDate),
                startDate: parseDate(event.startDate),
                endDate: parseDate(event.endDate),
            }
        }

        // Creating mode - empty form
        return {
            title: '',
            description: '',
            location: '',
            type: '',
        }
    }

    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: getDefaultValues(),
        mode: 'onChange',
    })

    // Reset form when event data changes
    useEffect(() => {
        if (event && id) {
            form.reset(getDefaultValues())
        } else {
            form.reset({
                title: '',
                description: '',
                location: '',
                type: '',
                eventDate: undefined,
                startDate: undefined,
                endDate: undefined,
            })
        }
    }, [event, id, form])

    async function onSubmit(data: EventFormValues) {
        setIsSubmitting(true)

        try {
            if (event && id) {
                // Update existing event
                await dispatch(updateEvent({ id, data }))
                toast('Event updated successfully!', {
                    description: `"${data.title}" has been updated.`,
                })
            } else {
                // Create new event
                await dispatch(createEvent(data))
                toast('Event created successfully!', {
                    description: `"${data.title}" has been scheduled.`,
                })
            }

            // Reset form after successful submission (only in create mode)
            if (!event || !id) {
                form.reset()
            }

            // Call success callback if provided
            if (onSuccess) {
                onSuccess()
            }

        } catch (error) {
            console.error('Error saving event:', error)
            toast.error('Error', {
                description: event && id
                    ? 'Failed to update event. Please try again.'
                    : 'Failed to create event. Please try again.',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
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
                                        className="min-h-25"
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

                    {/* Event Type */}
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Event Type</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Hackathon, seminar, workshop"
                                        {...field}
                                        disabled={isSubmitting}
                                        value={field.value || ''}
                                    />
                                </FormControl>
                                <FormDescription>
                                    What kind of event is this?
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Note about date selection */}
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <div className="flex items-start gap-2">
                            <Info className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
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
                                                } else if (hours && minutes) {
                                                    // Create a new date if no date is selected but time is chosen
                                                    const newDate = new Date()
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
                                                } else if (hours && minutes) {
                                                    // Create a new date if no date is selected but time is chosen
                                                    const newDate = new Date()
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
                                                } else if (hours && minutes) {
                                                    // Create a new date if no date is selected but time is chosen
                                                    const newDate = new Date()
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
                            onClick={() => form.reset(getDefaultValues())}
                            disabled={isSubmitting}
                        >
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="min-w-25"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {event && id ? 'Updating...' : 'Creating...'}
                                </>
                            ) : (
                                event && id ? 'Update Event' : 'Create Event'
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default EventForm