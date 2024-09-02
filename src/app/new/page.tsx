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
		<div className="h-screen p-4">
			<header className="mb-6 flex flex-col">
				<strong className="text-2xl md:text-4xl">Create New To-Do</strong>
				<p className="m-2 font-light text-muted-foreground md:text-lg">Max. 45 characters.</p>
			</header>

			{!session?.user ? (
				<p className="text-2xl font-light text-muted-foreground">Please sign in to create a new task.</p>
			) : (
				<form className="flex flex-col gap-2" onSubmit={handleSubmit} method="post">
					<input
						className="input-field justify-start border border-muted bg-card shadow-md md:max-w-4xl"
						type="text"
						name="title"
						maxLength={45}
						required
					/>

					<div className="flex gap-2 py-4">
						<Link className="button" href="..">
							Cancel
						</Link>
						<button className="button" type="submit" disabled={!session?.user}>
							Create
						</button>
					</div>
				</form>
			)}
		</div>
	)
}
