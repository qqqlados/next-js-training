import clsx from 'clsx'

export function FormError({ text, className }: { text?: string; className?: string }) {
	return (
		<div className='label absolute left-0 bottom-[-28px] w-full'>
			<span className={clsx('label-text-alt text-red-500 text-sm', className)}>{text}</span>
		</div>
	)
}
