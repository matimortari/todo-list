import { Icon } from "@iconify/react"
import Link from "next/link"

export default function Footer() {
	return (
		<footer className="mt-auto flex flex-row items-center justify-between text-muted-foreground">
			<div className="m-4 flex items-center gap-2">
				<Link href="https://github.com/w11dcard" target="_blank" rel="noopener noreferrer">
					<Icon icon="simple-icons:github" className="h-6 w-6" />
				</Link>
				<Link href="https://www.linkedin.com/in/matheus-mortari-19rt/" target="_blank" rel="noopener noreferrer">
					<Icon icon="simple-icons:linkedin" className="h-6 w-6" />
				</Link>

				<div className="ml-4 hidden md:flex">
					<p className="font-light">© 2024 Matheus Mortari. All rights reserved.</p>
				</div>
			</div>
		</footer>
	)
}
