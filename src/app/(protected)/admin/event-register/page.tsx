'use client'

import React, { useState } from 'react';
import {
    Search,
    Calendar,
    Users,
    MapPin,
    Clock,
    Filter,
    ChevronRight,
    Tag,
    Loader2
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getAllEvents } from '@/store/event/eventSlice';
import { useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getEventStatus, isPastEvent } from '@/utils/event';
import { formatDateTime } from '@/utils/formatDate';
import { useRouter, useSearchParams } from 'next/navigation';
import { Status } from '@/store/types';
import EventRegistrationManage from '@/components/admin/event/EventRegistrationManage';

const EventRegisterPage = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter()
    const searchParams = useSearchParams()
    const eventId = searchParams.get("eventId")

    const dispatch = useAppDispatch()
    const { events, fetchAllStatus } = useAppSelector((state) => state.event)

    useEffect(() => {
        dispatch(getAllEvents())
    }, [dispatch])

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


    if (fetchAllStatus === Status.LOADING) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    if (eventId) {
        return (
            <EventRegistrationManage eventId={eventId} />
        )
    }




    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-8 md:mb-12">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                        Event Registration
                    </h1>
                    <p className="text-gray-600 md:text-lg">
                        Discover and register for upcoming events, workshops, and conferences
                    </p>
                </header>

                {/* Search and Filter Bar */}
                <div className="mb-8 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search events..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Filter className="h-5 w-5" />
                        <span className="hidden sm:inline">Filters</span>
                    </button>
                </div>

                {/* Tabs Navigation */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2 md:gap-4 border-b border-gray-200">
                        {['all', 'upcoming', 'past', 'live'].map((tab) => (
                            <button
                                key={tab}
                                className={`flex items-center gap-2 px-4 py-3 rounded-t-lg font-medium transition-all ${activeTab === tab
                                    ? 'bg-white border-t border-x border-gray-200 text-blue-600'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                <span className="capitalize">{tab}</span>
                                {tab === 'live' && (
                                    <span className="animate-pulse w-2 h-2 bg-red-500 rounded-full"></span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                        <Card
                            key={event.id}
                            className="w-full max-w-md overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                                        <p className="text-sm text-gray-600 mt-2">
                                            {event.description}
                                        </p>
                                    </div>
                                    <Badge variant="outline" className={getEventStatus(event).color}>
                                        {getEventStatus(event).label}
                                    </Badge>
                                </div>
                            </CardHeader>

                            <CardContent className="pb-4">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-gray-500" />
                                            <span className="text-sm font-medium">{event.eventDate ? formatDateTime(event.eventDate).fullDateTime : formatDateTime(event.startDate!).fullDateTime + " - " + formatDateTime(event.endDate!).fullDateTime}</span>
                                        </div>


                                    </div>

                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm text-gray-700">{event.location}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Tag className="h-4 w-4 text-gray-500" />
                                        <Badge variant="secondary" className="font-normal">
                                            {event.type}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="border-t pt-4">

                                <Button
                                    onClick={() => router.push(`/admin/event-register?eventId=${event.id}`)}
                                    disabled={isPastEvent(event) ? true : false}
                                    className={`flex items-center justify-center gap-2 w-full ${isPastEvent(event) ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
                                    View Registration
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}

                </div>

                {/* Responsive Stats Bar */}
                <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900">42</div>
                            <div className="text-gray-600">Total Events</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">24</div>
                            <div className="text-gray-600">Upcoming</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">5</div>
                            <div className="text-gray-600">Live Now</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-600">13</div>
                            <div className="text-gray-600">Past Events</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventRegisterPage;