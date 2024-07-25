import Link from "next/link"

export default function New() {
	return (
		<div className="flex flex-col p-4">
			<header className="mb-4 flex items-center justify-between">
				<strong className="text-4xl">Create New To-Do</strong>
			</header>

			<form action="">
				<input type="text" className="button" />
				<div className="flex justify-end gap-4">
					<Link href="/" className="button">
						Cancel
					</Link>
					<button className="button">Create</button>
				</div>
			</form>

			<div className="">
				<p className="text-2xl font-light text-muted-foreground">Please sign in to create a new task.</p>
			</div>
		</div>
	)
}
