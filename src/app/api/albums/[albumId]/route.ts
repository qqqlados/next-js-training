import { NextResponse } from 'next/server'
import { prisma } from '../../../../../prisma/prisma-client'

export async function GET(_req: Request, { params }: { params: { albumId: string } }) {
	try {
		const albumById = await prisma.album.findFirst({
			where: { id: params.albumId },
		})

		if (albumById) {
			return NextResponse.json(albumById, { status: 200 })
		} else {
			return NextResponse.json({ message: `Album with id ${params.albumId} not found` })
		}
	} catch (err) {
		return NextResponse.json({ message: 'Internal server error' }, { status: 404 })
	}
}
