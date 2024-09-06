import { NextResponse } from 'next/server'
import { prisma } from '../../../../../../prisma/prisma-client'

export async function GET(_req: Request, { params }: { params: { albumId: string } }) {
	try {
		const photos = await prisma.photo.findMany({
			where: { albumId: parseInt(params.albumId) },
		})

		if (photos.length > 0) {
			return NextResponse.json(photos, { status: 200 })
		} else {
			return NextResponse.json({ message: `Photos by with album id ${params.albumId} not found` }, { status: 404 })
		}
	} catch (err) {
		return NextResponse.json({ message: 'Internal server error' }, { status: 404 })
	}
}
