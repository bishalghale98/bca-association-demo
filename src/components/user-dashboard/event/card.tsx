// components/EventCard/EventCard.tsx
import { IEvent } from '@/store/event/eventSlice';
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
} from 'lucide-react';

interface EventCardProps {
    event: IEvent;
    onRegister?: (eventId: string) => void;
    className?: string;
    onEdit?: (eventId: string) => void;
    onDelete?: (eventId: string) => void;
    registrationsCount?: number;
    viewMode?: 'grid' | 'list';
}

const EventCard: React.FC<EventCardProps> = ({
    event,
    onRegister,
    className = '',
    registrationsCount = 0,
    viewMode = 'grid'
}) => {
    const [isHovered, setIsHovered] = useState(false);

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

    const handleRegisterClick = () => {
        if (onRegister) {
            onRegister(event.id);
        }
    };

    const handleViewDetails = () => {
        // Could navigate to event details page
        console.log('View details for:', event.id);
    };

    if (viewMode === 'list') {
        return (
            <Card
                className={`group relative overflow-hidden border-0 rounded-lg hover:shadow-lg transition-all duration-300 bg-linear-to-br from-background to-secondary/5 ${className}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Animated background linear */}
                <div className={`absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent transition-all duration-700 ${isHovered ? 'translate-x-full' : '-translate-x-full'}`} />

                <div className="relative p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`p-2 rounded-lg ${getEventStatus().color} transition-all duration-300`}>
                                    {isMultiDayEvent() ? (
                                        <CalendarRangeIcon className="h-5 w-5" />
                                    ) : (
                                        <CalendarDaysIcon className="h-5 w-5" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                        {event.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge variant={getEventStatus().variant} className="text-xs">
                                            {getEventStatus().label}
                                        </Badge>

                                        {
                                            event.type && (
                                                <Badge className="text-xs mr-2">
                                                    {event.type}
                                                </Badge>
                                            )
                                        }
                                        {registrationsCount > 0 && (
                                            <Badge variant="outline" className="text-xs">
                                                <UsersIcon className="h-3 w-3 mr-1" />
                                                {registrationsCount} registered
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

                        {/* Action menu */}

                        <Button
                            variant="ghost"
                            size="sm"
                            className="transition-all duration-300 opacity-0 group-hover:opacity-100"
                            onClick={handleViewDetails}
                        >
                            <ExternalLinkIcon className="h-4 w-4" />
                        </Button>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {/* Date/Time Info */}
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                            <CalendarClockIcon className="h-5 w-5 text-primary shrink-0" />
                            <div className="flex-1">
                                <p className="text-xs text-muted-foreground">When</p>
                                <p className="text-sm font-medium">
                                    {isMultiDayEvent()
                                        ? `${formatDateTime(event.startDate!).fullDate} to ${formatDateTime(event.endDate!).fullDate}`
                                        : `${formatDateTime(event.eventDate!).weekday}, ${formatDateTime(event.eventDate!).fullDateTime}`
                                    }
                                </p>
                            </div>
                        </div>

                        {/* Location Info */}
                        {event.location && (
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                                <MapPinIcon className="h-5 w-5 text-primary shrink-0" />
                                <div className="flex-1">
                                    <p className="text-xs text-muted-foreground">Where</p>
                                    <p className="text-sm font-medium truncate">{event.location}</p>
                                </div>
                            </div>
                        )}

                        {/* Duration Info */}
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                            <ClockIcon className="h-5 w-5 text-primary shrink-0" />
                            <div className="flex-1">
                                <p className="text-xs text-muted-foreground">Duration</p>
                                <p className="text-sm font-medium">
                                    {isMultiDayEvent()
                                        ? `${getDurationDays()} days`
                                        : 'Single day'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <UserIcon className="h-4 w-4" />
                            <span>Created {formatDateTime(event.createdAt).date}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            {!isPastEvent() && (
                                <Button
                                    onClick={handleRegisterClick}
                                    className="rounded-full px-6"
                                    variant="default"
                                    size="sm"
                                >
                                    Register Now
                                    <ChevronRightIcon className="ml-2 h-4 w-4" />
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
            className={`group relative overflow-hidden border-0 rounded-xl hover:shadow-2xl transition-all duration-500 bg-linear-to-b from-background to-secondary/10 hover:to-primary/5 ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Floating status badge */}
            <div className="absolute top-4 right-4 z-20">
                <Badge
                    variant={getEventStatus().variant}
                    className={`rounded-full px-3 py-1 font-medium backdrop-blur-sm transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}
                >
                    {getEventStatus().label}
                </Badge>

                {
                    event.type && (
                        <Badge
                            className={`rounded-full px-3 py-1 font-medium backdrop-blur-sm transition-all duration-300`}
                        >
                            {event?.type}
                        </Badge>
                    )
                }
            </div>

            {/* Event Type indicator */}
            <div className="absolute top-4 left-4">
                <div className={`p-2 rounded-lg ${getEventStatus().color} backdrop-blur-sm`}>
                    {isMultiDayEvent() ? (
                        <CalendarRangeIcon className="h-5 w-5" />
                    ) : (
                        <CalendarDaysIcon className="h-5 w-5" />
                    )}
                </div>
            </div>

            {/* Card Content */}
            <div className="p-5 pt-16">
                {/* Title with animated underline */}
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {event.title}
                    </h3>
                    <div className="h-0.5 w-0 group-hover:w-full bg-primary/30 transition-all duration-500" />
                </div>

                {/* Description */}
                {event.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-6 leading-relaxed">
                        {event.description}
                    </p>
                )}

                {/* Details Grid */}
                <div className="space-y-3 mb-6">
                    {/* Date/Time */}
                    <div className="flex items-center gap-3">
                        <CalendarClockIcon className="h-4 w-4 text-primary shrink-0" />
                        <div className="flex-1">
                            <p className="text-xs text-muted-foreground">Date & Time</p>
                            <p className="text-sm font-medium truncate text-wrap">
                                {isMultiDayEvent()
                                    ? `${formatDateTime(event.startDate!).fullDateTime} - ${formatDateTime(event.endDate!).fullDateTime}`
                                    : formatDateTime(event.eventDate!).fullDateTime
                                }
                            </p>
                        </div>
                    </div>

                    {/* Location */}
                    {event.location && (
                        <div className="flex items-center gap-3">
                            <MapPinIcon className="h-4 w-4 text-primary shrink-0" />
                            <div className="flex-1">
                                <p className="text-xs text-muted-foreground">Location</p>
                                <p className="text-sm font-medium truncate">{event.location}</p>
                            </div>
                        </div>
                    )}

                    {/* Duration */}
                    <div className="flex items-center gap-3">
                        <ClockIcon className="h-4 w-4 text-primary shrink-0" />
                        <div className="flex-1">
                            <p className="text-xs text-muted-foreground">Duration</p>
                            <p className="text-sm font-medium">
                                {isMultiDayEvent()
                                    ? `${getDurationDays()} day${getDurationDays()! > 1 ? 's' : ''}`
                                    : 'Single day'
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-5 border-t border-border/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <UserIcon className="h-4 w-4" />
                            <span className="truncate">Created {formatDateTime(event.createdAt).date}</span>
                        </div>

                        {/* Registrations count */}
                        {registrationsCount > 0 && (
                            <Badge variant="outline" className="text-xs">
                                <UsersIcon className="h-3 w-3 mr-1" />
                                {registrationsCount}
                            </Badge>
                        )}
                    </div>

                    {/* Action buttons */}
                    <div className="mt-4 flex items-center gap-2">

                        <Button
                            onClick={handleRegisterClick}
                            className={`flex-1 rounded-lg ${isPastEvent() ? 'opacity-50 cursor-not-allowed' : ''}`}
                            variant="default"
                            disabled={isPastEvent()}
                        >
                            {isPastEvent() ? (
                                'Event Ended'
                            ) : (
                                <>
                                    Register Now
                                    <ChevronRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Hover effect overlay */}
            <div className={`absolute inset-0 bg-linear-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
        </Card>
    );
};

export default EventCard;