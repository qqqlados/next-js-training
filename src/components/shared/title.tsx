import clsx from 'clsx'
import { ReactNode } from 'react'

export function Title({ text, className }: { text: ReactNode; className?: string }) {
	return <h1 className={clsx('font-bold text-3xl text-center normal-case', className)}>{text}</h1>
}
