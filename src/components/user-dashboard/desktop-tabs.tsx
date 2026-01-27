'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

import EventTabContent from './desktopTabContent/events';
import OverciewTabContent from './desktopTabContent/overview';
import DocumentsTabContent from './desktopTabContent/documents';
import NotificationsTabContent from './desktopTabContent/notifications';
import AchievementsTabContent from './desktopTabContent/achievements';

interface DesktopTabsProps {
    activeTab: string
    setActiveTab: (value: string) => void
    documents: Document[]
    notifications: Notification[]
    unreadNotifications: number
    achievements: any[]
    markNotificationAsRead: any
}


const DesktopTabs = ({
    activeTab,
    setActiveTab,
    documents,
    notifications,
    unreadNotifications,
    achievements,
    markNotificationAsRead,
}: DesktopTabsProps) => {


    return (
        <div className="hidden lg:block">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
                <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 w-full">
                    <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
                    <TabsTrigger value="events" className="text-xs sm:text-sm">My Events</TabsTrigger>
                    <TabsTrigger value="documents" className="text-xs sm:text-sm">Documents</TabsTrigger>
                    <TabsTrigger value="notifications" className="text-xs sm:text-sm">Notifications</TabsTrigger>
                    <TabsTrigger value="achievements" className="text-xs sm:text-sm">Achievements</TabsTrigger>
                </TabsList>

                {/* Overview Tab Content */}
                <TabsContent value="overview" className="space-y-4 sm:space-y-6">
                    <OverciewTabContent documents={documents} />
                </TabsContent>

                {/* My Events Tab Content */}
                <TabsContent value="events" className="space-y-4 sm:space-y-6">
                    <EventTabContent />
                </TabsContent>

                {/* Documents Tab Content */}
                <TabsContent value="documents" className="space-y-4 sm:space-y-6">
                    <DocumentsTabContent documents={documents} />
                </TabsContent>

                {/* Notifications Tab Content */}
                <TabsContent value="notifications" className="space-y-4 sm:space-y-6">
                    <NotificationsTabContent
                        notifications={notifications}
                        markNotificationAsRead={markNotificationAsRead}
                        unreadNotifications={unreadNotifications}
                    />
                </TabsContent>

                {/* Achievements Tab Content */}
                <TabsContent value="achievements" className="space-y-4 sm:space-y-6">
                    <AchievementsTabContent achievements={achievements} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default DesktopTabs