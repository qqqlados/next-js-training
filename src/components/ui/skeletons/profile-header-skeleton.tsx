import { CircleUserIcon } from 'lucide-react'
import { Skeleton } from '../skeleton'

export function ProfileHeaderSkeleton() {
	return (
		<div className='w-[90%] px-20 h-[150px]'>
			<Skeleton className='flex items-center w-full h-full'>
				<div className='basis-[500px] flex items-center gap-3 h-full'>
					<div className='flex basis-[150px] justify-center items-center w-[150px] h-[150px] rounded-[50%]'>
						<CircleUserIcon stroke='#fff' width='100%' height='100%' />
					</div>

					<div className='flex flex-col items-start justify-between h-[50%]'>
						<div className='w-[250px] h-[25px] bg-white rounded-xl'></div>

						<div className='w-[120px] h-[15px] bg-white rounded-xl'></div>
						<div className='w-[200px] h-[15px] bg-white rounded-xl'></div>
					</div>
				</div>

				<div className='basis-[150px]'>
					<div className='w-[60%] h-[25px] bg-white rounded-xl mx-auto'></div>
				</div>

				<div className='flex-grow'>
					<div className='w-[60%] h-[25px] bg-white rounded-xl mx-auto'></div>
				</div>
			</Skeleton>
		</div>
	)
}
