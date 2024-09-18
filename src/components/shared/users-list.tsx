import { IUser } from '@/lib/interfaces/user.interface'
import { CardItem, UserBody, List } from '@/components'

export async function UsersList() {
	const users: IUser[] = await fetch(`${process.env.NEXT_API_URL}/users`).then(res => res.json())

	return (
		<List className='grid-cols-4 gap-y-10'>
			{users?.map(user => (
				<CardItem key={user?.id} className='p-2'>
					<UserBody user={user} />
				</CardItem>
			))}
		</List>
	)
}
