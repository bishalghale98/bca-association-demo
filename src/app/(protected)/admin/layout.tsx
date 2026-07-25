import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AdminDashboardLayout from '@/components/layout/admin-dashboard'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Create Next App with TypeScript, Tailwind CSS, NextAuth, Prisma, tRPC, and more.',
}

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<main className={inter.className}>
			<Suspense>
				<AdminDashboardLayout>
					{children}
				</AdminDashboardLayout>
			</Suspense>
		</main>
	)
}
