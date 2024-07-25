export default function TodoItem() {
	return (
		<li className="button flex max-w-4xl">
			<div className="flex items-center gap-2">
				<input type="checkbox" className="checkbox h-6 w-6" />
				<p className="text-lg">Todo</p>
			</div>

			<button className="button-delete ml-auto">X</button>
		</li>
	)
}
