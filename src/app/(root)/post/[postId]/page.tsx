import { cookies } from 'next/headers'
import { PostExpanded } from '@/components/shared'
import { Suspense } from 'react'
import { PostExpandedSkeleton } from '@/components/ui/skeletons'
import { API_URL } from '@/app/config'
import { IPost } from '@/lib/interfaces/post.interface'

export async function generateMetadata({ params }: { params: { postId: string } }) {
	const post: IPost = await fetch(`${API_URL}/posts/${params?.postId}`).then(res => res.json())

	return {
		title: `${post!.title} | Feed`,
	}
}

export default function Post({ params }: { params: { postId: string } }) {
	const cookieStore = cookies()

	const userEmail = cookieStore.get('User')?.value

	return (
		<div className='flex justify-center'>
			<Suspense fallback={<PostExpandedSkeleton />}>
				<PostExpanded postId={params?.postId} userEmail={userEmail} />
			</Suspense>
		</div>
	)
}
