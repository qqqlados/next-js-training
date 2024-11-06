import { IUser } from '@/lib/interfaces/user.interface'
import { CircleUserRound } from 'lucide-react'

export function ProfileInfo({ currentUser }: { currentUser?: IUser }) {
	return (
		<div className='basis-[500px] flex gap-3 items-center '>
			<CircleUserRound width={150} height={150} stroke='#302f2f' />

			<div className=''>
				<p className='text-2xl font-semibold'>{currentUser?.name}</p>
				<div className='text-cyan-700 hover:text-cyan-900'>
					<p>{'@' + currentUser?.username}</p>
				</div>

				<p className='italic'>{currentUser?.email}</p>
			</div>
		</div>
	)
}
