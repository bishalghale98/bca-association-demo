import UserDashboardLayout from '@/components/layout/user-dashboard'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })





export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<main className={inter.className}>
			<UserDashboardLayout >
				{children}
			</UserDashboardLayout>
		</main>
	)
}
