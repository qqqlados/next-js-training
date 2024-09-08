import axios from 'axios'

const instance = axios.create({
	baseURL: 'http://localhost:3000/api',
})

export default class User {
	async getUsers() {
		try {
			const response = await instance.get('/users')
			return response.data
		} catch (err) {
			throw new Error()
		}
	}
	async getUserPosts(id: number) {
		try {
			const response = await instance.get(`/users/${id}/todos`)
			return response.data
		} catch (err) {
			throw new Error()
		}
	}
	async getUserTodos(id: number) {
		try {
			const response = await instance.get(`/users/${id}/todos`)
			return response.data
		} catch (err) {
			throw new Error()
		}
	}
	async getUserAlbums(id: number) {
		try {
			const response = await instance.get(`/users/${id}/albums`)
			return response.data
		} catch (err) {
			throw new Error()
		}
	}
}
