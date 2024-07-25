"use client"

import { useQuery } from "@tanstack/react-query"

const getMessage = async () => {
	const response = await fetch("/api/hello")
	if (!response.ok) throw new Error("Failed to fetch data")
	return response.json()
}

export default function Home() {
	const { data, refetch } = useQuery({
		queryKey: ["get-message"],
		queryFn: getMessage,
		enabled: false,
	})

	return (
		<div className="flex flex-col items-center p-4">
			<button className="button" onClick={() => refetch()}>
				Hello World!
			</button>
			{data?.message && <strong className="mt-4">{data.message}</strong>}
		</div>
	)
}
