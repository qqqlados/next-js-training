import clsx from 'clsx'
import { ReactNode } from 'react'

export function CardItem({ children, flex, className }: { children: ReactNode; flex?: boolean; className?: string }) {
	return (
		<div
			className={clsx(
				'card bg-base-100 shadow-lg p-4 overflow-hidden justify-self-center flex-shrink-0 w-full',
				flex && 'w-full max-w-[225px]',
				className
			)}
		>
			{children}
		</div>
	)
}
