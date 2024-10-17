import clsx from 'clsx'
import { ReactNode } from 'react'

export function List({ children, flex }: { children: ReactNode; flex?: boolean }) {
	let className = flex ? 'flex gap-5 overflow-x-auto pb-4 h-[270px] max-w-[760px]' : 'grid grid-cols-3 justify-items-center gap-4 py-3'

	return <div className={className}>{children}</div>
}
