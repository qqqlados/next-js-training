'use client'

import { useFormContext } from 'react-hook-form'
import { FormError } from './form-error'

export function Textarea({ name, label, placeholder }: { name: string; label: string; placeholder: string }) {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	const errorText = errors[name]?.message as string

	return (
		<label className='form-control relative'>
			<div className='label'>
				<span className='label-text'>{label}</span>
			</div>
			<textarea
				{...register(name)}
				className='textarea textarea-bordered w-full resize-none placeholder:text-base'
				placeholder={placeholder}
				rows={10}
			></textarea>
			{errors[name] && <FormError text={errorText} />}
		</label>
	)
}
