import { IComment } from './comment.interface'
import { IUser } from './user.interface'

export interface IPost {
	id: number
	userId: number
	user: IUser
	comments: IComment[]
	title: string
	body: string
}
