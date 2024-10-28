'use client'

import { Toaster, toast } from 'sonner'

export default function Sonner() {
	return (
		<>
			<Toaster position='top-center' />
			<button onClick={() => toast.error('My first toast')}>Click me</button>
		</>
	)
}
