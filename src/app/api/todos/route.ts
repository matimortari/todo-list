import fs from "fs"
import { NextResponse } from "next/server"
import path from "path"

export async function GET() {
	const jsonDirectory = path.join(process.cwd(), "tests")
	const filePath = path.join(jsonDirectory, "mock.json")

	try {
		const fileContents = fs.readFileSync(filePath, "utf8")
		const data = JSON.parse(fileContents)

		return NextResponse.json(data)
	} catch (error) {
		console.error("Error reading JSON file:", error)
		return NextResponse.error()
	}
}
