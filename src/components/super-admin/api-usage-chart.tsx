// app/components/admin/api-usage-chart.tsx
'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
    Bar,
    BarChart,
    Cell
} from 'recharts'
import {
    Cpu,
    Zap,
    Clock,
    AlertTriangle,
    TrendingUp,
    TrendingDown,
    BarChart3,
    RefreshCw,
    Download,
    Filter,
    Shield,
    Activity,
    Globe,
    Server
} from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

interface ApiEndpoint {
    id: string
    name: string
    path: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    requests: number
    successRate: number
    avgResponseTime: number
    rateLimit: number
}

interface ApiUsageChartProps {
    timeRange?: 'hour' | 'day' | 'week' | 'month'
}

const generateHourlyData = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i)
    return hours.map(hour => ({
        hour: `${hour}:00`,
        requests: Math.floor(Math.random() * 1000) + 500,
        errors: Math.floor(Math.random() * 50) + 10,
        responseTime: Math.floor(Math.random() * 200) + 50,
        bandwidth: Math.floor(Math.random() * 100) + 20,
    }))
}

const generateDailyData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    return days.map(day => ({
        day,
        requests: Math.floor(Math.random() * 5000) + 2000,
        errors: Math.floor(Math.random() * 200) + 50,
        responseTime: Math.floor(Math.random() * 300) + 100,
        bandwidth: Math.floor(Math.random() * 500) + 100,
    }))
}

const endpoints: ApiEndpoint[] = [
    { id: '1', name: 'User Authentication', path: '/api/auth/login', method: 'POST', requests: 12500, successRate: 99.8, avgResponseTime: 120, rateLimit: 1000 },
    { id: '2', name: 'Get User Profile', path: '/api/users/:id', method: 'GET', requests: 8500, successRate: 99.9, avgResponseTime: 80, rateLimit: 5000 },
    { id: '3', name: 'Create Post', path: '/api/posts', method: 'POST', requests: 3200, successRate: 99.5, avgResponseTime: 150, rateLimit: 1000 },
    { id: '4', name: 'Search Content', path: '/api/search', method: 'GET', requests: 15000, successRate: 100, avgResponseTime: 95, rateLimit: 10000 },
    { id: '5', name: 'Admin Dashboard', path: '/api/admin/stats', method: 'GET', requests: 2500, successRate: 99.9, avgResponseTime: 200, rateLimit: 100 },
]

const methodColors: Record<string, string> = {
    'GET': '#3b82f6',    // Blue
    'POST': '#10b981',   // Green
    'PUT': '#f59e0b',    // Amber
    'DELETE': '#ef4444', // Red
}

const getMethodColor = (method: string) => methodColors[method] || '#6b7280'

export function ApiUsageChart({ timeRange = 'day' }: ApiUsageChartProps) {
    const [selectedRange, setSelectedRange] = useState(timeRange)
    const [showErrors, setShowErrors] = useState(true)
    const [chartType, setChartType] = useState<'line' | 'bar' | 'area'>('area')

    const chartData = selectedRange === 'hour' ? generateHourlyData() : generateDailyData()
    const totalRequests = endpoints.reduce((sum, endpoint) => sum + endpoint.requests, 0)
    const avgSuccessRate = endpoints.reduce((sum, endpoint) => sum + endpoint.successRate, 0) / endpoints.length
    const avgResponseTime = endpoints.reduce((sum, endpoint) => sum + endpoint.avgResponseTime, 0) / endpoints.length

    const getChartComponent = () => {
        const commonProps = {
            data: chartData,
            margin: { top: 10, right: 30, left: 0, bottom: 0 }
        }

        switch (chartType) {
            case 'line':
                return (
                    <LineChart {...commonProps}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis
                            dataKey={selectedRange === 'hour' ? 'hour' : 'day'}
                            stroke="#9ca3af"
                            fontSize={12}
                        />
                        <YAxis stroke="#9ca3af" fontSize={12} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--background))',
                                borderColor: 'hsl(var(--border))',
                                borderRadius: '8px',
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="requests"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={false}
                        />
                        {showErrors && (
                            <Line
                                type="monotone"
                                dataKey="errors"
                                stroke="#ef4444"
                                strokeWidth={2}
                                dot={false}
                            />
                        )}
                    </LineChart>
                )

            case 'bar':
                return (
                    <BarChart {...commonProps}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis
                            dataKey={selectedRange === 'hour' ? 'hour' : 'day'}
                            stroke="#9ca3af"
                            fontSize={12}
                        />
                        <YAxis stroke="#9ca3af" fontSize={12} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--background))',
                                borderColor: 'hsl(var(--border))',
                                borderRadius: '8px',
                            }}
                        />
                        <Bar dataKey="requests" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                )

            case 'area':
            default:
                return (
                    <AreaChart {...commonProps}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis
                            dataKey={selectedRange === 'hour' ? 'hour' : 'day'}
                            stroke="#9ca3af"
                            fontSize={12}
                        />
                        <YAxis stroke="#9ca3af" fontSize={12} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--background))',
                                borderColor: 'hsl(var(--border))',
                                borderRadius: '8px',
                            }}
                        />
                        <defs>
                            <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="requests"
                            stroke="#3b82f6"
                            fillOpacity={1}
                            fill="url(#colorRequests)"
                        />
                    </AreaChart>
                )
        }
    }

    return (
        <div className="space-y-6">
            {/* Header with Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Cpu className="w-5 h-5" />
                        API Usage & Analytics
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Monitor API performance and rate limiting
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Select value={selectedRange} onValueChange={(value) => setSelectedRange(value as 'hour' | 'day' | 'week' | 'month')}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Time Range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="hour">Last 24 Hours</SelectItem>
                            <SelectItem value="day">Last 7 Days</SelectItem>
                            <SelectItem value="week">Last 4 Weeks</SelectItem>
                            <SelectItem value="month">Last 3 Months</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Requests</p>
                                <p className="text-2xl font-bold">{(totalRequests / 1000).toFixed(1)}K</p>
                            </div>
                            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                                <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <div className="mt-2 text-xs text-green-600 flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +12.5% from last period
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                                <p className="text-2xl font-bold">{avgSuccessRate.toFixed(1)}%</p>
                            </div>
                            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                                <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                        <Progress value={avgSuccessRate} className="mt-2 h-2" />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                                <p className="text-2xl font-bold">{avgResponseTime}ms</p>
                            </div>
                            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900">
                                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                            </div>
                        </div>
                        <div className="mt-2 text-xs text-green-600 flex items-center">
                            <TrendingDown className="h-3 w-3 mr-1" />
                            -8.2% improvement
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Active Endpoints</p>
                                <p className="text-2xl font-bold">{endpoints.length}</p>
                            </div>
                            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
                                <Server className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                            3 endpoints at high load
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Chart Section */}
            <Card>
                <CardContent className="p-6">
                    {/* Chart Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <span className="text-sm">Requests</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Switch
                                    checked={showErrors}
                                    onCheckedChange={setShowErrors}
                                />
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span className="text-sm">Errors</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant={chartType === 'area' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setChartType('area')}
                            >
                                <Activity className="w-4 h-4" />
                            </Button>
                            <Button
                                variant={chartType === 'line' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setChartType('line')}
                            >
                                <BarChart3 className="w-4 h-4" />
                            </Button>
                            <Button
                                variant={chartType === 'bar' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setChartType('bar')}
                            >
                                <Filter className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                                <Download className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            {getChartComponent()}
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Endpoints Table */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="font-semibold">API Endpoints</h4>
                    <Badge variant="outline" className="font-mono">
                        {totalRequests.toLocaleString()} total requests
                    </Badge>
                </div>

                <div className="space-y-3">
                    {endpoints.map((endpoint) => {
                        const usagePercentage = (endpoint.requests / endpoint.rateLimit) * 100
                        const isNearLimit = usagePercentage > 80

                        return (
                            <Card key={endpoint.id} className={`border-l-4 ${isNearLimit ? 'border-l-amber-500' : 'border-l-green-500'}`}>
                                <CardContent className="p-4">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge
                                                    style={{ backgroundColor: getMethodColor(endpoint.method) }}
                                                    className="text-white border-0"
                                                >
                                                    {endpoint.method}
                                                </Badge>
                                                <h5 className="font-medium truncate">{endpoint.name}</h5>
                                                {isNearLimit && (
                                                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground font-mono truncate">
                                                {endpoint.path}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div>
                                                <p className="text-xs text-muted-foreground">Requests</p>
                                                <p className="font-semibold">{endpoint.requests.toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Success</p>
                                                <p className="font-semibold text-green-600">{endpoint.successRate}%</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Response</p>
                                                <p className="font-semibold">{endpoint.avgResponseTime}ms</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Rate Limit</p>
                                                <div className="space-y-1">
                                                    <p className="font-semibold">{endpoint.rateLimit}/min</p>
                                                    <Progress
                                                        value={usagePercentage}
                                                        className={`h-1.5 ${isNearLimit ? 'bg-amber-500' : 'bg-green-500'}`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* Rate Limit Status */}
                <Card className="bg-muted/50">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Globe className="w-5 h-5 text-muted-foreground" />
                                <div>
                                    <h5 className="font-medium">Rate Limit Status</h5>
                                    <p className="text-sm text-muted-foreground">Current usage across all endpoints</p>
                                </div>
                            </div>
                            <Badge variant="outline" className="text-xs">
                                Normal Load
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}