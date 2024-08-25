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
		<footer className="m-4 flex flex-col items-center justify-between md:flex-row">
			<div className="flex flex-col items-center gap-2 text-muted-foreground md:flex-row">
				<div className="flex flex-row gap-2">
					<Link href="https://github.com/w11dcard" target="_blank" rel="noopener noreferrer">
						<Icon icon="simple-icons:github" className="icon h-6 w-6" />
					</Link>
					<Link href="https://www.linkedin.com/in/matheus-mortari-19rt/" target="_blank" rel="noopener noreferrer">
						<Icon icon="simple-icons:linkedin" className="icon h-6 w-6" />
					</Link>
				</div>
				<p>© 2024 Matheus Mortari. All rights reserved.</p>
			</div>

			<div className="flex flex-col items-center text-muted-foreground md:flex-row">
				<p className="text-center font-light italic md:text-left">"{quoteData.quote}"</p>
				<p className="text-center font-normal md:text-left">&nbsp;- {quoteData.author}</p>
			</div>
		</footer>
	)
}
