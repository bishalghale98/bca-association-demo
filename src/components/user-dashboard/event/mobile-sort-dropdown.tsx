import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Filter } from 'lucide-react'
import React from 'react'


interface MobileSortDropdownProps {
    setSortBy: React.Dispatch<React.SetStateAction< 'date' | string>>
}

const MobileSortDropdown = ({ setSortBy }: MobileSortDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="sm:hidden rounded-full">
                    <Filter className="h-4 w-4 mr-2" />
                    Sort
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy('date')}>
                    Sort by Date
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('title')}>
                    Sort by Title
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default MobileSortDropdown