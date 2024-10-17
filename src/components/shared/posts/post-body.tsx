import { IPost } from '@/lib/interfaces/post.interface'
import Link from 'next/link'
import { LikesArea } from '@/ui'

export function PostBody({ userEmail, post }: { userEmail?: string; post: IPost }) {
	return (
		<div className='grid grid-rows-custom grid-flow-row grid-auto-rows-1fr h-[220px] overflow-hidden'>
			<h2 className='font-bold break-words whitespace-normal line-clamp-1 max-h-[70px]'>{post?.title}</h2>

			<p
				className='break-words whitespace-normal line-clamp-6 clamp-text 
			mb-1'
			>
				{post?.body}
			</p>

			<LikesArea userEmail={userEmail} post={post} />

			<div className='text-center'>
				<Link href={`/post/${post.id}`}>See more</Link>
			</div>
		</div>
	)
}
