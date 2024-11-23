'use client'

import { DislikeButton, LikeButton } from '@/components/shared'
import { IPost } from '../../../lib/interfaces/post.interface'
import { useSession } from 'next-auth/react'
import { Skeleton } from '@/components/ui'

export function LikesAreaClientBody({ post }: { post: IPost }) {
	const { data: session } = useSession()

	if (!session) {
		return (
			<Skeleton className='flex gap-4 items-center h-8 w-[150px] rounded-xl pl-10 pt-3 pb-3'>
				<div className='w-[25px] h-[25px] bg-gray-100 rounded-full '></div>
				<div className='w-[25px] h-[25px] bg-gray-100 rounded-full ml-3'></div>
			</Skeleton>
		)
	}

	return (
		<div className='flex items-center gap-3'>
			{/* @ts-ignore */}
			<LikeButton userId={session!.user!.id!} post={post} />
			{/* @ts-ignore */}
			<DislikeButton userId={session!.user!.id!} post={post} />
		</div>
	)
}
