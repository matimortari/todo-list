"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"

export default function Home() {
	const { data: session } = useSession()

	return (
		<div className="flex flex-col p-4">
			<header className="mb-4 flex items-center justify-between">
				<strong className="text-4xl">My To-Do List</strong>
				<Link href="/new" className="button">
					New To-Do
				</Link>
			</header>

			{!session?.user ? (
				<p className="text-2xl font-light text-muted-foreground">Hello! Please sign in to view and manage your taks.</p>
			) : (
				<ul className="mt-4">Placeholder for todos</ul>
			)}
		</div>
	)
}
