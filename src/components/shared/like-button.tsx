'use client'

import { addLike, removeLike } from '@/hooks/actions'
import { useLikeDislikeContext } from '@/lib/contexts/like-dislike-context'
import { IPost } from '@/lib/interfaces/post.interface'
import { useDebounceClickingLikes } from '@/lib/utils'
import { ThumbsUp } from 'lucide-react'
import { useState } from 'react'

export function LikeButton({ userId, post }: { userId?: string; post: IPost }) {
	const [action, setAction] = useState<boolean | null>(null)

	const { isLiked, toggleLike, likes, isInitiallyLiked } = useLikeDislikeContext()

	async function handleClick() {
		setAction(prev => (prev === null ? true : !prev))

		toggleLike()
	}

	useDebounceClickingLikes(
		action,
		async () => {
			if (isLiked !== isInitiallyLiked) {
				if (isLiked) {
					await addLike(post.id, userId!)
				} else {
					await removeLike(post.id)
				}
			}
		},
		1500
	)

	return (
		<span className='flex gap-1 items-center'>
			{likes}
			<button onClick={() => handleClick()} className='active:scale-90'>
				<ThumbsUp fill={isLiked ? '#e17158' : '#fff'} />
			</button>
		</span>
	)
}
