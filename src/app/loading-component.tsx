import clsx from 'clsx'

export default function Loading({ className }: { className?: string }) {
	return <span className={clsx('loading loading-dots loading-lg absolute top-1/2 left-1/2', className)}></span>
}
