import Link from 'next/link'

export function Header() {
	return (
		<header className=' w-full pb-5'>
			<div className='w-[600px] mx-auto'>
				<nav className='w-full'>
					<ul className='flex gap-5 justify-center'>
						<li className='mr-3'>
							<Link className='inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white' href='/feed'>
								Feed
							</Link>
						</li>
						<li className='mr-3'>
							<Link
								className='inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3'
								href='/users'
							>
								Users
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}
