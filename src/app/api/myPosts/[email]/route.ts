import { NextResponse } from 'next/server'
import { prisma } from '../../../../../prisma/prisma-client'
import { getCurrentUserId } from '@/hooks/actions'

export async function GET(_req: Request, { params }: { params: { email: string } }) {
	try {
		if (!params.email) {
			throw new Error('User email is required')
		}

		const userId = await getCurrentUserId(params.email!)

		const posts = await prisma.post.findMany({
			orderBy: {
				likes: 'desc',
			},
			where: {
				userId,
			},
		})
		return NextResponse.json(posts)
	} catch (err) {
		console.error(err)
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
	}
}
