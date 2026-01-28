'use client'

import { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Loader2, Trash2 } from "lucide-react"

interface DeleteModalProps {
    /** Whether the modal is open */
    isOpen: boolean
    /** Function to close the modal */
    onClose: () => void
    /** Function to call when delete is confirmed */
    onConfirm: () => Promise<void> | void
    /** Display name of the item to delete */
    itemName: string
    /** Type of item (e.g., "user", "event", "post") */
    itemType?: string
    /** Custom title for the confirmation dialog */
    title?: string
    /** Custom description for the confirmation dialog */
    description?: string
    /** Text for the confirm button in dialog (default: "Delete") */
    confirmText?: string
    /** Text for the cancel button in dialog (default: "Cancel") */
    cancelText?: string
    /** Show loading state */
    isLoading?: boolean
    /** Callback when deletion is successful */
    onSuccess?: () => void

    confirmButtonCss?: string
    icon: boolean
}

export function DeleteModal({
    isOpen,
    onClose,
    onConfirm,
    itemName,
    itemType = "item",
    title,
    description,
    confirmText = "Delete",
    cancelText = "Cancel",
    isLoading = false,
    confirmButtonCss,
    onSuccess,
    icon = true,
}: DeleteModalProps) {
    const [isDeleting, setIsDeleting] = useState(false)

    const handleConfirm = async () => {
        setIsDeleting(true)
        try {
            await onConfirm()
            onClose()
            if (onSuccess) {
                onSuccess()
            }
        } finally {
            setIsDeleting(false)
        }
    }

    const actualTitle = title || `Delete ${itemType}?`
    const actualDescription = description ||
        `Are you sure you want to delete "${itemName}"? This action cannot be undone.`

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        {icon &&
                            <div className="h-6 w-6 rounded-full bg-destructive/10 flex items-center justify-center">
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </div>
                        }
                        {actualTitle}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground">
                        {actualDescription}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting || isLoading}>
                        {cancelText}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault()
                            handleConfirm()
                        }}
                        disabled={isDeleting || isLoading}
                        className={confirmButtonCss || "bg-destructive text-destructive-foreground hover:bg-destructive/90"}
                    >
                        {(isDeleting || isLoading) ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {confirmText}ing...
                            </>
                        ) : (
                            confirmText
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}