'use client'

import { addDislike, getCurrentUserId, removeDislike } from '@/hooks/actions'
import { IPost } from '@/lib/interfaces/post.interface'
import { useCheckUser, useDebounceClickingLikes } from '@/lib/utils'
import { ThumbsDown } from 'lucide-react'
import { useState } from 'react'

export function DislikeButton({ post, isActive }: { post: IPost; isActive?: null | string }) {
	const [dislike, setDislike] = useState({
		value: post?.dislikes,
		active: Boolean(isActive),
	})

	const [action, setAction] = useState<boolean | null>(null)

	async function handleClick() {
		setAction(prev => (prev === null ? true : !prev))

		setDislike(prev => ({
			active: !prev.active,
			value: prev.active == false ? prev.value + 1 : prev.value - 1,
		}))
	}

	const { user } = useCheckUser()

	useDebounceClickingLikes(
		action,
		async () => {
			const userIdObject = await getCurrentUserId(user)

			if (Boolean(isActive) !== dislike.active) {
				if (dislike.active) {
					await addDislike(post.id, userIdObject?.userId!)
				} else {
					await removeDislike(post.id)
				}
			}
		},
		1500
	)

	return (
		<span className='flex gap-1 items-center'>
			{dislike.value}
			<button onClick={() => handleClick()} className='active:scale-90'>
				<ThumbsDown fill={dislike.active ? '#e17158' : '#fff'} />
			</button>
		</span>
	)
}
