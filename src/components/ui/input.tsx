import clsx from 'clsx'
import '@/globals.css'

type Props = {
	label?: string
	type: 'text' | 'password' | 'checkbox' | 'radio' | 'submit'
	placeholder?: string
	className?: string
}

export function Input({ label, type, placeholder, className }: Props) {
	return (
		<label className={clsx('form-control w-full mb-2 relative', className)}>
			<div className='label'>
				<span className='label-text'>{label}</span>
			</div>
			<input type={type} placeholder={placeholder} className='input input-bordered w-full' />
		</label>
	)
}
