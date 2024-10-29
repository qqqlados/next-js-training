import { API_URL } from '@/app/config'
import { IPost } from '@/lib/interfaces/post.interface'
import { ThumbsUp } from 'lucide-react'
import { Toaster, toast } from 'sonner'

export async function ProfileAverageLikes({ userId }: { userId?: number }) {
	const response = await fetch(`${API_URL}/users/${userId}/posts`)

	if (!response.ok) console.log('Something went wrong!')

	const posts: IPost[] = await response.json()

	const averageLikes =
		posts
			?.map(post => post.likes)
			.reduce((acc, cur) => {
				return (acc += cur)
			}, 0) / posts.length

	return (
		<div className='flex-grow flex justify-center'>
			<p className='flex gap-1 items-center'>
				Average number of likes: {averageLikes.toPrecision(2)} <ThumbsUp />{' '}
			</p>
		</div>
	)
}
