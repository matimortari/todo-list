"use client"

import { signIn, useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Login() {
	const { status } = useSession()

	if (status === "authenticated") {
		redirect("/")
	}

	return (
		<div className="flex flex-col items-center p-4">
			<div className="w-full max-w-md rounded p-4 shadow-md">
				<div className="flex flex-col items-center justify-center px-8 text-center">
					<strong className="p-2 text-5xl">Sign In</strong>
					<p className="mt-4 text-lg text-muted-foreground">Sign in with your preferred provider</p>
					<hr className="my-4 w-full border-muted" />
				</div>

				<div className="flex flex-col items-center justify-center gap-4 p-6">
					<button className="button w-full bg-github text-accent-foreground" onClick={() => signIn("github")}>
						Sign In With GitHub
					</button>
					<button className="button w-full bg-google text-accent-foreground" onClick={() => signIn("google")}>
						Sign In With Google
					</button>
				</div>
			</div>
		</div>
	)
}
