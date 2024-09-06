import { NextResponse } from 'next/server'
import { prisma } from '../../../../prisma/prisma-client'

export async function GET() {
	const posts = await prisma.post.findMany()

	return NextResponse.json(posts)
}
