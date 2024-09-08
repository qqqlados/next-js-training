import { CircleUserRound } from 'lucide-react'

export default function CartItem() {
	return (
		<div className='bg-gray-200 w-[200px] h-[200px] py-2 rounded-3xl overflow-hidden'>
			<div className='flex flex-col justify-center items-center h-full'>
				<CircleUserRound width={120} height={120} color='#585858' strokeWidth={0.7} />

				<div className='flex justify-center w-full max-w-[150px]  bg-orange-300'>
					<span>username</span>
				</div>

				<div className='flex justify-center w-full max-w-[150px] bg-orange-400'>
					<span>email</span>
				</div>
			</div>
		</div>
	)
}
