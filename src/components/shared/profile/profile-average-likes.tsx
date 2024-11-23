import { API_URL } from '@/app/config'
import { IPost } from '@/lib/interfaces/post.interface'
import { ThumbsUp } from 'lucide-react'

export async function ProfileAverageLikes({ userId }: { userId?: number }) {
	const response = await fetch(`${API_URL}/users/${userId}/posts`)

	const posts: IPost[] = await response.json()

	const averageLikes =
		posts?.length > 0
			? posts
					?.map(post => post.likes)
					.reduce((acc, cur) => {
						return (acc += cur)
					}, 0) / posts.length
			: 0

	return (
		<p className='flex gap-1 items-center'>
			Average number of likes: {averageLikes.toPrecision(2)} <ThumbsUp />{' '}
		</p>
	)
}
