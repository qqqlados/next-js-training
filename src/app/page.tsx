'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CookiesCheck } from '@/lib/utils'

export default function Index() {
	const cookies = new CookiesCheck()

	const user = cookies.getUser()

	const router = useRouter()

	useEffect(() => {
		if (!user) {
			router.push('/register')
		} else {
			router.push('/feed')
		}
	}, [user])

	return null
}
