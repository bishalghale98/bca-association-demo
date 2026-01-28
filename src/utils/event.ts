import { IEvent } from "@/store/event/eventSlice";

export const isPastEvent = (event: IEvent) => {
    const now = new Date();
    const endDate = event.endDate ? new Date(event.endDate) :
        event.eventDate ? new Date(event.eventDate) : new Date();
    return endDate < now;
};

export const isUpcomingEvent = (event: IEvent) => {
    const now = new Date();
    const startDate = event.startDate ? new Date(event.startDate) :
        event.eventDate ? new Date(event.eventDate) : new Date();
    return startDate > now;
};

export const getEventStatus = (event: IEvent) => {
    if (isPastEvent(event)) return {
        label: 'Past',
        variant: 'outline' as const,
        color: 'text-muted-foreground bg-muted/50'
    };
    if (isUpcomingEvent(event)) return {
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

