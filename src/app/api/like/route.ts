import { NextResponse } from 'next/server'
import { prisma } from '../../../../prisma/prisma-client'
import { revalidateTag } from 'next/cache'

export async function POST(req: Request) {
	try {
		const { postId, userId } = await req.json()

		const targetUser = await prisma.user.findFirst({
			where: {
				id: userId,
			},
		})

		if (!targetUser) {
			return NextResponse.json({ success: false, message: 'Error finding user' }, { status: 500 })
		}

		await prisma.$transaction(async tx => {
			const newLikedPost = await tx.likedPost.create({
				data: {
					postId,
					userId,
				},
			})

			const isDisliked = await tx.dislikedPost.findFirst({
				where: {
					postId,
				},
			})

			if (isDisliked) {
				await tx.dislikedPost.delete({
					where: {
						postId,
					},
				})
			}

			await tx.post.update({
				where: {
					id: postId,
				},
				data: {
					likes: { increment: 1 },
					likedPostId: newLikedPost?.id,
					...(isDisliked ? { dislikes: { decrement: 1 } } : {}),
				},
			})
		})

		revalidateTag(`post-${postId}`)

		return NextResponse.json({ success: true, message: 'Like is successfully added.' }, { status: 200 })
	} catch (err) {
		console.log(err)
		return NextResponse.json({ success: false, message: 'Cannot remove like. Some network or server issue' }, { status: 500 })
	}
}

export async function DELETE(req: Request) {
	try {
		const { postId } = await req.json()

		if (!postId) {
			return NextResponse.json({ success: false, message: 'Post id was not provided!' }, { status: 400 })
		}

		await prisma.$transaction(async tx => {
			await tx.likedPost.delete({
				where: {
					postId,
				},
			})
			await tx.post.update({
				where: {
					id: postId,
				},
				data: {
					likes: { decrement: 1 },
					likedPostId: null,
				},
			})
		})

		revalidateTag(`post-${postId}`)

		return NextResponse.json({ success: true, message: 'Like is removed' }, { status: 200 })
	} catch (e) {
		console.error(e)
		return NextResponse.json({ success: false, message: 'Cannot remove like. Some network or server issue' }, { status: 500 })
	}
}
