// app/components/admin/admin-list.tsx
'use client'

import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Users,
    Shield,
    ShieldCheck,
    ShieldAlert,
    MoreVertical,
    Mail,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    Filter,
    Search,
    Plus,
    UserPlus,
    Key
} from 'lucide-react'
import { UserRole } from '@/types/user/enums'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface AdminUser {
    id: string
    name: string
    email: string
    role: UserRole
    lastActive: string
    status: 'active' | 'inactive' | 'suspended'
    permissions: string[]
    avatar?: string
}

interface AdminListProps {
    admins?: AdminUser[]
}

const defaultAdmins: AdminUser[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: UserRole.ADMIN,
        lastActive: '2 minutes ago',
        status: 'active',
        permissions: ['full'],
        avatar: '/avatars/john.jpg'
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: UserRole.MEMBER,
        lastActive: '1 hour ago',
        status: 'active',
        permissions: ['content', 'users'],
        avatar: '/avatars/jane.jpg'
    },
    {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        role: UserRole.ADMIN,
        lastActive: '5 hours ago',
        status: 'inactive',
        permissions: ['reports'],
        avatar: '/avatars/bob.jpg'
    },
    {
        id: '4',
        name: 'Alice Brown',
        email: 'alice@example.com',
        role: UserRole.ADMIN,
        lastActive: '1 day ago',
        status: 'suspended',
        permissions: ['content'],
        avatar: '/avatars/alice.jpg'
    },
    {
        id: '5',
        name: 'Charlie Wilson',
        email: 'charlie@example.com',
        role: UserRole.SUPER_ADMIN,
        lastActive: 'Just now',
        status: 'active',
        permissions: ['full', 'system'],
        avatar: '/avatars/charlie.jpg'
    },
]

const getRoleIcon = (role: UserRole) => {
    switch (role) {
        case UserRole.SUPER_ADMIN: return <ShieldCheck className="w-4 h-4 text-purple-600" />
        case UserRole.ADMIN: return <Shield className="w-4 h-4 text-blue-600" />
        case UserRole.MEMBER: return <ShieldAlert className="w-4 h-4 text-green-600" />
        default: return <Users className="w-4 h-4" />
    }
}

const getRoleBadge = (role: UserRole) => {
    switch (role) {
        case UserRole.SUPER_ADMIN: return (
            <Badge className="bg-purple-600 text-white border-0">SUPER ADMIN</Badge>
        )
        case UserRole.ADMIN: return <Badge variant="secondary">ADMIN</Badge>
        case UserRole.MEMBER: return <Badge variant="outline">MEMBER</Badge>
        default: return <Badge variant="outline">USER</Badge>
    }
}

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'active': return <CheckCircle className="w-3 h-3 text-green-500" />
        case 'inactive': return <AlertCircle className="w-3 h-3 text-amber-500" />
        case 'suspended': return <XCircle className="w-3 h-3 text-red-500" />
        default: return <AlertCircle className="w-3 h-3 text-gray-500" />
    }
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'active': return 'bg-green-500'
        case 'inactive': return 'bg-amber-500'
        case 'suspended': return 'bg-red-500'
        default: return 'bg-gray-500'
    }
}

export function AdminList({ admins = defaultAdmins }: AdminListProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [filterRole, setFilterRole] = useState<string>('all')
    const [filterStatus, setFilterStatus] = useState<string>('all')

    const filteredAdmins = admins.filter(admin => {
        const matchesSearch =
            admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            admin.email.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesRole = filterRole === 'all' || admin.role === filterRole
        const matchesStatus = filterStatus === 'all' || admin.status === filterStatus

        return matchesSearch && matchesRole && matchesStatus
    })

    const stats = {
        total: admins.length,
        active: admins.filter(a => a.status === 'active').length,
        superAdmins: admins.filter(a => a.role === UserRole.SUPER_ADMIN).length,
        online: admins.filter(a => a.lastActive.includes('minute') || a.lastActive.includes('Just now')).length,
    }

    return (
        <div className="space-y-4">
            {/* Header with Stats */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Admin Users
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Manage administrator access and permissions
                    </p>
                </div>

                <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Admin
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold">{stats.total}</p>
                            <p className="text-xs text-muted-foreground">Total Admins</p>
                        </div>
                        <Users className="w-4 h-4 text-muted-foreground" />
                    </div>
                </div>

                <div className="bg-green-500/10 p-3 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                            <p className="text-xs text-green-600/70">Active</p>
                        </div>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                </div>

                <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-purple-600">{stats.superAdmins}</p>
                            <p className="text-xs text-purple-600/70">Super Admins</p>
                        </div>
                        <ShieldCheck className="w-4 h-4 text-purple-600" />
                    </div>
                </div>

                <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-blue-600">{stats.online}</p>
                            <p className="text-xs text-blue-600/70">Online Now</p>
                        </div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search admins by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>

                <div className="flex gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Filter className="w-4 h-4 mr-2" />
                                Role: {filterRole === 'all' ? 'All' : filterRole}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setFilterRole('all')}>All Roles</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setFilterRole(UserRole.SUPER_ADMIN)}>
                                <ShieldCheck className="w-4 h-4 mr-2" />
                                Super Admin
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilterRole(UserRole.ADMIN)}>
                                <Shield className="w-4 h-4 mr-2" />
                                Admin
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilterRole(UserRole.MEMBER)}>
                                <ShieldAlert className="w-4 h-4 mr-2" />
                                Moderator
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Filter className="w-4 h-4 mr-2" />
                                Status: {filterStatus === 'all' ? 'All' : filterStatus}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setFilterStatus('all')}>All Status</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setFilterStatus('active')}>
                                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                Active
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilterStatus('inactive')}>
                                <AlertCircle className="w-4 h-4 mr-2 text-amber-500" />
                                Inactive
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilterStatus('suspended')}>
                                <XCircle className="w-4 h-4 mr-2 text-red-500" />
                                Suspended
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Admin List */}
            <div className="space-y-2">
                {filteredAdmins.map((admin) => (
                    <div
                        key={admin.id}
                        className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors group"
                    >
                        <div className="flex items-center gap-3 flex-1">
                            {/* Avatar with status */}
                            <div className="relative">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={admin.avatar} />
                                    <AvatarFallback>
                                        {admin.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${getStatusColor(admin.status)} rounded-full border-2 border-background`}></div>
                            </div>

                            {/* Admin Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-medium truncate">{admin.name}</h4>
                                    {getRoleBadge(admin.role)}
                                </div>

                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1 truncate">
                                        <Mail className="w-3 h-3" />
                                        <span className="truncate">{admin.email}</span>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        <span>{admin.lastActive}</span>
                                    </div>
                                </div>

                                {/* Permissions */}
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {admin.permissions.map((perm, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                            {perm}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <Key className="w-4 h-4 mr-2" />
                                        Edit Permissions
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Mail className="w-4 h-4 mr-2" />
                                        Send Message
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    {admin.status === 'active' ? (
                                        <DropdownMenuItem className="text-amber-600">
                                            <AlertCircle className="w-4 h-4 mr-2" />
                                            Suspend Admin
                                        </DropdownMenuItem>
                                    ) : (
                                        <DropdownMenuItem className="text-green-600">
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Activate Admin
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Remove Admin
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredAdmins.length === 0 && (
                <div className="text-center py-8 border rounded-lg">
                    <Users className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                    <h4 className="font-medium">No admins found</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                        Try adjusting your search or filters
                    </p>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setSearchQuery('')
                            setFilterRole('all')
                            setFilterStatus('all')
                        }}
                    >
                        Clear Filters
                    </Button>
                </div>
            )}

            {/* Footer Stats */}
            <div className="text-xs text-muted-foreground flex items-center justify-between pt-2 border-t">
                <div>
                    Showing {filteredAdmins.length} of {admins.length} admins
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Active</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span>Inactive</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>Suspended</span>
                    </div>
                </div>
            </div>
        </div>
    )
}