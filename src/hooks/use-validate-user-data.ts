import { useEffect } from 'react'
import { UseFormSetError, UseFormClearErrors } from 'react-hook-form'

interface Props {
	name: string
	isData?: string
	setError: UseFormSetError<any>
	clearErrors: UseFormClearErrors<any>
}

export function useValidateUserData({ name, isData, setError, clearErrors }: Props) {
	useEffect(() => {
		if (isData) {
			setError(name, { type: 'custom', message: `${name.charAt(0).toUpperCase() + name.slice(1)} already exists. Please, choose another ${name}` })
		} else {
			clearErrors(name)
		}
	}, [isData])
}
