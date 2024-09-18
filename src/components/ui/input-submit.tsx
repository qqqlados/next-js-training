import clsx from 'clsx'

export function InputSubmit({ text, disabled, className }: { text: string; disabled?: boolean; className?: string }) {
	return <input type='submit' className={clsx('btn btn-active btn-neutral', className)} value={text} disabled={disabled} />
}
