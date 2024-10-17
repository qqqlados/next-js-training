import { Skeleton } from '../skeleton'

export function PostCardSkeleton() {
	return (
		<div className='flex flex-col gap-2 grow w-[225px]'>
			<Skeleton className='h-10 w-full rounded-tl-2xl rounded-tr-2xl' />

			<Skeleton className='h-[130px] w-full' />

			<Skeleton className='flex gap-4 items-center h-15 w-full rounded-bl-2xl rounded-br-2xl pl-5 pt-3 pb-4'>
				<div className='w-[35px] h-[35px] bg-gray-100 rounded-full '></div>
				<div className='w-[35px] h-[35px] bg-gray-100 rounded-full'></div>
			</Skeleton>
		</div>
	)
}
