import { NextResponse } from 'next/server'
import { prisma } from '../../../../../../prisma/prisma-client'

export async function GET(_req: Request, { params }: { params: { userId: string } }) {
	try {
		const userTodos = await prisma.todo.findMany({
			where: { userId: parseInt(params.userId) },
		})

		if (userTodos.length > 0) {
			return NextResponse.json(userTodos, { status: 200 })
		} else {
			return NextResponse.json({ message: `User with id ${params.userId} not found` }, { status: 404 })
		}
	} catch (err) {
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
	}
}
