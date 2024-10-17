import type { Metadata } from 'next'
import { Header, Container } from '@/components'
import '@/globals.css'
import React from 'react'

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function UserLayout({
	children,
	register,
	login,
}: Readonly<{
	children: React.ReactNode
	register: React.ReactNode
	login: React.ReactNode
}>) {
	return (
		<div className='flex flex-col overflow-y-hidden'>
			<Container>
				<Header />
				<main className='px-10 w-full h-full'>
					{children}
					{register}
					{login}
				</main>
			</Container>
		</div>
	)
}
