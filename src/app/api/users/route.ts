import { NextResponse } from 'next/server'
import { prisma } from '../../../../prisma/prisma-client'
import { IUser } from '@/lib/interfaces/user.interface'

export async function GET() {
	try {
		const users = await prisma.user.findMany()

		return NextResponse.json(users)
	} catch (err) {
		console.error(err)
		return NextResponse.json(JSON.stringify({ message: 'Internal server error' }), { status: 500 })
	}
}

export async function POST(request: Request) {
	try {
		const userData: IUser = await request.json()

		console.log(userData)

		const user = await prisma.user.create({
			data: {
				username: userData.username,
				email: userData.email,
				password: userData.password,
			},
		})

		return NextResponse.json({ user }, { status: 201 })
	} catch (err) {
		console.error(err)
		return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
	}
}
