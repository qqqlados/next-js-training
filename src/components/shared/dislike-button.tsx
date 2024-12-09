'use client'

import { addDislike, removeDislike } from '@/hooks/actions'
import { useLikeDislikeContext } from '@/lib/contexts/like-dislike-context'
import { IPost } from '@/lib/interfaces/post.interface'
import { useDebounceClickingLikes } from '@/lib/utils'
import { ThumbsDown } from 'lucide-react'
import { useState } from 'react'

export function DislikeButton({ userId, post }: { userId?: string; post: IPost }) {
	const { isDisliked, toggleDislike, dislikes, isInitiallyDisliked } = useLikeDislikeContext()

	const [action, setAction] = useState<boolean | null>(null)

	async function handleClick() {
		setAction(prev => (prev === null ? true : !prev))

		toggleDislike()
	}

	useDebounceClickingLikes(
		action,
		async () => {
			if (isDisliked !== isInitiallyDisliked) {
				if (isDisliked) {
					await addDislike(post.id, userId!)
				} else {
					await removeDislike(post.id)
				}
			}
		},
		1500
	)

	return (
		<span className='flex gap-1 items-center'>
			{dislikes}
			<button onClick={() => handleClick()} className='active:scale-90'>
				<ThumbsDown fill={isDisliked ? '#e17158' : '#fff'} />
			</button>
		</span>
	)
}
