import { UserInfo } from '@/components/shared/users/user-info'
import { Suspense } from 'react'
import { PostsList } from '@/components/shared/posts/posts-list'
import { PostCardSkeleton } from '@/components/ui/skeletons'
import UserInfoSkeleton from '@/components/ui/skeletons/user-info-skeleton'

export default function User({ params }: { params: { userId: string } }) {
	return (
		<div className='flex flex-col items-center'>
			<div className='flex flex-col items-center bg-gray-100 p-10 pb-5 rounded-lg relative max-w-[820px] w-full'>
				<Suspense fallback={<UserInfoSkeleton />}>
					<UserInfo userId={params?.userId} />
				</Suspense>

				<div className='mt-3'>
					<Suspense
						fallback={
							<div className='flex gap-3'>
								<PostCardSkeleton />
								<PostCardSkeleton />
								<PostCardSkeleton />
							</div>
						}
					>
						<PostsList userId={params?.userId} flex={true} />
					</Suspense>
				</div>
			</div>
		</div>
	)
}
