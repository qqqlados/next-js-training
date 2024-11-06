import type { Metadata } from 'next'
import { Header, Container } from '@/components'
import '@/globals.css'
import React from 'react'

export const metadata: Metadata = {
	title: 'Next.js Training',
	description: 'Generated by create next app',
}

export default function UserLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className='flex flex-col overflow-y-hidden'>
			<Container>
				<Header />
				<main className='px-10 w-full h-full'>{children}</main>
			</Container>
		</div>
	)
}
