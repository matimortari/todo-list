"use client"

import { Todo } from "@prisma/client"

interface TodoItemProps {
	todo: Todo
	updateTodo: (id: string, complete: boolean) => Promise<void>
	deleteTodo: (id: string) => Promise<void>
}

export default function TodoItem({ todo, updateTodo, deleteTodo }: TodoItemProps) {
	if (!todo) {
		return null
	}

	const truncateText = (text: string, maxLength: number) => {
		if (text.length > maxLength) {
			return text.substring(0, maxLength) + "..."
		}
		return text
	}

	return (
		<li className="button flex max-w-4xl">
			<div className="flex items-center gap-2">
				<input
					className="checkbox"
					type="checkbox"
					id={todo.id}
					checked={todo.complete}
					onChange={(e) => updateTodo(todo.id, e.target.checked)}
				/>
				<label
					className={`cursor-pointer font-medium ${todo.complete ? "text-muted-foreground line-through" : ""}`}
					htmlFor={todo.id}
				>
					{truncateText(todo.title, 45)}
				</label>
			</div>

			<button className="button-delete ml-auto" onClick={() => deleteTodo(todo.id)}>
				X
			</button>
		</li>
	)
}
