import Loading from '@/app/loading-component'
import { ProfileHeader } from '@/components/shared/profile/profile-header'
import { PostsList } from '@/components/shared/posts/posts-list'
import { PostListSkeletons, ProfileHeaderSkeleton } from '@/components/ui/skeletons'
import { getCurrentUserId } from '@/hooks/actions'
import { cookies } from 'next/headers'
import { Suspense } from 'react'

export default async function MyProfile() {
	const cookieStore = cookies()

	const user = cookieStore.get('User')

	const userId = await getCurrentUserId(user?.value)

	return (
		<div>
			<div className='h-[150px] relative'>
				<Suspense fallback={<ProfileHeaderSkeleton />}>
					<ProfileHeader userId={userId} />
				</Suspense>
			</div>
			<div className='relative w-full h-[600px] px-3 overflow-y-auto'>
				<Suspense fallback={<PostListSkeletons />}>
					<PostsList emailParam={user?.value} />
				</Suspense>
			</div>
		</div>
	)
}
