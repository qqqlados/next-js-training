'use client'

import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'

export function FormInputSubmit({ text, className }: { text: string; disabled?: boolean; className?: string }) {
	const {
		formState: { errors, isValid },
	} = useFormContext()

	return (
		<input
			type='submit'
			className={clsx('btn btn-active btn-neutral', className)}
			value={text}
			disabled={isValid && Object.keys(errors).length == 0 ? false : true}
		/>
	)
}
