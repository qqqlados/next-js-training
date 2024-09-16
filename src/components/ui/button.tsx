import clsx from 'clsx'

type Props = {
	style?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'ghost'
	type?: 'button' | 'reset' | 'submit'
	text: string
	onClick?: () => void
	className?: string
}

export default function Button({ style, type, text, className, onClick }: Props) {
	return (
		<>
			{style == undefined && (
				<button type={type} className={clsx('btn btn-active', className)} onClick={onClick}>
					{text}
				</button>
			)}
			{style == 'neutral' && (
				<button type={type} className={clsx('btn btn-active btn-neutral', className)} onClick={onClick}>
					{text}
				</button>
			)}
			{style == 'primary' && (
				<button type={type} className={clsx('btn btn-active btn-primary', className)} onClick={onClick}>
					{text}
				</button>
			)}
			{style == 'secondary' && (
				<button type={type} className={clsx('btn btn-active btn-secondary', className)} onClick={onClick}>
					{text}
				</button>
			)}
			{style == 'accent' && (
				<button type={type} className={clsx('btn btn-active btn-accent', className)} onClick={onClick}>
					{text}
				</button>
			)}
			{style == 'ghost' && (
				<button type={type} className={clsx('btn btn-active btn-ghost', className)} onClick={onClick}>
					{text}
				</button>
			)}
		</>
	)
}
