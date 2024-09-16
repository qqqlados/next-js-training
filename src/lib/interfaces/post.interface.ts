import { IUser } from './user.interface'

export interface IPost {
	id: number
	userId: number
	user: IUser
	title: string
	body: string
	tags?: string[]
	likes?: number
	dislikes?: number
}
