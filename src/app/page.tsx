'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Home() {
	const { data: session } = useSession()

	const router = useRouter()

	useEffect(() => {
		if (!session) {
			router.push('/auth')
		} else {
			router.push('/feed')
		}
	}, [])

	return <div />
}
