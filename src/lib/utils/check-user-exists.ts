'use client'

import { useEffect } from 'react'
import { CookiesCheck } from './cookies'
import { useRouter } from 'next/navigation'

export default function useCheckUser() {
	const cookies = new CookiesCheck()

	const user = cookies.getUser()

	const router = useRouter()

	useEffect(() => {
		if (!user) {
			router.push('/login')
		}
	}, [user])
}
