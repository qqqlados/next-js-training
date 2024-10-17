import { PostsList } from '@/components/shared/posts/posts-list'
import { PostListSkeletons } from '@/components/ui/skeletons'
import { cookies } from 'next/headers'
import { Suspense } from 'react'

export default function MyProfile() {
	const cookieStore = cookies()

	const user = cookieStore.get('User')

	return (
		<>
			<h1 className='text-center text-lg italic'>My Posts</h1>

			<div className='relative w-full h-[600px] px-3 overflow-y-auto'>
				<Suspense fallback={<PostListSkeletons />}>
					<PostsList emailParam={user?.value} />
				</Suspense>
			</div>
		</>
	)
}
