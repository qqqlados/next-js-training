'use server'

import { prisma } from '../../prisma/prisma-client'
import { revalidateTag } from 'next/cache'
import { RegistrationFormValues } from '@/lib/interfaces/form.interface'
import { API_URL } from '@/app/config'
import { IPost } from '@/lib/interfaces/post.interface'

export async function getUsers() {
	try {
		const users = await prisma.user.findMany()

		return users
	} catch (err) {
		console.error(err)
	}
}

export async function getUserCredentials({ email }: { email?: string }) {
	try {
		const userIsPresent = await prisma.user.findUnique({
			where: {
				email,
			},
			select: {
				email: true,
				password: true,
			},
		})

		return userIsPresent
	} catch (err) {
		// return { message: 'Network error' }
		console.error(err)
	}
}

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

		return userId
	} catch (e) {
		console.error(e)
	}
}

export async function getUsernameByPostId(userId?: string) {
	try {
		const user = await prisma.user.findFirst({
			where: { id: userId },
		})

		return user
	} catch (e) {
		console.error(e)
	}
}

export async function getPostsInModal() {
	try {
		const posts: IPost[] = await fetch(`${API_URL}/posts`).then(res => res.json())

		return { posts: posts || [] }
	} catch (err) {
		console.error(err)

		return { posts: [] }
	}
}

export async function addUser(data: RegistrationFormValues) {
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

export async function isPostLiked(postId: string | undefined) {
	try {
		const isLiked = await prisma.likedPost.findFirst({
			where: {
				postId: postId,
			},
		})

		return isLiked ? isLiked.id : null
	} catch (e) {
		console.error(e)
	}
}

export async function isPostDisliked(postId: string | undefined) {
	try {
		const isDisliked = await prisma.dislikedPost.findFirst({
			where: {
				postId: postId,
			},
		})

		return isDisliked ? isDisliked.id : null
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

		if (data) {
			await prisma.dislikedPost.delete({
				where: {
					postId: postId,
				},
			})
		}

		await prisma.post.update({
			where: {
				id: postId,
			},
			data: {
				likes: { increment: 1 },
				likedPostId: newLikedPost?.id,
				...(data ? { dislikes: { decrement: 1 } } : null),
			},
		})

		revalidateTag(`post-${postId}`)
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

		revalidateTag(`post-${postId}`)
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

		if (data) {
			await prisma.likedPost.delete({
				where: {
					postId: postId,
				},
			})
		}

		await prisma.post.update({
			where: {
				id: postId,
			},
			data: {
				dislikes: { increment: 1 },
				dislikedPostId: newDislikedPost?.id,
				...(data ? { likes: { decrement: 1 } } : null),
			},
		})

		revalidateTag(`post-${postId}`)
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

		revalidateTag(`post-${postId}`)
	} catch (e) {
		console.error(e)
	}
}

export async function addPost({ userId, title, body }: { userId: string; title: string; body: string }) {
	try {
		const createdPost = await prisma.post.create({
			data: {
				userId: userId,
				title: title,
				body: body,
				tags: [],
			},
		})

		revalidateTag('posts')

		return createdPost
	} catch (e) {
		console.error(e)
	}
}

export async function updatePost({ postId, userId, title, body }: { postId?: string; userId?: string; title: string; body: string }) {
	try {
		const updatedPost = await prisma.post.update({
			where: {
				id: postId,
			},
			data: {
				userId: userId,
				title: title,
				body: body,
				tags: [],
			},
		})

		revalidateTag(`post-${postId}`)

		return updatedPost
	} catch (e) {
		console.error(e)
	}
}

export async function deletePost(postId?: string) {
	try {
		await prisma.post.delete({
			where: {
				id: postId,
			},
		})

		revalidateTag('posts')
	} catch (err) {
		console.error(err)
	}
}
