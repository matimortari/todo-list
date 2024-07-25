import { Todo } from "@prisma/client"

interface TodoItemProps {
	todo: Todo
	updateTodo: (id: string, complete: boolean) => Promise<void>
	deleteTodo: (id: string) => Promise<void>
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
