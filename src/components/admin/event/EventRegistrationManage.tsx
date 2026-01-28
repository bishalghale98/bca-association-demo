"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { CheckCircle } from "lucide-react";


import { IEventRegistration, getRegistrationsByEventId, updateEventAttendance } from '@/store/event-registration/eventRegistrationSlice';
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Status } from '@/store/types';
import { useRouter } from "next/navigation";
import { DeleteModal } from "@/components/common/delete-confirmation";

const EventRegistrationManage = ({ eventId }: { eventId: string }) => {

    const dispatch = useAppDispatch();
    const { registrations, fetchRegistrationsStatus } = useAppSelector((store) => store.eventRegistration);
    const router = useRouter();
    const [editRegistration, setEditRegistration] = useState<IEventRegistration | null>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(getRegistrationsByEventId(eventId));
    }, [dispatch, eventId])


    const handleAttended = (registration: IEventRegistration) => {
        setEditRegistration(registration)
        setOpen(true)
    }

    const handleConfirmAttended = () => {
        dispatch(updateEventAttendance({ id: editRegistration?.id as string, attended: !editRegistration?.attended }))
        setOpen(false)
    }

    if (fetchRegistrationsStatus === Status.LOADING) return <p>Loading...</p>

    return (
        <div className="rounded-md border h-dvh">
            <div className="flex items-center justify-between p-4">
                <h2 className="text-lg font-semibold">Event Registrations</h2>
                <Button variant="outline" size="sm" onClick={() => router.back()}>
                    Back
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px] text-center">SN</TableHead>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Phone No</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* Row 1 */}
                    {registrations.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">No registrations found</TableCell>
                        </TableRow>
                    ) : (
                        registrations?.map((registration, index) => (
                            <TableRow key={registration.id}>
                                <TableCell className="text-center font-medium">{index + 1}</TableCell>
                                <TableCell className="font-medium">{registration.fullName}</TableCell>
                                <TableCell>{registration.phone}</TableCell>
                                <TableCell className="max-w-[300px] truncate">{registration.message}</TableCell>
                                <TableCell className={registration.attended ? "text-green-500" : "text-red-500"}>{registration.attended ? "Attended" : "Not Attended"}</TableCell>

                                <TableCell className="text-center">
                                    <button
                                        onClick={() => handleAttended(registration)}
                                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition
                                      bg-green-100 text-green-600 hover:bg-green-200`}
                                    >
                                        <>
                                            <CheckCircle className="w-4 h-4" />
                                        </>

                                    </button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}


                </TableBody>
            </Table>

            {open && (
                <DeleteModal
                    isOpen={open}
                    onClose={() => setOpen(false)}
                    onConfirm={() => handleConfirmAttended()}
                    itemName={editRegistration?.fullName as string}
                    itemType="Event"
                    confirmText={`${editRegistration?.attended ? "Not Attend" : "Attend"}`}
                    confirmButtonCss={`${editRegistration?.attended ? "bg-red-500 text-red-foreground hover:bg-red/90" : "bg-green-500 text-green-foreground hover:bg-green/90"}`}
                    icon={false}
                    title={`${editRegistration?.attended ? "Not Attended" : "Attend"}`}
                    description={`Are you sure you want to mark this registration as ${editRegistration?.attended ? "Attended" : "Not Attend"}?`}
                />
            )}


        </div>
    )
}

export default EventRegistrationManage