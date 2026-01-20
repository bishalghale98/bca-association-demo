import { Card } from "@/components/ui/card"

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

export default EventCardSkeleton