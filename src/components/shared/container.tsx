import { ReactNode } from 'react'

export default function Container({ children }: { children: ReactNode }) {
	return <div className='w-full h-screen max-w-[1500px] px-[20px] mx-auto pt-5 overflow-y-hidden'>{children}</div>
}
