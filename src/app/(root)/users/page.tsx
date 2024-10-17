import { UsersList } from '@/components'
import { UsersListSkeletons } from '@/components/ui/skeletons'
import { Suspense } from 'react'

export default function Users() {
	return (
		<div className='relative w-full h-[600px] overflow-y-auto px-3'>
			<Suspense fallback={<UsersListSkeletons />}>
				<UsersList />
			</Suspense>
		</div>
	)
}
