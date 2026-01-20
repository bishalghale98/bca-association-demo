'use client'

import EventCard from '@/components/user-dashboard/event/card'
import { getAllEvents, IEvent } from '@/store/event/eventSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useEffect, useState } from 'react'
import {
    Search,
    Calendar,
    Filter,
    Loader2,
    AlertCircle,
    ChevronRight,
    TrendingUp,
    Clock,
    Users,
    CalendarDays,
    RefreshCw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import MobileSortDropdown from '@/components/user-dashboard/event/mobile-sort-dropdown'
import ViewToggleButtons from '@/components/user-dashboard/event/view-toggle-buttons'

// Helper functions for date calculations
const isPastEvent = (event: IEvent) => {
    const now = new Date();
    const endDate = event.endDate ? new Date(event.endDate) :
        event.eventDate ? new Date(event.eventDate) : new Date();
    return endDate < now;
};

const isUpcomingEvent = (event: IEvent) => {
    const now = new Date();
    const startDate = event.startDate ? new Date(event.startDate) :
        event.eventDate ? new Date(event.eventDate) : new Date();
    return startDate > now;
};

const getEventStatus = (event: IEvent) => {
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

const EventShowingPage = () => {
    const dispatch = useAppDispatch()
    const { events, error, loading } = useAppSelector((store) => store.event)
    const [isRegistering, setIsRegistering] = useState(false)
    const [currentEventId, setCurrentEventId] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [activeTab, setActiveTab] = useState('all')
    const [sortBy, setSortBy] = useState('date')

    useEffect(() => {
        dispatch(getAllEvents())
    }, [dispatch])

    const handleRegister = (eventId: string) => {
        setIsRegistering(true)
        setCurrentEventId(eventId)
        setTimeout(() => {
            setIsRegistering(false)
            setCurrentEventId(null)
        }, 1500)
    }

    const handleRefresh = () => {
        dispatch(getAllEvents())
    }

    // Filter events based on active tab and search using the new algorithm
    const filteredEvents = events?.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location?.toLowerCase().includes(searchQuery.toLowerCase())

        if (!matchesSearch) return false

        const status = getEventStatus(event)

        if (activeTab === 'upcoming') return status.label === 'Upcoming'
        if (activeTab === 'past') return status.label === 'Past'
        if (activeTab === 'live') return status.label === 'Live Now'

        return true
    })

    // Sort events
    const sortedEvents = [...(filteredEvents || [])].sort((a, b) => {
        if (sortBy === 'date') {
            const dateA = a.startDate ? new Date(a.startDate) : new Date(a.eventDate as string)
            const dateB = b.startDate ? new Date(b.startDate) : new Date(b.eventDate as string)
            return dateA.getTime() - dateB.getTime()
        }
        if (sortBy === 'title') {
            return a.title.localeCompare(b.title)
        }
        return 0
    })

    // Calculate stats using the new algorithm
    const totalEvents = events?.length || 0
    const upcomingEvents = events?.filter(event => isUpcomingEvent(event)).length || 0
    const pastEvents = events?.filter(event => isPastEvent(event)).length || 0
    const liveEvents = events?.filter(event => {
        const status = getEventStatus(event)
        return status.label === 'Live Now'
    }).length || 0


    const EventCardSkeleton = () => {

        return (
            <Card className="overflow-hidden border-0 rounded-xl bg-linear-to-b from-background to-secondary/10 animate-pulse">
                <div className="p-5 pt-16">
                    <div className="mb-4">
                        <div className="h-7 bg-muted rounded w-3/4 mb-2"></div>
                        <div className="h-1 bg-muted rounded w-16"></div>
                    </div>
                    <div className="space-y-2 mb-6">
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded w-5/6"></div>
                    </div>
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="h-4 w-4 bg-muted rounded"></div>
                            <div className="flex-1 space-y-1">
                                <div className="h-3 bg-muted rounded w-16"></div>
                                <div className="h-4 bg-muted rounded w-32"></div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-4 w-4 bg-muted rounded"></div>
                            <div className="flex-1 space-y-1">
                                <div className="h-3 bg-muted rounded w-16"></div>
                                <div className="h-4 bg-muted rounded w-40"></div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-5 border-t border-border/50">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-3 bg-muted rounded w-24"></div>
                            <div className="h-6 bg-muted rounded w-16"></div>
                        </div>
                        <div className="h-10 bg-muted rounded"></div>
                    </div>
                </div>
            </Card>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-linear-to-b from-background to-secondary/10 flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="h-10 w-10 text-destructive" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-3">Error Loading Events</h2>
                    <p className="text-muted-foreground mb-6">{error}</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button
                            onClick={handleRefresh}
                            variant="default"
                            className="rounded-full px-6"
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Try Again
                        </Button>
                        <Button
                            onClick={() => window.location.reload()}
                            variant="outline"
                            className="rounded-full"
                        >
                            Reload Page
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-background via-background to-secondary/5">
            {/* Header Section */}
            <div className="backdrop-blur-lg bg-background/80 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <CalendarDays className="h-6 w-6 text-primary" />
                                </div>
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                    Discover Events
                                </h1>
                            </div>
                            <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
                                Explore and register for amazing events. Connect, learn, and grow with our community.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                onClick={handleRefresh}
                                variant="outline"
                                size="sm"
                                className="rounded-full"
                                disabled={loading}
                            >
                                {loading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <RefreshCw className="h-4 w-4" />
                                )}
                                <span className="sr-only sm:not-sr-only sm:ml-2">Refresh</span>
                            </Button>
                            <Select value={viewMode} onValueChange={(v: 'grid' | 'list') => setViewMode(v)}>
                                <SelectTrigger className="w-32 rounded-full hidden sm:flex">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="grid">Grid View</SelectItem>
                                    <SelectItem value="list">List View</SelectItem>
                                </SelectContent>
                            </Select>
                            <ViewToggleButtons setViewMode={setViewMode} viewMode={viewMode} />
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        <Card className="border-0 bg-linear-to-br from-primary/5 to-primary/10">
                            <CardContent className="p-4 sm:p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs sm:text-sm text-muted-foreground">Total Events</p>
                                        <p className="text-xl sm:text-2xl lg:text-3xl font-bold mt-1 sm:mt-2">{totalEvents}</p>
                                    </div>
                                    <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-primary/60" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-linear-to-br from-green-500/5 to-green-500/10">
                            <CardContent className="p-4 sm:p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs sm:text-sm text-muted-foreground">Upcoming</p>
                                        <p className="text-xl sm:text-2xl lg:text-3xl font-bold mt-1 sm:mt-2">{upcomingEvents}</p>
                                    </div>
                                    <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-green-500/60" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-linear-to-br from-blue-500/5 to-blue-500/10">
                            <CardContent className="p-4 sm:p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs sm:text-sm text-muted-foreground">Live Now</p>
                                        <p className="text-xl sm:text-2xl lg:text-3xl font-bold mt-1 sm:mt-2">{liveEvents}</p>
                                    </div>
                                    <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500/60" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-linear-to-br from-purple-500/5 to-purple-500/10">
                            <CardContent className="p-4 sm:p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs sm:text-sm text-muted-foreground">Past Events</p>
                                        <p className="text-xl sm:text-2xl lg:text-3xl font-bold mt-1 sm:mt-2">{pastEvents}</p>
                                    </div>
                                    <Users className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500/60" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Controls Bar */}
                <div className="z-40 mb-6 sm:mb-8 space-y-4">
                    <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 rounded-full border-border/50 bg-background/50 backdrop-blur-sm text-sm sm:text-base"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-full sm:w-40 rounded-full hidden sm:flex">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="date">Date</SelectItem>
                                    <SelectItem value="title">Title</SelectItem>
                                </SelectContent>
                            </Select>

                            <MobileSortDropdown setSortBy={setSortBy} />

                            <Button variant="outline" size="icon" className="rounded-full hidden sm:inline-flex">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="inline-flex flex-wrap h-auto p-1 bg-muted/50 rounded-full w-full sm:w-auto">
                            <TabsTrigger value="all" className="rounded-full data-[state=active]:bg-background flex-1 sm:flex-none min-w-25 sm:min-w-0">
                                All
                                <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs hidden sm:inline">
                                    {totalEvents}
                                </Badge>
                            </TabsTrigger>
                            <TabsTrigger value="upcoming" className="rounded-full data-[state=active]:bg-background flex-1 sm:flex-none min-w-25 sm:min-w-0">
                                Upcoming
                                <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs hidden sm:inline">
                                    {upcomingEvents}
                                </Badge>
                            </TabsTrigger>
                            <TabsTrigger value="live" className="rounded-full data-[state=active]:bg-background flex-1 sm:flex-none min-w-25 sm:min-w-0">
                                Live
                                <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs hidden sm:inline">
                                    {liveEvents}
                                </Badge>
                            </TabsTrigger>
                            <TabsTrigger value="past" className="rounded-full data-[state=active]:bg-background flex-1 sm:flex-none min-w-25 sm:min-w-0">
                                Past
                                <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs hidden sm:inline">
                                    {pastEvents}
                                </Badge>
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Events Grid/List */}
                {loading ? (
                    <div className={`grid gap-4 sm:gap-6 ${viewMode === 'grid'
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                        : 'grid-cols-1'
                        }`}>
                        {[...Array(6)].map((_, i) => (
                            <EventCardSkeleton key={i} />
                        ))}
                    </div>
                ) : sortedEvents.length === 0 ? (
                    <div className="text-center py-12 sm:py-20">
                        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                            <Calendar className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground/50" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2 sm:mb-3">No Events Found</h3>
                        <p className="text-muted-foreground mb-4 sm:mb-6 max-w-md mx-auto px-4 text-sm sm:text-base">
                            {searchQuery
                                ? `No events matching "${searchQuery}" found. Try different keywords.`
                                : activeTab !== 'all'
                                    ? `No ${activeTab} events at the moment.`
                                    : 'No events available right now. Check back soon!'}
                        </p>
                        {(searchQuery || activeTab !== 'all') && (
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSearchQuery('')
                                    setActiveTab('all')
                                }}
                                className="rounded-full"
                            >
                                View All Events
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className={
                        viewMode === 'grid'
                            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'
                            : 'space-y-4 sm:space-y-6'
                    }>
                        {sortedEvents.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                onRegister={handleRegister}
                                viewMode={viewMode}
                                className={
                                    currentEventId === event.id && isRegistering
                                        ? 'opacity-50 pointer-events-none'
                                        : ''
                                }
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Registration Loading Modal */}
            {isRegistering && currentEventId && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-background rounded-2xl p-6 sm:p-8 max-w-md w-full border border-border/50 shadow-2xl">
                        <div className="flex flex-col items-center text-center">
                            <div className="relative mb-4 sm:mb-6">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 text-primary animate-spin" />
                                </div>
                                <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-transparent animate-spin"></div>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2">
                                Processing Registration
                            </h3>
                            <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                                Registering for{" "}
                                <span className="font-medium text-foreground">
                                    {events?.find(e => e.id === currentEventId)?.title}
                                </span>
                            </p>
                            <div className="w-full bg-secondary/30 rounded-full h-2 mt-1 sm:mt-2 overflow-hidden">
                                <div className="h-full bg-primary animate-pulse rounded-full w-3/4"></div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2 sm:mt-3">
                                This usually takes a few seconds...
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer Note */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mt-8 sm:mt-12 border-t border-border/50">
                <div className="text-center text-xs sm:text-sm text-muted-foreground">
                    <p>Showing {sortedEvents.length} of {totalEvents} events • Updated just now</p>
                    <p className="mt-2">
                        Need help?{' '}
                        <Button variant="link" className="p-0 h-auto text-primary text-xs sm:text-sm">
                            Contact support
                            <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default EventShowingPage