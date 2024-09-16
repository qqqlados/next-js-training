import Link from 'next/link'
import CardItem from './card-item'
import List from './list'
import PostBody from './post-body'
import { IPost } from '@/lib/interfaces/post.interface'

export default async function PostsList() {
	const posts: IPost[] = await fetch(`${process.env.NEXT_API_URL}/posts`, {
		cache: 'no-cache',
	}).then(res => res.json())

	return (
		<List>
			{posts?.map(post => (
				<Link href={`/user/${post?.id}`}>
					<CardItem key={post?.id}>
						<PostBody post={post} />
					</CardItem>
				</Link>
			))}
		</List>
	)
}
