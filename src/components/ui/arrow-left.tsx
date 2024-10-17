'use client'

import { MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function ArrowLeft() {
	const router = useRouter()

	return (
		<button className='btn bg-white w-[50px] ml-20' onClick={() => router.back()}>
			<MoveLeft className='scale-125' />
		</button>
	)
}
