import { Skeleton } from '../skeleton'

export default function UserInfoSkeleton() {
	return (
		<div className='mt-[20px] h-[180px]'>
			<Skeleton className='h-20 w-20 mx-auto rounded-[50%] mb-2' />

			<Skeleton className='h-4 mx-auto w-[115px] rounded-xl mb-2' />

			<Skeleton className='h-4 mx-auto w-[160px] rounded-xl mb-2' />

			<Skeleton className='h-4 mx-auto w-[120px] rounded-xl mb-2' />

			<Skeleton className='h-4 mx-auto w-[100px] rounded-xl mb-10' />
		</div>
	)
}
