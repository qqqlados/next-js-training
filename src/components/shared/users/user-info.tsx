import { API_URL } from '@/app/config'
import { IUser } from '@/lib/interfaces/user.interface'
import { CircleUserRound } from 'lucide-react'

export async function UserInfo({ userId }: { userId: string }) {
	const user: IUser = await fetch(`${API_URL}/users/${userId}`).then(res => res.json())

	return (
		<>
			<figure>
				<CircleUserRound width={90} height={100} strokeWidth={2} />
			</figure>
			<p>{user?.username}</p>
			<p>{user?.name}</p>
			<p>{user?.phone}</p>
			<p>{user?.website}</p>
		</>
	)
}
