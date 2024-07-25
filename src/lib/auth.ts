import { prisma } from "@/src/lib/db"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { DefaultSession, SessionStrategy } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string
		} & DefaultSession["user"]
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id: string
	}
}

export const authOptions = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID ?? "",
			clientSecret: process.env.GITHUB_SECRET ?? "",
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID ?? "",
			clientSecret: process.env.GOOGLE_SECRET ?? "",
		}),
	],
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "database" as SessionStrategy,
	},
	callbacks: {
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id as string
				session.user.name = token.name as string
				session.user.email = token.email as string
				session.user.image = token.picture as string
			}
			return session
		},

		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
			} else {
				const dbUser = await prisma.user.findFirst({
					where: { email: token.email },
				})
				if (dbUser) {
					token.id = dbUser.id
				}
			}
			return token
		},
	},
}
