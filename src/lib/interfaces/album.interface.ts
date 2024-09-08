import { IPhoto } from './photo.interface'
import { IUser } from './user.interface'

export interface IAlbum {
	id: number
	user: IUser
	photos: IPhoto[]
	title: string
}
