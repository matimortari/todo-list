export default function TodoItem() {
	return (
		<li className="button flex max-w-4xl">
			<div className="flex items-center gap-2">
				<input type="checkbox" className="h-6 w-6 rounded" />
				<p className="text-lg">Todo</p>
			</div>

			<button className="">X</button>
		</li>
	)
}
