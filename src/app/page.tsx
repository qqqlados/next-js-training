'use client'

import { useEffect } from 'react'
import { CookiesCheck } from '@/utils'
import { useRouter } from 'next/navigation'

export default function Index() {
	const cookies = new CookiesCheck()

	const user = cookies.getUser()

	const router = useRouter()

	useEffect(() => {
		if (!user) {
			router.push('/login')
		} else {
			router.push('/feed')
		}
	}, [user])

	return null
}
