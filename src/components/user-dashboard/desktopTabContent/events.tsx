import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { getMyRegisteredEvents } from '@/store/event-registration/eventRegistrationSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Status } from '@/store/types'
import { formatDateTime } from '@/utils/formatDate'
import { Calendar } from 'lucide-react'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

const EventTabContent = () => {
    const dispatch = useAppDispatch()
    const { registrations, fetchMyStatus, error } = useAppSelector((store) => store.eventRegistration)




    useEffect(() => {
        dispatch(getMyRegisteredEvents())
    }, [dispatch])

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])




    return (
        <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
            <CardHeader>
                <CardTitle className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                    My Events
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-[#475569] dark:text-[#94A3B8]">
                    Track all your registered and attended events
                </CardDescription>
            </CardHeader>


            {fetchMyStatus == Status.LOADING ? (
                [...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg border border-[#E5E7EB] dark:border-[#1E293B]">
                        <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-40" />
                                <Skeleton className="h-4 w-16 rounded-full" />
                            </div>

                            <div className="flex gap-4">
                                <Skeleton className="h-3 w-32" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                        </div>

                        <div className="flex gap-2 mt-2 sm:mt-0">
                            <Skeleton className="h-8 w-20 rounded-md" />
                        </div>
                    </div>
                ))
            ) : (
                <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                        {registrations.map((registrations) => (
                            <div key={registrations.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg border border-[#E5E7EB] dark:border-[#1E293B]">
                                <div className="space-y-1.5 sm:space-y-2 flex-1">
                                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                        <h4 className="font-bold text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB]">
                                            {registrations.event.title}
                                        </h4>
                                        <Badge variant="outline" className="border-[#2563EB] text-[#2563EB] text-xs">
                                            {registrations.event.type}
                                        </Badge>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                            {registrations.event.eventDate ? formatDateTime(registrations.event.eventDate).fullDateTime : `${formatDateTime(registrations.event.startDate!).fullDateTime} - ${formatDateTime(registrations.event.endDate!).fullDateTime}`}
                                        </div>
                                        <div className="flex items-center gap-1">

                                            {registrations.attended ? 'Attended' : 'Registered'}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-0">
                                    {/* {event.certificateUrl && (
                                                <Link href={event.certificateUrl}>
                                                    <Button variant="outline" size="sm" className="gap-1 text-xs">
                                                        <Download className="w-3.5 h-3.5" />
                                                        Certificate
                                                    </Button>
                                                </Link>
                                            )} */}
                                    {/* <Button variant="ghost" size="sm" className="gap-1 text-xs">
                                                Details
                                                <ChevronRight className="w-3.5 h-3.5" />
                                            </Button> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            )}


        </Card>
    )
}

export default EventTabContent