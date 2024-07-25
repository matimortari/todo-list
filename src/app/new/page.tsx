"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"

export default function New() {
	const { data: session } = useSession()

	return (
		<div className="flex flex-col p-4">
			<header className="mb-4 flex items-center justify-between">
				<strong className="text-4xl">Create New To-Do</strong>
			</header>

			{!session?.user ? (
				<p className="text-2xl font-light text-muted-foreground">Please sign in to create a new task.</p>
			) : (
				<form action="">
					<input type="text" className="button" />
					<div className="flex justify-end gap-4">
						<Link href="/" className="button">
							Cancel
						</Link>
						<button className="button">Create</button>
					</div>
				</form>
			)}
		</div>
	)
}
