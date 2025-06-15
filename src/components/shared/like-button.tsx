'use client'

import { removeLike } from '@/services/likes-dislikes.service'
import { useLikeDislikeContext } from '@/lib/contexts/like-dislike-context'
import { IPost } from '@/lib/interfaces/post.interface'
import { useDebounceClickingLikes } from '@/lib/utils'
import { CloudHail, ThumbsUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { addLike } from '@/services/likes-dislikes.service'
import { toast } from 'sonner'

export function LikeButton({ userId, post }: { userId?: string; post: IPost }) {
	const [action, setAction] = useState<boolean | null>(null)
	const [error, setError] = useState<string | null>(null)

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
					const res = await addLike({ postId: post.id, userId: 'dksf' })

					if (res.error) {
						setError(res.message)
					}
				} else {
					const res = await removeLike(post.id)

					if (res.error) {
						setError(res.message)
					}
				}
			}
		},
		750
	)

	useEffect(() => {
		if (error) {
			toast.error(error)
		}
	}, [error])

	return (
		<span className='flex gap-1 items-center'>
			{likes}
			<button onClick={() => handleClick()} className='active:scale-90'>
				<ThumbsUp fill={isLiked ? '#e17158' : '#fff'} />
			</button>
		</span>
	)
}
