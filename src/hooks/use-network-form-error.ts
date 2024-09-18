import { useEffect } from 'react'
import { UseFormClearErrors, UseFormSetError } from 'react-hook-form'

type Props = {
	isError: boolean
	setError: UseFormSetError<any>
	clearErrors: UseFormClearErrors<any>
}

export function useNetworkFormError({ isError, setError, clearErrors }: Props) {
	useEffect(() => {
		if (isError) {
			setError('root', {
				type: 'custom',
				message: 'A network error occurred. Try again later.',
			})
		} else if (!isError) clearErrors('root')
	}, [isError])
}
