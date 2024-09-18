import { List, CardItem, PostBody } from '@/components'
import { IPost } from '@/lib/interfaces/post.interface'

export async function PostsList() {
	const posts: IPost[] = await fetch(`${process.env.NEXT_API_URL}/posts`, {
		cache: 'no-cache',
	}).then(res => res.json())

	return (
		<List>
			{posts?.map(post => (
				<CardItem key={post?.id}>
					<PostBody post={post} />
				</CardItem>
			))}
		</List>
	)
}
