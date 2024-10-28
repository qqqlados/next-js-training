import { API_URL } from '@/app/config'
import { IPost } from '@/lib/interfaces/post.interface'
import { NotebookPen } from 'lucide-react'

export async function ProfilePostsLength({ userId }: { userId?: string }) {
	const posts: IPost[] = await fetch(`${API_URL}/users/${userId}/posts`).then(res => res.json())

	return (
		<div className='basis-[150px] flex justify-center'>
			<p className='flex gap-2 items-center'>
				{posts?.length > 0 ? posts?.length : '0'} {posts?.length > 20 && posts?.length.toString().endsWith('1') ? 'post' : 'posts'} <NotebookPen />{' '}
			</p>
		</div>
	)
}
