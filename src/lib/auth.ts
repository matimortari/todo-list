import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { DefaultSession, SessionStrategy } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { db } from "./db"

declare module "next-auth" {
	interface Session {
		user: DefaultSession["user"] & {
			id: string
		}
	}
}

export const authOptions = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID ?? "",
			clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
		}),
	],
	adapter: PrismaAdapter(db),
	session: {
		strategy: "database" as SessionStrategy,
	},
	callbacks: {
		session: ({ session, user }) => {
			session.user.id = user.id
			return session
		},
	},
}
