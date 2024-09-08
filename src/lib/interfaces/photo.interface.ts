import { IAlbum } from './album.interface'

export interface IPhoto {
	id: number
	albumId: number
	album: IAlbum
	title: string
	url: string
	thumbnailUrl: string
}
