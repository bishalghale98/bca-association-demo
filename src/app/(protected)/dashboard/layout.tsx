import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'User dashboard',
	description: 'User dashboard with TypeScript, Tailwind CSS, NextAuth, Prisma, tRPC, and more.',
}

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<main className={inter.className}>{children}</main>
	)
}
