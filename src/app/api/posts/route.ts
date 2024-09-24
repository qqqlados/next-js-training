import { NextResponse } from 'next/server'
import { prisma } from '../../../../prisma/prisma-client'

export async function GET() {
	const posts = await prisma.post.findMany({
		orderBy: {
			likedPostId: 'asc',
		},
	})

	return NextResponse.json(posts)
}
