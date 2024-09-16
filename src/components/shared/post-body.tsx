import { IPost } from '@/lib/interfaces/post.interface'

export default function PostBody({ post }: { post: IPost }) {
	return (
		<div className='h-[250px]'>
			<h2 className='font-bold'>{post?.title}</h2>
			<p>{post?.body}</p>
			<div className='flex'>
				<span className='text-red-500'>{post?.likes}</span>
				<span>{post?.dislikes}</span>
			</div>
			{post?.tags?.map((tag, index, array) => (
				<span>
					{tag}
					{index === array.length - 1 ? '' : ', '}
				</span>
			))}
		</div>
	)
}
