"use client"

import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import TodoItem from "../components/TodoItem"

const getMessage = async () => {
	const response = await fetch("/api/hello")
	if (!response.ok) throw new Error("Failed to fetch data")
	return response.json()
}

export default function Home() {
	const { data, refetch } = useQuery({
		queryKey: ["get-message"],
		queryFn: getMessage,
		enabled: false,
	})

	return (
		<div className="flex flex-col p-4">
			<header className="mb-4 flex items-center justify-between">
				<strong className="text-4xl">My To-Do List</strong>
				<Link href="/new" className="button">
					New To-Do
				</Link>
			</header>

			<p className="text-2xl font-light text-muted-foreground">Hello! Please sign in to view and manage your taks.</p>

			<ul className="mt-4">
				<TodoItem />
			</ul>
		</div>
	)
}
