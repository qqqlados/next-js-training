'use server'

import { IUser } from '@/lib/interfaces/user.interface'
import { prisma } from '../../prisma/prisma-client'

export async function addUser(data: IUser) {
	try {
		await prisma.user.create({
			data: {
				email: data.email,
				username: data.username,
				password: data.password,
			},
		})
	} catch (e) {
		console.error(e)

		return { message: `Something happened. Try again later.` }
	}
}
