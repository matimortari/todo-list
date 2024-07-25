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
		<div className="flex flex-col items-center p-4">
			<header className="">
				<strong className="text-4xl">My To-Do List</strong>
			</header>

			<div className="">
				<p className="text-2xl font-light text-muted-foreground">Hello! Please sign in to view and manage your taks.</p>
				<div className="">
					<TodoItem />
				</div>
			</div>

			<Link href="/new" className="button">
				New To-Do
			</Link>
		</div>
	)
}
