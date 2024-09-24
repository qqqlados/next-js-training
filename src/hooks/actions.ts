'use server'

import { IUser } from '@/lib/interfaces/user.interface'
import { prisma } from '../../prisma/prisma-client'

export async function getCurrentUserId(userEmail: string | undefined) {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: userEmail,
			},
			select: {
				id: true,
			},
		})

		const userId = user?.id

		return { userId }
	} catch (e) {
		console.error(e)
	}
}

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

export async function isPostLiked(postId: string) {
	try {
		const isLiked = await prisma.likedPost.findFirst({
			where: {
				postId: postId,
			},
		})

		return { isLiked }
	} catch (e) {
		console.error(e)
	}
}

export async function isPostDisliked(postId: string) {
	try {
		const isDisliked = await prisma.dislikedPost.findFirst({
			where: {
				postId: postId,
			},
		})

		return { isDisliked }
	} catch (e) {
		console.error(e)
	}
}

export async function addLike(postId: string, userId: string) {
	try {
		const newLikedPost = await prisma.likedPost.create({
			data: {
				postId: postId,
				userId: userId,
			},
		})

		const data = await isPostDisliked(postId)

		await prisma.post.update({
			where: {
				id: postId,
			},
			data: {
				likes: { increment: 1 },
				likedPostId: newLikedPost?.id,
				...(data?.isDisliked?.id ? { dislikes: { decrement: 1 } } : null),
			},
		})
	} catch (e) {
		console.error(e)
	}
}

export async function removeLike(postId: string) {
	try {
		await prisma.likedPost.delete({
			where: {
				postId: postId,
			},
		})

		await prisma.post.update({
			where: {
				id: postId,
			},
			data: {
				likes: { decrement: 1 },
				likedPostId: null,
			},
		})
	} catch (e) {
		console.error(e)
	}
}

export async function addDislike(postId: string, userId: string) {
	try {
		const newDislikedPost = await prisma.dislikedPost.create({
			data: {
				postId: postId,
				userId: userId,
			},
		})

		const data = await isPostLiked(postId)

		await prisma.post.update({
			where: {
				id: postId,
			},
			data: {
				dislikes: { increment: 1 },
				dislikedPostId: newDislikedPost?.id,
				...(data?.isLiked?.id ? { likes: { decrement: 1 } } : null),
			},
		})
	} catch (e) {
		console.error(e)
	}
}

export async function removeDislike(postId: string) {
	try {
		await prisma.dislikedPost.delete({
			where: {
				postId: postId,
			},
		})

		await prisma.post.update({
			where: {
				id: postId,
			},
			data: {
				dislikes: { decrement: 1 },
				dislikedPostId: null,
			},
		})
	} catch (e) {
		console.error(e)
	}
}
