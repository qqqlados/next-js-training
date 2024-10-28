import { API_URL } from '@/app/config'
import { IPost } from '@/lib/interfaces/post.interface'
import Link from 'next/link'
import { PostTitleRow } from './post-title-row'
import { getUsernameByPostId } from '@/hooks/actions'
import { PostBottomSkeleton, PostExpandedSkeleton } from '../../ui/skeletons'
import { Suspense } from 'react'
import { PostBottomRow } from './post-bottom-row'
import { Toaster } from 'sonner'

export async function PostExpanded({ postId, userEmail }: { postId?: string; userEmail?: string }) {
	const post: IPost = await fetch(`${API_URL}/posts/${postId}`, {
		next: {
			tags: [`post-${postId}`],
		},
	}).then(res => res.json())

	if (!post || !post.userId) {
		return <p className='mt-40 text-lg'>Post not found or user information is missing.</p>
	}

	const user = await getUsernameByPostId(post?.userId.toString())

	if (!user) {
		return <div>User not found.</div>
	}

	return (
		<div className='bg-gray-100 px-10 pt-10 pb-5 rounded-lg relative max-w-[800px] w-full'>
			<div className='flex justify-center text-center absolute top-4 left-0 right-0 text-cyan-700 hover:text-cyan-900'>
				<Link href={`/users/${user!.id}`}>@{user!.username}</Link>
			</div>

			<PostTitleRow post={post} userEmail={userEmail} />

			<div className='mt-4'>
				<p
					className='break-words whitespace-normal line-clamp-6 clamp-text
			mb-1'
				>
					{post?.body}
				</p>
			</div>

			<Suspense fallback={<PostBottomSkeleton />}>
				<PostBottomRow post={post} userEmail={userEmail} />
			</Suspense>

			<Toaster position='top-center' />
		</div>
	)
}
