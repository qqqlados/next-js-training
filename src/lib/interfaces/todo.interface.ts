import { IUser } from './user.interface'

export interface ITodo {
	id: number
	userId: number
	user: IUser
	title: string
	completed: false
}
