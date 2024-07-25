import { Todo } from "@prisma/client"

interface TodoItemProps {
	todo: Todo
	updateTodo: (id: string, complete: boolean) => Promise<void>
	deleteTodo: (id: string) => Promise<void>
}

export async function updateTodo(id: string, complete: boolean) {
	const res = await fetch(`/api/todos/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ complete }),
	})
	if (!res.ok) {
		throw new Error("Failed to update todo")
	}
}

export async function deleteTodo(id: string) {
	const res = await fetch(`/api/todos/${id}`, {
		method: "DELETE",
	})
	if (!res.ok) {
		throw new Error("Failed to delete todo")
	}
}

export default function TodoItem({ todo, updateTodo, deleteTodo }: TodoItemProps) {
	return (
		<li className="button flex max-w-4xl">
			<div className="flex items-center gap-2">
				<input
					type="checkbox"
					id={todo.id}
					checked={todo.complete}
					onChange={(e) => updateTodo(todo.id, e.target.checked)}
					className="checkbox h-6 w-6"
				/>
				<label htmlFor={todo.id}>{todo.title}</label>
			</div>
			<button onClick={() => deleteTodo(todo.id)} className="button-delete ml-auto">
				X
			</button>
		</li>
	)
}
