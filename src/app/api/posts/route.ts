import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../prisma/prisma-client'

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const searchValue = searchParams.get('searchValue')

	try {
		if (searchValue) {
			const filteredPosts = await prisma.post.findMany({
				where: {
					OR: [
						{
							title: {
								contains: searchValue,
								mode: 'insensitive',
							},
						},
						{
							body: {
								contains: searchValue,
								mode: 'insensitive',
							},
						},
					],
				},
			})
			return NextResponse.json(filteredPosts)
		} else {
			const posts = await prisma.post.findMany({
				orderBy: {
					likes: 'desc',
				},
				include: {
					user: true,
				},
			})
			return NextResponse.json(posts)
		}
	} catch (err) {
		console.error(err)
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
	}
}
