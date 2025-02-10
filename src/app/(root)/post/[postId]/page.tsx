import { cookies } from 'next/headers'
import { PostExpanded } from '@/components/shared'
import { Suspense } from 'react'
import { PostExpandedSkeleton } from '@/components/ui/skeletons'
import { API_URL } from '@/app/config'
import { IPost } from '@/lib/interfaces/post.interface'
import { auth } from '@/app/auth/auth'

export async function generateMetadata({ params }: { params: { postId: string } }) {
	const post: IPost = await fetch(`${API_URL}/posts/${params?.postId}`).then(res => res.json())

	return {
		title: `${post!.title} | Feed`,
	}
}

export default async function Post({ params }: { params: { postId: string } }) {
	const session = await auth()

	const userEmail = session!.user!.email!

	return (
		<div className='flex justify-center'>
			<Suspense fallback={<PostExpandedSkeleton />}>
				<PostExpanded postId={params?.postId} userEmail={userEmail} />
			</Suspense>
		</div>
	)
}
