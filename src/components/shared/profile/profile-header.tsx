import { API_URL } from '@/app/config'
import { IUser } from '@/lib/interfaces/user.interface'
import { ProfileAverageLikes } from './profile-average-likes'
import { ProfilePostsLength } from './profile-posts-length'
import { ProfileInfo } from './profile-info'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui'
import { auth } from '@/app/auth'

const EditProfileModal = dynamic(() => import('../../ui/modals/edit-profile'), {
	loading: () => <Skeleton className='w-full h-full rounded-lg bg-gray-200'></Skeleton>,
})

export async function ProfileHeader() {
	const session = await auth()

	//@ts-ignore
	const userId = session!.user!.id!

	const currentUser: IUser = await fetch(`${API_URL}/users/${userId}`).then(res => res.json())

	return (
		<div className='flex items-center w-[90%] px-20 relative'>
			<ProfileInfo currentUser={currentUser} />

			<div className='basis-[150px] flex justify-center'>
				<ProfilePostsLength userId={userId} />
			</div>

			<div className='flex-grow flex justify-center'>
				<ProfileAverageLikes userId={userId} />
			</div>

			<div className='absolute right-0 top-0 w-[58px] h-[48px]'>
				<EditProfileModal user={currentUser} />
			</div>
		</div>
	)
}
