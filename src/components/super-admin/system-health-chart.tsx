// app/components/admin/system-health-chart.tsx
'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
    Activity,
    Cpu,
    Database,
    Globe,
    HardDrive,
    Zap,
    AlertTriangle,
    CheckCircle,
    XCircle
} from 'lucide-react'

export interface SystemMetric {
    id: string
    name: string
    value: number
    max: number
    unit: string
    status: 'healthy' | 'warning' | 'critical'
    trend: 'up' | 'down' | 'stable'
}

interface SystemHealthChartProps {
    metrics?: SystemMetric[]
}

const defaultMetrics: SystemMetric[] = [
    { id: 'cpu', name: 'CPU Usage', value: 65, max: 100, unit: '%', status: 'healthy', trend: 'stable' },
    { id: 'memory', name: 'Memory', value: 78, max: 100, unit: '%', status: 'warning', trend: 'up' },
    { id: 'storage', name: 'Storage', value: 45, max: 100, unit: '%', status: 'healthy', trend: 'stable' },
    { id: 'network', name: 'Network', value: 92, max: 100, unit: 'Mbps', status: 'critical', trend: 'up' },
    { id: 'requests', name: 'Requests/sec', value: 1250, max: 2000, unit: '', status: 'healthy', trend: 'down' },
    { id: 'uptime', name: 'Uptime', value: 99.9, max: 100, unit: '%', status: 'healthy', trend: 'stable' },
]

const getMetricIcon = (id: string) => {
    switch (id) {
        case 'cpu': return <Cpu className="w-4 h-4" />
        case 'memory': return <Database className="w-4 h-4" />
        case 'storage': return <HardDrive className="w-4 h-4" />
        case 'network': return <Globe className="w-4 h-4" />
        case 'requests': return <Zap className="w-4 h-4" />
        case 'uptime': return <Activity className="w-4 h-4" />
        default: return <Activity className="w-4 h-4" />
    }
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'healthy': return 'bg-green-500'
        case 'warning': return 'bg-amber-500'
        case 'critical': return 'bg-red-500'
        default: return 'bg-gray-500'
    }
}

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'healthy': return <CheckCircle className="w-4 h-4 text-green-500" />
        case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-500" />
        case 'critical': return <XCircle className="w-4 h-4 text-red-500" />
        default: return <CheckCircle className="w-4 h-4 text-gray-500" />
    }
}

const getTrendIcon = (trend: string) => {
    switch (trend) {
        case 'up': return '↗'
        case 'down': return '↘'
        case 'stable': return '→'
        default: return '→'
    }
}

export function SystemHealthChart({ metrics = defaultMetrics }: SystemHealthChartProps) {
    const overallHealth = Math.round(
        metrics.reduce((acc, metric) => {
            const weight = metric.id === 'uptime' ? 2 : 1 // Uptime is more important
            return acc + (metric.value / metric.max * 100 * weight)
        }, 0) / (metrics.length + 1) // +1 because uptime has weight 2
    )

    return (
        <div className="space-y-6">
            {/* Overall Health Score */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold">Overall System Health</h3>
                    <p className="text-sm text-muted-foreground">Real-time performance metrics</p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold">{overallHealth}%</div>
                    <div className="text-sm text-muted-foreground">Health Score</div>
                </div>
            </div>

            {/* Health Progress */}
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span>System Performance</span>
                    <span>{overallHealth}%</span>
                </div>
                <Progress
                    value={overallHealth}
                    className={`h-3 ${overallHealth > 80 ? 'bg-green-500/20' : overallHealth > 60 ? 'bg-amber-500/20' : 'bg-red-500/20'}`}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Poor</span>
                    <span>Fair</span>
                    <span>Good</span>
                    <span>Excellent</span>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {metrics.map((metric) => (
                    <Card key={metric.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className={`p-2 rounded-lg ${metric.status === 'healthy' ? 'bg-green-100 dark:bg-green-900/30' : metric.status === 'warning' ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                                        {getMetricIcon(metric.id)}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-sm">{metric.name}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className={`w-2 h-2 rounded-full ${getStatusColor(metric.status)}`}></div>
                                            <span className="text-xs capitalize text-muted-foreground">{metric.status}</span>
                                        </div>
                                    </div>
                                </div>
                                {getStatusIcon(metric.status)}
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Current</span>
                                    <span className="font-semibold">
                                        {metric.value}
                                        {metric.unit && <span className="text-xs ml-1">{metric.unit}</span>}
                                    </span>
                                </div>

                                <Progress
                                    value={(metric.value / metric.max) * 100}
                                    className={`h-2 ${metric.status === 'healthy' ? 'bg-green-500' : metric.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'}`}
                                />

                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-muted-foreground">
                                        Max: {metric.max}{metric.unit}
                                    </span>
                                    <Badge variant="outline" className="text-xs">
                                        <span className={`${metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-blue-600' : 'text-gray-600'}`}>
                                            {getTrendIcon(metric.trend)}
                                        </span>
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>Healthy (&gt;80%)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span>Warning (60-80%)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>Critical (&lt;60%)</span>
                </div>
            </div>
        </div>
    )
}