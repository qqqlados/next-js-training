import { IUser } from '@/types/user.interface'
import { CardItem, UserBody, List } from '@/components'

export async function UsersList() {
	const users: IUser[] = await fetch(`${process.env.NEXT_API_URL}/users`, {
		cache: 'no-store',
	}).then(res => res.json())

	return (
		<List>
			{users?.map(user => (
				<CardItem key={user?.id} className='p-2'>
					<UserBody user={user} />
				</CardItem>
			))}
		</List>
	)
}
