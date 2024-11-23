import { isPostDisliked, isPostLiked } from '@/hooks/actions'
import { IPost } from '@/lib/interfaces/post.interface'
import { LikesAreaClientBody } from '@/components/shared'
import { LikeDislikeProvider } from '@/lib/contexts/like-dislike-context'

export async function LikesArea({ post }: { post: IPost }) {
	const isLiked = await isPostLiked(post?.id)

	const isDisliked = await isPostDisliked(post?.id)

	return (
		<LikeDislikeProvider
			isInitiallyLiked={Boolean(isLiked)}
			isInitiallyDisliked={Boolean(isDisliked)}
			likesCount={post?.likes > 0 ? post?.likes : 0}
			dislikesCount={post?.dislikes > 0 ? post?.dislikes : 0}
		>
			<LikesAreaClientBody post={post} />
		</LikeDislikeProvider>
	)
}
