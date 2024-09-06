import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../prisma/prisma-client'

export async function GET(req: NextRequest) {
	const users = await prisma.user.findMany()

	console.log(req)

	return NextResponse.json(users)
}

export async function POST() {}
