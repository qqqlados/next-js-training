export interface IPost {
	id: string
	userId: number
	title: string
	body: string
	tags: string[]
	likes: number
	dislikes: number
}
