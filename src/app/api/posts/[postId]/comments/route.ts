import { NextResponse } from 'next/server'
import { prisma } from '../../../../../../prisma/prisma-client'

export async function GET(_req: Request, { params }: { params: { postId: string } }) {
	try {
		const postComments = await prisma.comment.findMany({
			where: { postId: parseInt(params.postId) },
		})

		if (postComments.length > 0) {
			return NextResponse.json(postComments, { status: 200 })
		} else {
			return NextResponse.json({ message: `Post with id ${params.postId} not found` }, { status: 404 })
		}
	} catch (err) {
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
	}
}
