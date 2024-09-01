"use server"

import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "./auth"
import { db } from "./db"

interface Todo {
	id: string
	userId: string
	title: string
	complete: boolean
}

export async function readTodos(userId: string): Promise<Todo[]> {
	const session = await getServerSession(authOptions)
	if (!session?.user?.id || session.user.id !== userId) {
		throw new Error("Unauthorized access.")
	}
	const todos = await db.todo.findMany({
		where: { userId },
	})
	return todos
}

export async function createTodo(data: FormData) {
	const session = await getServerSession(authOptions)
	const title = data.get("title")?.valueOf()
	if (!session?.user?.id || !title || typeof title !== "string") {
		throw new Error("Unauthorized. Please sign in and enter a valid title.")
	}
	await db.todo.create({
		data: { title, userId: session.user.id },
	})
	redirect("/")
}

export async function updateTodo(userId: string, id: string, complete: boolean) {
	await db.todo.update({ where: { id }, data: { complete } })
	await readTodos(userId)
}

export async function deleteTodo(userId: string, id: string) {
	await db.todo.delete({ where: { id } })
	await readTodos(userId)
}
