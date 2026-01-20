import { Button } from "@/components/ui/button"
import { Grid3x3, List } from "lucide-react"

interface ViewToggleButtonsProps {
    viewMode: "grid" | "list"
    setViewMode: React.Dispatch<React.SetStateAction<"grid" | "list">>
}



const ViewToggleButtons = ({ viewMode, setViewMode }: ViewToggleButtonsProps) => {

    return (
        <div className="flex items-center gap-1 p-1 bg-muted/30 rounded-lg sm:hidden">
            <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 px-3 rounded-md"
            >
                <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 px-3 rounded-md"
            >
                <List className="h-4 w-4" />
            </Button>
        </div>
    )
}

export default ViewToggleButtons