'use client'

import { useEffect } from 'react'
import { toast, Toaster } from 'sonner'

export function ToastError() {
	useEffect(() => {
		toast.error('Something went wrong')
	}, [])

	return <Toaster />
}
