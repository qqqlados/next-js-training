'use client'

import '@/globals.css'
import { useFormContext } from 'react-hook-form'
import clsx from 'clsx'

type Props = {
	text?: string
	name: string
	placeholder?: string
	type: 'text' | 'password' | 'checkbox' | 'radio' | 'tel'
	className?: string
}

export function FormInput({ text, name, placeholder, type, className }: Props) {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	const errorText = errors[name]?.message as string

	return (
		<div className='relative'>
			<label className={clsx('form-control w-full mb-2 relative', className)}>
				<div className='label'>
					<span className='label-text'>{text}</span>
				</div>
				<input {...register(name)} type={type} placeholder={placeholder} className='input input-bordered w-full' />
			</label>

			{errors[name] && <span className='text-red-600'>{errorText}</span>}
		</div>
	)
}
