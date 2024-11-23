import { API_URL } from '@/app/config'
import { List, CardItem } from '@/components'
import { IPost } from '@/lib/interfaces/post.interface'
import { PostBody } from './post-body'
import { Pen, StickyNote } from 'lucide-react'

export async function PostsList({
	searchValue,
	currentUserEmail,
	userId,
	flex,
}: {
	searchValue?: string
	currentUserEmail?: string
	userId?: string
	flex?: boolean
}) {
	let url = `${API_URL}/posts`

	if (searchValue) url = `${API_URL}/posts?searchValue=${searchValue}`

	if (currentUserEmail) url = `${API_URL}/myPosts/${currentUserEmail}`

	if (userId) url = `${API_URL}/userPosts/${userId}`

	const posts: IPost[] = await fetch(url, {
		next: {
			tags: ['posts'],
		},
	}).then(res => res.json())

	return (
		<>
			{posts.length > 0 ? (
				<List flex={flex}>
					{posts.map(post => (
						<CardItem flex={flex} key={post?.id}>
							<PostBody post={post} />
						</CardItem>
					))}
				</List>
			) : posts?.length == 0 && searchValue ? (
				<div className='flex flex-col gap-3 justify-center items-center w-full h-full pb-5'>
					<p className='text-lg'>We are sorry but the post you are searching does not exist.</p>
					<StickyNote width={50} height={50} color='#3d3d3dee' />
				</div>
			) : (
				<div className='flex gap-3 justify-center items-center w-full h-full pb-5'>
					<p className='text-lg'>User has not created posts yet</p>
					<Pen />
				</div>
			)}
		</>
	)
}
