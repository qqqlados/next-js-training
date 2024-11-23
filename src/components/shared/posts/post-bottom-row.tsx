import { IPost } from '@/lib/interfaces/post.interface'
import { LikesArea } from '@/components/shared'

export async function PostBottomRow({ post }: { post: IPost }) {
	return (
		<section className='flex justify-between items-center mt-4'>
			<div>
				{post?.tags?.length > 0 ? (
					post?.tags?.map((tag, index, array) => (
						<span key={index}>
							#{tag}
							{index === array.length - 1 ? '' : ', '}{' '}
						</span>
					))
				) : (
					<p className='italic text-gray-600 text-md'>no tags yet</p>
				)}
			</div>

			<div className='mr-[50px]'>
				<LikesArea post={post} />
			</div>
		</section>
	)
}
