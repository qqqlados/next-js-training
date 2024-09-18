import { ReactNode } from 'react'

export function Title({ text }: { text: ReactNode }) {
	return <h1 className='font-bold text-3xl text-center normal-case'>{text}</h1>
}
