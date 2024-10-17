import { Skeleton } from '../skeleton'
import { PostBottomSkeleton } from './post-bottom-skeleton'
import { PostTextSkeleton } from './post-text-skeleton'

export function PostExpandedSkeleton() {
	return (
		<div className='bg-gray-100 px-10 pt-5 pb-5 rounded-lg relative max-w-[800px] w-full'>
			<Skeleton className='h-6 mx-auto w-[150px] rounded-xl mb-3' />

			<Skeleton className='h-6 mx-auto w-[300px] rounded-xl' />

			<PostTextSkeleton />

			<PostBottomSkeleton />
		</div>
	)
}
