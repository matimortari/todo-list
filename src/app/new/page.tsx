import Link from "next/link"

export default function New() {
	return (
		<div className="flex flex-col items-center p-4">
			<header className="">
				<strong className="text-4xl">Create New To-Do</strong>
			</header>

			<div className="">
				<p className="text-2xl font-light text-muted-foreground">Please sign in to create a new task.</p>
				<input type="text" className="button" />
			</div>

			<div className="flex">
				<button className="button">Create</button>
				<Link href="/" className="button">
					Cancel
				</Link>
			</div>
		</div>
	)
}
