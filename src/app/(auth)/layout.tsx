import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/common/nav-bar'
import ButtonNav from '@/components/common/button-nav'
import Footer from '@/components/common/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Auth pages',
	description: 'Create Next App with TypeScript, Tailwind CSS, NextAuth, Prisma, tRPC, and more.',
}

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<body className={inter.className}>
			<Navbar />

			{children}
			<ButtonNav />
			<Footer />
		</body>
	)
}
