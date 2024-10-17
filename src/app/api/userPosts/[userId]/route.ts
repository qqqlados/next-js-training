import { NextResponse } from 'next/server'
import { prisma } from '../../../../../prisma/prisma-client'
import { getCurrentUserId } from '@/hooks/actions'

export async function GET(_req: Request, { params }: { params: { userId: string } }) {
	try {
		if (!params.userId) {
			throw new Error('User id is required')
		}

		const posts = await prisma.post.findMany({
			orderBy: {
				likes: 'desc',
			},
			where: {
				userId: params?.userId,
			},
		})
		return NextResponse.json(posts)
	} catch (err) {
		console.error(err)
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
	}
}
