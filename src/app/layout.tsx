import Providers from "@/src/components/context/Providers"
import Footer from "@/src/components/Footer"
import Navbar from "@/src/components/Navbar"
import { authOptions } from "@/src/lib/auth"
import "@/src/styles/globals.css"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "My To-Do List",
	description: "A simple to-do list website to manage your tasks.",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions)

	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers session={session}>
					<Navbar />
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	)
}
