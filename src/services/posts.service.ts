import axios from 'axios'

const instance = axios.create({
	baseURL: 'http://localhost:3000/api',
})

export default class Posts {
	async getPosts() {
		try {
			const response = await instance.get('/users/4/posts')
			return response.data
		} catch (err) {
			throw new Error('Something went wrong')
		}
	}
}