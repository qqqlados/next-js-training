'use client'
import Posts from '../../services/posts.service'
import axios from 'axios'

export default function Me() {
	const posts = new Posts()
	const handleFetch = async () => {
		const data = await posts.getPosts()
		console.log(data)
	}

	return <button onClick={handleFetch}>Fetch</button>
}
