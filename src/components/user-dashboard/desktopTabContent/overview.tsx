import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, ChevronRight, Download, FileText, Shield } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import EventCard from '../event/card'
import { useSession } from 'next-auth/react'
import { IEvent, getAllEvents } from '@/store/event/eventSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Status } from '@/store/types'
import EventCardSkeleton from '../event/EventCardSkeleton'


interface OverciewTabContentProps {
    documents: any[]
}

const OverciewTabContent = ({ documents }: OverciewTabContentProps) => {

    const { data: session } = useSession()

    const dispatch = useAppDispatch()
    const { events, fetchAllStatus } = useAppSelector((store) => store.event)




    useEffect(() => {
        dispatch(getAllEvents())
    }, [dispatch])

    const filteredEvents = events?.filter((event: IEvent) => {
        const today = new Date();
        const next7Days = new Date();
        next7Days.setDate(today.getDate() + 7);

        // pick eventDate first, fallback to startDate
        const eventDateStr = event.eventDate || event.startDate;
        if (!eventDateStr) return false;

        const eventDate = new Date(eventDateStr);

        return eventDate >= today && eventDate <= next7Days;
    });



    return (
        <>
            {/* Welcome Card */}
            <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                        <div>
                            <h2 className="text-lg sm:text-2xl font-bold text-[#0F172A] dark:text-[#E5E7EB] mb-1 sm:mb-2">
                                Welcome back, {session?.user.name.split(' ')[0]}! 👋
                            </h2>
                            <p className="text-sm sm:text-base text-[#475569] dark:text-[#94A3B8]">
                                Here&apos;s what&apos;s happening with your membership today.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                            <Badge variant="outline" className="border-[#2563EB] text-[#2563EB] text-xs sm:text-sm w-fit">
                                <Shield className="w-3 h-3 mr-1" />
                                <p>
                                    Member Since:{" "}
                                    {session?.user?.joinDate
                                        ? new Date(session.user.joinDate).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                        })
                                        : "N/A"}
                                </p>

                            </Badge>
                            <Button size="sm" className="text-xs sm:text-sm">
                                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" />
                                Calendar
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Upcoming Events */}
            <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                        Upcoming Events
                    </h3>
                    <Link href="/dashboard/events">
                        <Button variant="ghost" size="sm" className="gap-1 text-xs sm:text-sm">
                            View All
                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-3 sm:gap-4">
                    {fetchAllStatus == Status.LOADING ? (
                        [...Array(4)].map((_, i) => (
                            <EventCardSkeleton key={i} />
                        ))
                    ) : (
                        filteredEvents?.map((event) => (
                            <EventCard event={event} key={event.id} />
                        ))
                    )}
                </div>
            </div>

            {/* Recent Documents */}
            <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                        Recent Documents
                    </h3>
                    <Link href="/dashboard/documents">
                        <Button variant="ghost" size="sm" className="gap-1 text-xs sm:text-sm">
                            View All
                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                    </Link>
                </div>
                <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
                    <CardContent className="p-0">
                        {documents.slice(0, 3).map((doc) => (
                            <div key={doc.id} className="flex items-center justify-between p-3 sm:p-4 border-b border-[#E5E7EB] dark:border-[#1E293B] last:border-0">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#2563EB]/10 dark:bg-[#2563EB]/20 flex items-center justify-center">
                                        <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB] dark:text-[#3B82F6]" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="font-medium text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB] truncate">
                                            {doc.title}
                                        </div>
                                        <div className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">
                                            {doc.type} • {doc.uploadedDate}
                                        </div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default OverciewTabContent