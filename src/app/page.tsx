"use client"

import TodoItem from "@/src/components/TodoItem"
import { deleteTodo, readTodos, updateTodo } from "@/src/lib/actions"
import { Todo } from "@prisma/client"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {
	const [todos, setTodos] = useState<Todo[]>([])
	const { data: session, status } = useSession()

	const fetchTodos = async () => {
		if (status === "loading" || !session || !session.user || !session.user.id) {
			return
		}
		try {
			const todosFromServer = await readTodos(session.user.id)
			setTodos(todosFromServer as Todo[])
		} catch (err) {
			console.error("Failed to fetch todos:", err)
		}
	}

	const handleUpdateTodo = async (id: string, complete: boolean) => {
		if (session && session.user && session.user.id) {
			await updateTodo(session.user.id, id, complete)
			setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, complete } : todo)))
		}
	}

	const handleDeleteTodo = async (id: string) => {
		if (session && session.user && session.user.id) {
			await deleteTodo(session.user.id, id)
			setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
		}
	}

	useEffect(() => {
		fetchTodos()
	}, [session, status])

	return (
		<>
			<div className="h-screen p-4">
				<header className="mb-6 flex items-center justify-between">
					<strong className="text-2xl md:text-4xl">My To-Do List</strong>
					<Link className="button md:ml-4" href="/new">
						New To-Do
					</Link>
				</header>

				{!session?.user ? (
					<p className="text-2xl font-light text-muted-foreground">
						Welcome! Please sign in to see and manage your tasks.
					</p>
				) : (
					<ul className="space-y-4">
						{todos.map((todo) => (
							<TodoItem
								key={todo.id}
								todo={todo}
								updateTodo={(id, complete) => handleUpdateTodo(id, complete)}
								deleteTodo={(id) => handleDeleteTodo(id)}
							/>
						))}
					</ul>
				)}
			</div>
		</>
	)
}
