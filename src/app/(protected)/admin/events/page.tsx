'use client'

import EventForm from '@/components/admin/event/event-form'
import { getAllEvents, getEventById, IEvent, Status } from '@/store/event/eventSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import EventShowingPage from '../../dashboard/events/page';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

const AdminEventPage = () => {
    const searchParams = useSearchParams()
    const type = searchParams.get("type")
    const id = searchParams.get("id")

    const router = useRouter()
    const { data: session } = useSession()
    const role = session?.user.role

    const dispatch = useAppDispatch()
    const { event, fetchOneStatus, error } = useAppSelector(
        (store) => store.event
    )

    useEffect(() => {
        dispatch(getAllEvents())
    }, [dispatch])

    useEffect(() => {
        if (id && type === 'edit' && event?.id !== id) {
            dispatch(getEventById(id))
        }
    }, [id, type, event?.id, dispatch])

    useEffect(() => {
        if (error) {
            toast(error, {
                description: "Error while doing the action",
            })
        }
    }, [error])

    const onEdit = (eventId: string) => {
        router.push(`/admin/events?type=edit&id=${eventId}`)
    }

    const handleBack = () => {
        router.push('/admin/events')
    }

    // status == Status.LOADING state
    if (fetchOneStatus == Status.LOADING && type === 'edit' && id) {
        return (
            <div className="container mx-auto py-10">
                <div className="flex justify-start mb-6">
                    <Button onClick={handleBack} variant="outline">
                        Back
                    </Button>
                </div>
                <div className="max-w-2xl mx-auto">
                    <div className="text-center py-20">
                        <p className="text-muted-foreground">Loading event details...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (type === 'edit') {
        if (!event && id) {
            return (
                <div className="container mx-auto py-10">
                    <div className="flex justify-start mb-6">
                        <Button onClick={handleBack} variant="outline">
                            Back
                        </Button>
                    </div>
                    <div className="max-w-2xl mx-auto">
                        <div className="text-center py-20">
                            <p className="text-muted-foreground">Event not found</p>
                            <Button onClick={handleBack} className="mt-4">
                                Return to Events
                            </Button>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="container mx-auto py-10">
                <div className="flex justify-start mb-6">
                    <Button onClick={handleBack} variant="outline">
                        Back
                    </Button>
                </div>
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight">Edit Event</h1>
                        <p className="text-muted-foreground mt-2">
                            Update event details and manage registrations.
                        </p>
                    </div>

                    {/* Event Edit Form */}
                    <EventForm
                        id={id as string}
                        event={event as IEvent}
                        onSuccess={handleBack}
                    />

                    {/* Help Section */}
                    <div className="mt-8 p-6 border rounded-lg bg-muted/50">
                        <h3 className="font-semibold mb-2">Tips for updating events:</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 shrink-0" />
                                Double-check date and time changes to avoid confusion
                            </li>
                            <li className="flex items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 shrink-0" />
                                Update location information if the venue changes
                            </li>
                            <li className="flex items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 shrink-0" />
                                Notify registered attendees of significant changes
                            </li>
                            <li className="flex items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 shrink-0" />
                                <span className="font-medium">Date Selection:</span> For single-day events, use Event Date. For multi-day events, use both Start Date and End Date.
                            </li>
                            <li className="flex items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 shrink-0" />
                                Save changes frequently to avoid losing updates
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    if (type === 'add') {
        return (
            <div className="container mx-auto py-10">
                <div className="flex justify-start mb-6">
                    <Button onClick={handleBack} variant="outline">
                        Back
                    </Button>
                </div>
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight">Create New Event</h1>
                        <p className="text-muted-foreground mt-2">
                            Schedule a new event and manage registrations.
                        </p>
                    </div>

                    {/* Event Creation Form */}
                    <EventForm onSuccess={handleBack} />

                    {/* Help Section */}
                    <div className="mt-8 p-6 border rounded-lg bg-muted/50">
                        <h3 className="font-semibold mb-2">Tips for creating events:</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 shrink-0" />
                                Use clear, descriptive titles that explain the event purpose
                            </li>
                            <li className="flex items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 shrink-0" />
                                Include all necessary details in the description
                            </li>
                            <li className="flex items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 shrink-0" />
                                Specify if the event is virtual or in-person
                            </li>
                            <li className="flex items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 shrink-0" />
                                <span className="font-medium">Date Selection:</span> For single-day events, use Event Date. For multi-day events, use both Start Date and End Date.
                            </li>
                            <li className="flex items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 shrink-0" />
                                Set the event date and time accurately for all time zones
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Events Management</h1>
                    <p className="text-muted-foreground mt-2">
                        Create, edit, and manage events for your organization.
                    </p>
                </div>
                <Button onClick={() => router.push('/admin/events?type=add')}>
                    Create Event
                </Button>
            </div>

            <EventShowingPage role={role} onEdit={onEdit} />
        </div>
    )
}

export default AdminEventPage