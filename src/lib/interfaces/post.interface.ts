export interface IPost {
	id?: number
	userId: number
	title: string
	body: string
	tags: string[]
	likes: number
	dislikes: number
}
