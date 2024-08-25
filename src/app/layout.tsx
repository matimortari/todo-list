import Providers from "@/src/components/Providers"
import TopNav from "@/src/components/TopNav"
import { authOptions } from "@/src/lib/auth"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { Inter } from "next/font/google"
import Footer from "../components/Footer"
import "./globals.css"

export const metadata: Metadata = {
	title: "My To-Do List",
	description: "To-do list website",
}

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions)

	return (
		<html lang="en" className={inter.className}>
			<body>
				<Providers session={session}>
					<TopNav />
					<main>{children}</main>
					<Footer />
				</Providers>
			</body>
		</html>
	)
}
