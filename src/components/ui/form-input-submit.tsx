'use client'

import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'

export function FormInputSubmit({ text, disabled, className }: { text: string; disabled?: boolean; className?: string }) {
	const {
		formState: { errors, isValid },
	} = useFormContext()

	const isFormValid = isValid && Object.keys(errors).length === 0

	console.log(errors)

	return <input type='submit' className={clsx('btn btn-active btn-neutral', className)} value={text} disabled={!isFormValid || disabled} />
}
