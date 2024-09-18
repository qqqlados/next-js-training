import { IUser } from '@/lib/interfaces/user.interface'
import { CircleUserRound } from 'lucide-react'
import Link from 'next/link'

export function UserBody({ user }: { user: IUser }) {
	return (
		<div className='cursor-default'>
			<figure className='px-10 pt-10'>
				<CircleUserRound width={90} height={100} strokeWidth={2} />
			</figure>
			<div className='card-body items-center text-center'>
				<h2 className='card-title'>{user?.username}</h2>
				<p>{user?.email}</p>
				{/* <div className='card-actions'>
					<Link href={`/user/${user?.id}`}>
						<button className='btn btn-primary'>See Details</button>
					</Link>
				</div> */}
			</div>
		</div>
	)
}
