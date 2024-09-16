import clsx from 'clsx'
import { ReactNode } from 'react'

export default function CardItem({ children, className }: { children: ReactNode; className?: string }) {
	return <div className={clsx('card bg-base-100 shadow-xl p-4 overflow-hidden', className)}>{children}</div>
}
