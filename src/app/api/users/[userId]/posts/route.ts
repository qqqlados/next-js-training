import { NextResponse } from 'next/server'
import { prisma } from '../../../../../../prisma/prisma-client'

export async function GET(_req: Request, { params }: { params: { userId: string } }) {
	try {
		const userPosts = await prisma.post.findMany({
			where: { userId: parseInt(params.userId) },
		})

		if (userPosts.length > 0) {
			return NextResponse.json(userPosts, { status: 200 })
		} else {
			return NextResponse.json({ message: `User with id ${params.userId} not found` }, { status: 404 })
		}
	} catch (err) {
		return NextResponse.json({ message: 'Internal server error' }, { status: 404 })
	}
}
