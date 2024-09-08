import axios from 'axios'

const instance = axios.create({
	baseURL: 'http://localhost:3000/api',
})

export default class Comments {
	async getPostComments(id: number) {
		try {
			const response = await instance.get(`/users/${id}/todos`)
			return response.data
		} catch (err) {
			throw new Error()
		}
	}
}
