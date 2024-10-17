'use client'

import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function SearchInput({ className, placeholder }: { className?: string; placeholder?: string }) {
	const pathname = usePathname()
	const router = useRouter()
	const [inputValue, setInputValue] = useState('')

	const handleClick = () => {
		router.push(pathname + '?search=' + inputValue)

		if (!inputValue) router.push('/feed')
	}

	const handleKeyPress = (e: any) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			handleClick()
		}
	}

	return (
		<label className={clsx('input input-bordered flex items-center gap-2', className)}>
			<input type='text' onChange={e => setInputValue(e.target.value)} className='grow' placeholder={placeholder} onKeyDown={handleKeyPress} />
			<button type='submit' onClick={handleClick}>
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor' className='h-6 w-6 opacity-70'>
					<path
						fillRule='evenodd'
						d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
						clipRule='evenodd'
					/>
				</svg>
			</button>
		</label>
	)
}
