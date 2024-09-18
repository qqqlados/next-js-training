import { IPost } from '@/lib/interfaces/post.interface'
import Link from 'next/link'

export function PostBody({ post }: { post: IPost }) {
	return (
		<Link href={`/feed/posts/${post.id}`}>
			<div className='h-[250px]'>
				<h2 className='font-bold'>{post?.title}</h2>
				<p>{post?.body}</p>
				<div className='flex'>
					<span className='text-red-500'>{post?.likes}</span>
					<span>{post?.dislikes}</span>
				</div>
				{post?.tags?.map((tag, index, array) => (
					<span key={index}>
						{tag}
						{index === array.length - 1 ? '' : ', '}
					</span>
				))}
			</div>
		</Link>
	)
}
