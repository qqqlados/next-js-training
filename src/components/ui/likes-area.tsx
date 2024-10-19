import { isPostDisliked, isPostLiked } from '@/hooks/actions'
import { IPost } from '@/lib/interfaces/post.interface'
import LikeDislikeActions from '@/lib/contexts/like-dislike-actions'

export async function LikesArea({ userEmail, post }: { userEmail?: string; post: IPost }) {
	const isLiked = await isPostLiked(post?.id)

	const isDisliked = await isPostDisliked(post?.id)

	return <LikeDislikeActions userEmail={userEmail} post={post} isLikeActive={Boolean(isLiked)} isDislikeActive={Boolean(isDisliked)} />
}
