import { API_URL } from '@/app/config'
import { IUser } from '@/lib/interfaces/user.interface'
import { CircleUserRound, NotebookPen, ThumbsUp } from 'lucide-react'
import EditProfileModal from '../../ui/modals/edit-profile'
import { ProfileAverageLikes } from './profile-average-likes'
import { ProfilePostsLength } from './profile-posts-length'
import { Suspense } from 'react'
import { ProfileInfo } from './profile-info'

export async function ProfileHeader({ userId }: { userId?: string }) {
	const currentUser: IUser = await fetch(`${API_URL}/users/${userId}`, {
		cache: 'force-cache',
		next: {
			tags: ['currentUser'],
		},
	}).then(res => res.json())

	return (
		<div className='flex items-center w-[90%] px-20 relative'>
			<ProfileInfo currentUser={currentUser} />

			<ProfilePostsLength userId={userId} />

			<ProfileAverageLikes userId={currentUser?.id} />

			<EditProfileModal user={currentUser} className='absolute right-0 top-0' />
		</div>
	)
}
