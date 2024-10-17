import { Skeleton } from '../skeleton'

export function PostTextSkeleton() {
	return (
		<div className='flex flex-col gap-2 mt-5'>
			<Skeleton className='h-6 w-[96%] rounded-xl' />

			<Skeleton className='h-6 w-full rounded-xl' />

			<Skeleton className='h-6 w-[56%] rounded-xl' />
		</div>
	)
}
