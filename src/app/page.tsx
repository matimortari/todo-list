"use client"

import { Todo } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import Link from "next/link"
import TodoItem, { deleteTodo, updateTodo } from "../components/TodoItem"

const fetchTodos = async () => {
	const res = await fetch("/api/todos")
	if (!res.ok) {
		throw new Error("Network response was not ok")
	}
	return res.json()
}

export const useTodos = () => {
	return useQuery({
		queryKey: ["todos"],
		queryFn: fetchTodos,
	})
}

export default function Home() {
	const { data: session } = useSession()
	const { data, isLoading, error } = useTodos()

	if (isLoading) return <p className="text-muted">Loading...</p>
	if (error) return <p className="text-destructive">Error loading todos</p>

	return (
		<div className="flex flex-col p-4">
			<header className="mb-4 flex items-center justify-between">
				<strong className="text-4xl">My To-Do List</strong>
				<Link href="/new" className="button">
					New To-Do
				</Link>
			</header>

			{!session?.user ? (
				<p className="text-2xl font-light text-muted-foreground">
					Hello! Please sign in to view and manage your tasks.
				</p>
			) : (
				<ul className="space-y-2">
					{data.todos.map((todo: Todo) => (
						<TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
					))}
				</ul>
			)}
		</div>
	)
}
