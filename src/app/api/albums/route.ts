import { NextResponse } from 'next/server'
import { prisma } from '../../../../prisma/prisma-client'

export async function GET() {
	const albums = await prisma.album.findMany()

	return NextResponse.json(albums)
}
