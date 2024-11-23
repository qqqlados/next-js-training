import { getUserCredentials } from '@/hooks/actions'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import jwt from 'jsonwebtoken'

export const options: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'text',
					placeholder: 'your-cool-email',
				},
				password: {
					label: 'Password',
					type: 'password',
				},
			},
			async authorize(credentials) {
				const userIsPresent = await getUserCredentials(credentials?.email)

				if (!userIsPresent) {
					throw new Error('user_not_found')
				} else {
					const checkUserPassword = async () => {
						return credentials?.password === userIsPresent?.password
					}

					const isValidPassword = await checkUserPassword()

					if (!isValidPassword) {
						throw new Error('incorrect_password')
					}

					const user = { id: userIsPresent?.id, email: credentials?.email, password: credentials?.password }

					return user
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
				token.email = user.email
				token.token = jwt.sign({ id: user.id, email: user.email }, process.env.NEXTAUTH_SECRET!, { expiresIn: '12h' })
			}
			return token
		},
		async session({ session, token }) {
			//@ts-ignore
			session!.user!.id = token.id
			session.user!.email = token.email
			//@ts-ignore
			session.user!.token = token.token

			return session
		},
	},
	session: {
		strategy: 'jwt',
		maxAge: 60 * 60 * 12,
	},
	jwt: {
		secret: process.env.NEXTAUTH_SECRET,
	},
}
