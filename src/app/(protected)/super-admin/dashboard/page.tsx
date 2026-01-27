import { AdminUser } from "@/components/layout/super-admin-dashboard"
import { AdminList } from "@/components/super-admin/admin-list"
import { ApiUsageChart } from "@/components/super-admin/api-usage-chart"
import { RecentActivities, Activity as RecentActivity } from "@/components/super-admin/recent-activities"
import { SystemHealthChart } from "@/components/super-admin/system-health-chart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { UserRole } from "@/types/user/enums"
import { Activity, AlertCircle, ChevronRight, Cpu, Download, FileArchive, Settings, Shield, ShieldCheck, Users } from "lucide-react"
import { SystemMetric } from "@/components/super-admin/system-health-chart"

const DashboardContent = () => {
    const systemMetrics: SystemMetric[] = [
        { id: 'cpu', name: 'CPU Usage', value: 65, max: 100, unit: '%', status: 'healthy', trend: 'stable' },
        { id: 'memory', name: 'Memory', value: 78, max: 100, unit: '%', status: 'warning', trend: 'up' },
        { id: 'storage', name: 'Storage', value: 45, max: 100, unit: '%', status: 'healthy', trend: 'stable' },
        { id: 'network', name: 'Network', value: 92, max: 100, unit: 'Mbps', status: 'critical', trend: 'up' },
        { id: 'requests', name: 'Requests/sec', value: 1250, max: 2000, unit: '', status: 'healthy', trend: 'down' },
        { id: 'uptime', name: 'Uptime', value: 99.9, max: 100, unit: '%', status: 'healthy', trend: 'stable' },
    ]

    const recentAdmins: AdminUser[] = [
        { id: '1', name: 'John Doe', email: 'john@example.com', role: UserRole.ADMIN, lastActive: '2 minutes ago', status: 'active', permissions: ['full'] },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: UserRole.MEMBER, lastActive: '1 hour ago', status: 'active', permissions: ['content', 'users'] },
        { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: UserRole.ADMIN, lastActive: '5 hours ago', status: 'inactive', permissions: ['reports'] },
        { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: UserRole.ADMIN, lastActive: '1 day ago', status: 'suspended', permissions: ['content'] },
    ]

    const recentActivities: RecentActivity[] = [
        { id: 1, action: 'System backup created', user: 'System', time: '2 minutes ago', status: 'success' },
        { id: 2, action: 'New admin user added', user: 'John Doe', time: '15 minutes ago', status: 'success' },
        { id: 3, action: 'Security policy updated', user: 'System', time: '1 hour ago', status: 'warning' },
        { id: 4, action: 'Database optimization', user: 'System', time: '3 hours ago', status: 'success' },
        { id: 5, action: 'Failed login attempt', user: 'Unknown', time: '5 hours ago', status: 'error' },
    ]

    return (
        <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Admins</p>
                                <p className="text-2xl font-bold">24</p>
                            </div>
                            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
                                <ShieldCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                            <div className="text-xs text-green-600 flex items-center">
                                <ChevronRight className="h-3 w-3 rotate-90" />
                                +2 this week
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">System Health</p>
                                <p className="text-2xl font-bold">94%</p>
                            </div>
                            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                                <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                        <Progress value={94} className="mt-4 h-2" />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
                                <p className="text-2xl font-bold">156</p>
                            </div>
                            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <div className="mt-4 text-xs text-muted-foreground">
                            Across all admin panels
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">API Requests</p>
                                <p className="text-2xl font-bold">12.5K</p>
                            </div>
                            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900">
                                <Cpu className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                            </div>
                        </div>
                        <div className="mt-4 text-xs text-green-600 flex items-center">
                            <ChevronRight className="h-3 w-3 rotate-90" />
                            +15% from yesterday
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts and Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>System Health Overview</CardTitle>
                        <CardDescription>Real-time system performance metrics</CardDescription>
                    </CardHeader>
                    <CardContent >
                        <SystemHealthChart metrics={systemMetrics} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>API Usage & Rate Limits</CardTitle>
                        <CardDescription>API request patterns and limits</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ApiUsageChart />
                    </CardContent>
                </Card>
            </div>

            {/* Admin Management and Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Admin Users</CardTitle>
                            <CardDescription>Recently active administrators</CardDescription>
                        </div>
                        <Button size="sm" variant="outline">
                            <Users className="mr-2 h-4 w-4" />
                            Manage All
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <AdminList admins={recentAdmins} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent System Activities</CardTitle>
                        <CardDescription>Latest system events and actions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RecentActivities activities={recentActivities} />
                    </CardContent>
                </Card>
            </div>

            {/* System Controls */}
            <Card>
                <CardHeader>
                    <CardTitle>System Controls</CardTitle>
                    <CardDescription>Quick system management actions</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-muted/50">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium">Maintenance Mode</h4>
                                    <Switch />
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                    Enable to restrict access for maintenance
                                </p>
                                <Button size="sm" variant="outline" className="w-full">
                                    <Settings className="mr-2 h-3 w-3" />
                                    Configure
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-muted/50">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium">Backup Settings</h4>
                                    <FileArchive className="h-4 w-4" />
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                    Configure automatic backup schedule
                                </p>
                                <Button size="sm" variant="outline" className="w-full">
                                    <Download className="mr-2 h-3 w-3" />
                                    Backup Now
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-muted/50">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium">Security Scan</h4>
                                    <Shield className="h-4 w-4" />
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                    Run comprehensive security audit
                                </p>
                                <Button size="sm" variant="outline" className="w-full">
                                    <AlertCircle className="mr-2 h-3 w-3" />
                                    Start Scan
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}


export default DashboardContent