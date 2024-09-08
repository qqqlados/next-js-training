'use client'

import CartItem from '@/components/shared/cart-item'
import Posts from '@/services/posts.service'
import User from '@/services/users.service'
import { useEffect } from 'react'

export default function Home() {
	const users = new User()

	// async function getUsers() {
	// 	return await users.getUsers()
	// }

	const data = users.getUsers()

	// useEffect(() => {
	// 	getUsers()
	// }, [])

	return (
		<div>
			{data?.map(user => (
				<CartItem users={users} />
			))}
		</div>
	)
}
