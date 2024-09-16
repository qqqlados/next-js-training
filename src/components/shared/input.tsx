import clsx from 'clsx'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import '@/globals.css'
import Loading from '@/app/(root)/feed/loading'

type Props = {
	text: string
	placeholder?: string
	type: 'text' | 'submit' | 'password' | 'checkbox' | 'radio' | 'file'
	register?: UseFormRegisterReturn<string>
	error?: FieldError
	className?: string
}

export default function Input({ text, placeholder, type, register, error, className }: Props) {
	return (
		<label className={clsx('form-control w-full mb-2 relative', className)}>
			<div className='label'>
				<span className='label-text'>{text}</span>
			</div>
			<input {...register} type={type} placeholder={placeholder} className='input input-bordered w-full' />
			{error && (
				<div className='label absolute left-0 bottom-[-26px]'>
					<span className='label-text-alt text-red-500'>{error.message}</span>
				</div>
			)}
		</label>
	)
}
