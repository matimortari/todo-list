"use client"

import { createTodo } from "@/src/lib/actions"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function New() {
	const { data: session, status } = useSession()

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (!session?.user) {
			alert("You need to be logged in to create a new to-do.")
			return
		}

		const formData = new FormData(event.currentTarget)
		createTodo(formData)
	}

	return (
		<div className="px-20">
			<header className="flex items-center justify-between">
				<div className="mb-5">
					<strong className="text-2xl md:text-4xl">Create New To-Do</strong>
					<p className="mt-1 text-sm font-light md:text-lg">Max. 45 characters.</p>
				</div>
			</header>

			{status === "loading" ? (
				<p>Loading...</p>
			) : !session?.user ? (
				<p className="text-2xl font-light text-muted-foreground">Please sign in to create a new task.</p>
			) : (
				<form className="flex flex-col gap-2" onSubmit={handleSubmit} method="post">
					<input className="button bg-transparent md:max-w-4xl" type="text" name="title" maxLength={45} required />
					<div className="flex justify-end gap-2 px-8">
						<Link className="button md:ml-4" href="..">
							Cancel
						</Link>
						<button className="button md:ml-4" type="submit" disabled={!session?.user}>
							Create
						</button>
					</div>
				</form>
			)}
		</div>
	)
}
