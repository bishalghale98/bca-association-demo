// components/EventCard/EventCard.tsx
import { deleteEvent, IEvent } from '@/store/event/eventSlice';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    MapPinIcon,
    ClockIcon,
    CalendarDaysIcon,
    UserIcon,
    CalendarClockIcon,
    CalendarRangeIcon,
    ChevronRightIcon,
    ExternalLinkIcon,
    UsersIcon,
    EditIcon,
    TrashIcon,
} from 'lucide-react';
import { UserRole } from '@/types/user/enums';
import { DeleteModal } from '@/components/common/delete-confirmation';
import { useAppDispatch } from '@/store/hooks';


interface EventCardProps {
    event: IEvent;
    onRegister?: (eventId: string) => void;
    className?: string;
    onEdit?: (eventId: string) => void;
    onDelete?: (eventId: string) => void;
    registrationsCount?: number;
    viewMode?: 'grid' | 'list';
    role?: string;
}

const EventCard: React.FC<EventCardProps> = ({
    event,
    className = '',
    registrationsCount = 0,
    role,
    onEdit,
    onDelete,
    viewMode = 'grid'
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useAppDispatch()

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            }),
            time: date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }),
            weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
            fullDate: date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            }),
            fullDateTime: date.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            })
        };
    };

    const isMultiDayEvent = () => {
        return event.startDate && event.endDate && event.startDate !== event.endDate;
    };

    const isPastEvent = () => {
        const now = new Date();
        const endDate = event.endDate ? new Date(event.endDate) :
            event.eventDate ? new Date(event.eventDate) : new Date();
        return endDate < now;
    };

    const isUpcomingEvent = () => {
        const now = new Date();
        const startDate = event.startDate ? new Date(event.startDate) :
            event.eventDate ? new Date(event.eventDate) : new Date();
        return startDate > now;
    };

    const getEventStatus = () => {
        if (isPastEvent()) return {
            label: 'Past',
            variant: 'outline' as const,
            color: 'text-muted-foreground bg-muted/50'
        };
        if (isUpcomingEvent()) return {
            label: 'Upcoming',
            variant: 'default' as const,
            color: 'text-primary-foreground bg-primary'
        };
        return {
            label: 'Live Now',
            variant: 'destructive' as const,
            color: 'text-destructive-foreground bg-destructive'
        };
    };

    const getDurationDays = () => {
        if (!isMultiDayEvent() || !event.startDate || !event.endDate) return null;
        const start = new Date(event.startDate);
        const end = new Date(event.endDate);
        return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    };

    const handleRegister = (eventId: string) => {
        console.log('Register for event:', eventId);
    };

    const handleViewDetails = () => {
        console.log('View details for:', event.id);
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log(event.id)
        if (onEdit) onEdit(event.id);
    };

    const handleDelete = async (itemId: string) => {
        await dispatch(deleteEvent(itemId))

    };


    const [isModalOpen, setIsModalOpen] = useState(false)
    const [itemToDelete, setItemToDelete] = useState<{ id: string, title: string } | null>(null)



    // Check if user has admin/editor role

    if (viewMode === 'list') {
        return (
            <Card
                className={`group relative overflow-hidden border rounded-lg hover:shadow-md transition-all duration-200 ${className}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`p-2 rounded-lg ${getEventStatus().color}`}>
                                    {isMultiDayEvent() ? (
                                        <CalendarRangeIcon className="h-5 w-5" />
                                    ) : (
                                        <CalendarDaysIcon className="h-5 w-5" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">
                                        {event.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge variant={getEventStatus().variant} className="text-xs">
                                            {getEventStatus().label}
                                        </Badge>
                                        {event.type && (
                                            <Badge className="text-xs mr-2">
                                                {event.type}
                                            </Badge>
                                        )}
                                        {registrationsCount > 0 && (
                                            <Badge variant="outline" className="text-xs">
                                                <UsersIcon className="h-3 w-3 mr-1" />
                                                {registrationsCount}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {event.description && (
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                    {event.description}
                                </p>
                            )}
                        </div>

                        {/* Action buttons for role */}
                        {role && (
                            <div className="flex items-center gap-2 ml-4">

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={handleEdit}
                                >
                                    <EditIcon className="h-4 w-4" />
                                </Button>


                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-destructive"
                                    onClick={() => {
                                        setItemToDelete({ id: event.id, title: event.title })
                                        setIsModalOpen(true)
                                    }}
                                >
                                    <TrashIcon className="h-4 w-4" />
                                </Button>

                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                            <CalendarClockIcon className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-sm font-medium">
                                    {isMultiDayEvent()
                                        ? `${formatDateTime(event.startDate!).fullDate} to ${formatDateTime(event.endDate!).fullDate}`
                                        : formatDateTime(event.eventDate!).fullDateTime
                                    }
                                </p>
                            </div>
                        </div>

                        {event.location && (
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                                <MapPinIcon className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="text-sm font-medium">{event.location}</p>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                            <ClockIcon className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-sm font-medium">
                                    {isMultiDayEvent()
                                        ? `${getDurationDays()} days`
                                        : 'Single day'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <UserIcon className="h-4 w-4" />
                            <span>Created {formatDateTime(event.createdAt).date}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            {!isPastEvent() && (
                                <Button
                                    onClick={() => handleRegister(event.id)}
                                    size="sm"
                                >
                                    Register
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        );
    }

    // Grid View (Default)
    return (
        <Card
            className={`group relative overflow-hidden border rounded-lg hover:shadow-lg transition-shadow duration-200 ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Status badges */}
            <div className="absolute top-4 right-4 z-10">
                <Badge
                    variant={getEventStatus().variant}
                    className="rounded-full px-3 py-1"
                >
                    {getEventStatus().label}
                </Badge>
                {event.type && (
                    <Badge className="mt-2 rounded-full px-3 py-1">
                        {event.type}
                    </Badge>
                )}
            </div>

            {/* Card Content */}
            <div className="p-5 pt-16">
                {/* Title */}
                <h3 className="text-xl font-bold mb-3">
                    {event.title}
                </h3>

                {/* Description */}
                {event.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {event.description}
                    </p>
                )}

                {/* Details */}
                <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                        <CalendarClockIcon className="h-4 w-4 text-primary" />
                        <span className="text-sm">
                            {isMultiDayEvent()
                                ? `${formatDateTime(event.startDate!).date} - ${formatDateTime(event.endDate!).date}`
                                : formatDateTime(event.eventDate!).date
                            }
                        </span>
                    </div>

                    {event.location && (
                        <div className="flex items-center gap-2">
                            <MapPinIcon className="h-4 w-4 text-primary" />
                            <span className="text-sm truncate">{event.location}</span>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <ClockIcon className="h-4 w-4 text-primary" />
                        <span className="text-sm">
                            {isMultiDayEvent()
                                ? `${getDurationDays()} days`
                                : formatDateTime(event.eventDate!).time
                            }
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <UserIcon className="h-4 w-4" />
                            <span>Created {formatDateTime(event.createdAt).date}</span>
                        </div>

                        {registrationsCount > 0 && (
                            <Badge variant="outline" className="text-xs">
                                <UsersIcon className="h-3 w-3 mr-1" />
                                {registrationsCount}
                            </Badge>
                        )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                        {role && !isPastEvent() && (
                            <>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                    onClick={handleEdit}
                                >
                                    <EditIcon className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>


                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 text-destructive"
                                    onClick={() => {
                                        setItemToDelete({ id: event.id, title: event.title })
                                        setIsModalOpen(true)
                                    }}
                                >
                                    <TrashIcon className="h-4 w-4 mr-2" />
                                    Delete
                                </Button>

                            </>
                        )}


                        <Button
                            onClick={() => handleRegister(event.id)}
                            className="flex-1"
                            disabled={isPastEvent()}
                        >
                            {isPastEvent() ? 'Event Ended' : 'Register'}
                        </Button>

                    </div>
                </div>
            </div>
            {itemToDelete && (
                <DeleteModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={() => handleDelete(itemToDelete.id)}
                    itemName={itemToDelete.title}
                    itemType="Event"
                />
            )}

        </Card>
    );
};

export default EventCard;