import clsx from 'clsx'
import { ReactNode } from 'react'

export function List({ children, className }: { children: ReactNode; className?: string }) {
	return <div className={clsx('grid grid-cols-3 gap-4 py-3', className)}>{children}</div>
}
