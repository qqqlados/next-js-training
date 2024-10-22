import { API_URL } from '@/app/config'
import { UserBody } from '@/components/shared'
import { PostsList } from '@/components/shared/posts/posts-list'
import EditProfileModal from '@/components/ui/modals/edit-profile'
import EditProfile from '@/components/ui/modals/edit-profile'
import { PostListSkeletons } from '@/components/ui/skeletons'
import { getCurrentUserId, getPostsQuantity } from '@/hooks/actions'
import { IUser } from '@/lib/interfaces/user.interface'
import { CircleUserRound, NotebookPen, ThumbsUp } from 'lucide-react'
import { cookies } from 'next/headers'
import { Suspense } from 'react'

export default async function MyProfile() {
	const cookieStore = cookies()

	const user = cookieStore.get('User')

	const userId = await getCurrentUserId(user?.value)

	const currentUser: IUser = await fetch(`${API_URL}/users/${userId}`, {
		cache: 'no-store',
	}).then(res => res.json())

	const postsQuantity = await getPostsQuantity({ userId })

	return (
		<>
			<div className='flex items-center justify-between w-[90%] px-20 relative'>
				<div className='flex gap-3 items-center '>
					<CircleUserRound width={150} height={150} stroke='#302f2f' />

					<div className=''>
						<p className='text-2xl font-semibold'>{currentUser?.name}</p>
						<div className='text-cyan-700 hover:text-cyan-900'>
							<p>{'@' + currentUser?.username}</p>
						</div>

						<p className='italic'>{currentUser?.email}</p>
					</div>

					<EditProfileModal user={currentUser} className='absolute right-0 top-0' />
				</div>

				<div>
					<p className='flex gap-2 items-center'>
						{postsQuantity} posts <NotebookPen />{' '}
					</p>
				</div>

				<div>
					<p className='flex gap-1 items-center'>
						Average number of likes: 50 <ThumbsUp />{' '}
					</p>
				</div>
			</div>

			<div className='relative w-full h-[600px] px-3 overflow-y-auto'>
				<Suspense fallback={<PostListSkeletons />}>
					<PostsList emailParam={user?.value} />
				</Suspense>
			</div>
		</>
	)
}
