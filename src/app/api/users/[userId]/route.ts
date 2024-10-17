import { IUser } from '@/lib/interfaces/user.interface'
import { prisma } from '../../../../../prisma/prisma-client'
import { NextResponse } from 'next/server'

export async function GET(_req: Request, { params }: { params: { userId: string } }) {
	try {
		const userById = await prisma.user.findFirst({
			where: { id: params.userId },
		})
		if (userById) {
			return NextResponse.json(userById)
		} else {
			return NextResponse.json({ message: 'User not found' }, { status: 404 })
		}
	} catch (err) {
		console.error(err)
		return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
	}
}
