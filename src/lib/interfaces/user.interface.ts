import { IAlbum } from './album.interface'
import { IPost } from './post.interface'
import { ITodo } from './todo.interface'

export interface IUser {
	id: number
	posts: IPost[]
	todos: ITodo[]
	albums: IAlbum[]
	name: string
	username: string
	email: string
	phone: string
	website: string
}
