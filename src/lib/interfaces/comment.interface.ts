import { IPost } from './post.interface'

export interface IComment {
	id: number
	postId: number
	post: IPost
	name: string
	email: string
	body: string
}
