import Providers from "@/src/components/Providers"
import TopNav from "@/src/components/TopNav"
import { authOptions } from "@/src/lib/auth"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import "./globals.css"

export const metadata: Metadata = {
	title: "My To-Do List",
	description: "Next.js to-do list website",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions)

	return (
		<html lang="en">
			<body>
				<Providers session={session}>
					<TopNav />
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	)
}
