import { NextResponse } from 'next/server'
import { prisma } from '../../../../../prisma/prisma-client'

export async function GET(_req: Request, { params }: { params: { postId: string } }) {
	try {
		const posts = await prisma.post.findFirst({
			where: { id: params.postId },
		})

		if (posts) {
			return NextResponse.json(posts, { status: 200 })
		} else {
			return NextResponse.json({ message: `Posts by with id ${params.postId} not found` })
		}
	} catch (err) {
		return NextResponse.json({ message: 'Internal server error' }, { status: 404 })
	}
}
