'use client'

import { cn } from '@/lib/utils/utils'
import { signOut } from 'next-auth/react'

export function LogoutButton({ className }: { className?: string }) {
	return (
		<button className={cn('btn z-20', className)} onClick={() => signOut({ callbackUrl: '/auth' })}>
			Log out
		</button>
	)
}
