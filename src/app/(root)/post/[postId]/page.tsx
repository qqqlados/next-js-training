import { cookies } from 'next/headers'
import { PostExpanded } from '@/components/shared'
import { Suspense } from 'react'
import { PostExpandedSkeleton } from '@/components/ui/skeletons'

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
