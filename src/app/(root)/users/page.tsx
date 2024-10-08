import Loading from '@/app/loading-component'
import { UsersList } from '@/components'
import { Suspense } from 'react'

export default function Users() {
	return (
		<>
			<h1 className='text-center mb-3'>Users</h1>
			<div className='relative w-full h-[600px] overflow-y-auto px-3'>
				<Suspense fallback={<Loading />}>
					<UsersList />
				</Suspense>
			</div>
		</>
	)
}
