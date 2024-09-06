import { NextResponse } from 'next/server'
import { prisma } from '../../../../../../prisma/prisma-client'

export async function GET(_req: Request, { params }: { params: { userId: string } }) {
	try {
		const userAlbums = await prisma.album.findMany({
			where: { userId: parseInt(params.userId) },
		})

		if (userAlbums.length > 0) {
			return NextResponse.json(userAlbums, { status: 200 })
		} else {
			return NextResponse.json({ message: `Albums by user with id ${params.userId} not found` })
		}
	} catch (err) {
		return NextResponse.json({ message: 'Internal server error' }, { status: 404 })
	}
}
