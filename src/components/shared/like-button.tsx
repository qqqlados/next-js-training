'use client'

import { addLike, removeLike, getCurrentUserId } from '@/hooks/actions'
import { IPost } from '@/lib/interfaces/post.interface'
import { useCheckUser, useDebounceClickingLikes } from '@/lib/utils'
import { ThumbsUp } from 'lucide-react'
import { useState } from 'react'

export function LikeButton({ post, isActive }: { post: IPost; isActive?: null | string }) {
	const [like, setLike] = useState({
		active: Boolean(isActive),
		value: post?.likes,
	})
	const [action, setAction] = useState<boolean | null>(null)

	async function handleClick() {
		setAction(prev => (prev === null ? true : !prev))

		setLike(prev => ({
			active: !prev.active,
			value: prev.active == false ? prev.value + 1 : prev.value - 1,
		}))
	}

	const { user } = useCheckUser()

	useDebounceClickingLikes(
		action,
		async () => {
			const userIdObject = await getCurrentUserId(user)

			if (Boolean(isActive) !== like.active) {
				if (like.active) {
					await addLike(post.id, userIdObject?.userId!)
				} else {
					await removeLike(post.id)
				}
			}
		},
		1500
	)

	return (
		<span className='flex gap-1 items-center'>
			{like.value}
			<button onClick={e => handleClick()} className='active:scale-90'>
				<ThumbsUp fill={like.active ? '#e17158' : '#fff'} />
			</button>
		</span>
	)
}
