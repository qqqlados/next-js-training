import { Skeleton } from '../skeleton'

export function PostBottomSkeleton() {
	return (
		<div className='flex justify-between mt-6'>
			<Skeleton className='h-6 w-[200px] rounded-xl' />

			<Skeleton className='flex gap-4 items-center h-8 w-[150px] rounded-xl pl-10 pt-3 pb-3 mr-[30px]'>
				<div className='w-[25px] h-[25px] bg-gray-100 rounded-full '></div>
				<div className='w-[25px] h-[25px] bg-gray-100 rounded-full ml-3'></div>
			</Skeleton>
		</div>
	)
}
