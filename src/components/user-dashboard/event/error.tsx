import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw } from 'lucide-react'
import React from 'react'

interface ErrorProps {
    error: string,
    handleRefresh: () => void
}

const Error = ({ error, handleRefresh }: ErrorProps) => {
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

export default Error