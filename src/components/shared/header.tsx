'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
	const pathname = usePathname()

	return (
		<header className=' w-full pb-5'>
			<div className='w-[600px] mx-auto'>
				<nav className='w-full'>
					<ul className='flex gap-5 justify-center'>
						<li className='mr-3'>
							<Link
								className={clsx(
									'inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3',
									pathname.includes('feed') && 'bg-blue-500 text-white'
								)}
								href='/feed'
							>
								Feed
							</Link>
						</li>
						<li className='mr-3'>
							<Link
								className={clsx(
									'inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3',
									pathname.includes('users') && 'bg-blue-500 text-white'
								)}
								href='/users'
							>
								Users
							</Link>
						</li>
						<li className='mr-3'>
							<Link
								className={clsx(
									'inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3',
									pathname.includes('my-profile') && 'bg-blue-500 text-white'
								)}
								href='/my-profile'
							>
								My Profile
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}
