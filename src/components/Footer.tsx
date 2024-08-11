"use client"

import { Icon } from "@iconify/react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Footer() {
	const [quoteData, setQuoteData] = useState({ quote: "", author: "" })

	useEffect(() => {
		async function fetchQuotes() {
			const res = await fetch("/quotes.json")
			const quotes = await res.json()
			const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
			setQuoteData(randomQuote)
		}
		fetchQuotes()
	}, [])

	return (
		<footer className="mt-auto flex flex-col items-center justify-between p-6 text-muted-foreground md:flex-row">
			<div className="mb-4 flex items-center md:mb-0 md:mr-4">
				<Link href="https://github.com/w11dcard" target="_blank" rel="noopener noreferrer">
					<Icon icon="simple-icons:github" className="icon h-6 w-6" />
				</Link>
				<Link
					href="https://www.linkedin.com/in/matheus-mortari-19rt/"
					target="_blank"
					rel="noopener noreferrer"
					className="ml-2 md:ml-4"
				>
					<Icon icon="simple-icons:linkedin" className="icon h-6 w-6" />
				</Link>
				<div className="ml-4 hidden md:flex">
					<p className="font-light">© 2024 Matheus Mortari. All rights reserved.</p>
				</div>
			</div>

			<div className="flex flex-col items-center md:flex-row">
				<p className="mb-2 text-center font-light italic md:mb-0 md:text-left">"{quoteData.quote}"</p>
				<p className="text-center font-normal md:text-left">&nbsp;- {quoteData.author}</p>
			</div>
		</footer>
	)
}
