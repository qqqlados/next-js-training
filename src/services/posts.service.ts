import axios from 'axios'

const instance = axios.create({
	baseURL: 'http://localhost:3000/api',
})

export default class Posts {
	async getUserPosts(id: number) {
		try {
			const response = await instance.get(`/users/${id}/posts`)
			return response.data
		} catch (err) {
			throw new Error('Something went wrong')
		}
	}
}
