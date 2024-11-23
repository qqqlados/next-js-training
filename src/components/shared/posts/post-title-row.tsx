import { IPost } from '@/lib/interfaces/post.interface'
import { ArrowLeft } from '@/ui'
import EditPostModal from '@/components/ui/modals/edit-post'
import { getCurrentUserId, getUsernameByPostId } from '@/hooks/actions'
import DeletePostModal from '@/components/ui/modals/delete-post'

export async function PostTitleRow({ post, userEmail }: { post: IPost; userEmail?: string }) {
	const currentUser = await getCurrentUserId(userEmail)

	const user = await getUsernameByPostId(post?.userId.toString())

	return (
		<div className='flex items-center gap-[10px] relative w-full'>
			<ArrowLeft />

			<div className='flex flex-col justify-center absolute left-1/2 transform -translate-x-1/2 min-h-[48px] w-[400px]'>
				<h2 className='font-bold break-words text-center'>{post?.title}</h2>
			</div>

			{user?.id !== currentUser ? (
				''
			) : (
				<div className='flex ml-auto'>
					<EditPostModal className='bg-white rounded-lg' userEmail={userEmail} postData={post} />

					<DeletePostModal postId={post?.id} className='bg-white rounded-lg' />
				</div>
			)}
		</div>
	)
}
