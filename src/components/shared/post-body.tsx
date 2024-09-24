import { IPost } from '@/lib/interfaces/post.interface'
import { LikeButton, DislikeButton } from '@/components'
import { isPostLiked, isPostDisliked } from '@/hooks/actions'

export async function PostBody({ post }: { post: IPost }) {
	const isLikeActive = await isPostLiked(post?.id)

	const isDislikeActive = await isPostDisliked(post?.id)

	return (
		<div className='grid grid-rows-custom grid-flow-row grid-auto-rows-1fr h-[220px] gap-[2px] overflow-hidden'>
			<h2 className='font-bold break-words whitespace-normal line-clamp-1 max-h-[60px]'>{post?.title}</h2>

			<p
				className='break-words whitespace-normal line-clamp-6 clamp-text 
			mb-1'
			>
				{post?.body}
			</p>

			<div className='flex items-center gap-3'>
				<LikeButton post={post} isActive={isLikeActive?.isLiked?.id} />

				<DislikeButton post={post} isActive={isDislikeActive?.isDisliked?.id} />
			</div>
		</div>
	)
}

{
	/* <div className=''>
				<p>Tags</p>
				{post?.tags?.map((tag, index, array) => (
					<span key={index}>
						{tag}
						{index === array.length - 1 ? '' : ', '}
					</span>
				))}
			</div>  */
}
