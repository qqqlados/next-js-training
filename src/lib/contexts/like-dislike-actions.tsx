'use client'

import { DislikeButton, LikeButton } from '@/components/shared'
import { LikeDislikeProvider } from './like-dislike-context'
import { IPost } from '../interfaces/post.interface'

export default function LikeDislikeActions({
	userEmail,
	post,
	isLikeActive,
	isDislikeActive,
}: {
	userEmail?: string
	post: IPost
	isLikeActive?: boolean
	isDislikeActive?: boolean
}) {
	return (
		<LikeDislikeProvider
			isInitiallyLiked={isLikeActive}
			isInitiallyDisliked={isDislikeActive}
			likesCount={post?.likes}
			dislikesCount={post?.dislikes}
		>
			<div className='flex items-center gap-3'>
				<LikeButton userEmail={userEmail} post={post} />

				<DislikeButton userEmail={userEmail} post={post} />
			</div>
		</LikeDislikeProvider>
	)
}
