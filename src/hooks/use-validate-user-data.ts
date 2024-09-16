import { useEffect } from 'react'
import { UseFormSetError, UseFormClearErrors } from 'react-hook-form'

interface Props {
	isEmail?: string
	isUsername?: string
	setError: UseFormSetError<any>
	clearErrors: UseFormClearErrors<any>
}

export default function useValidateUserData({ isEmail, isUsername, setError, clearErrors }: Props) {
	useEffect(() => {
		if (isEmail) {
			setError('email', { type: 'custom', message: `Email already exists. Please, choose another email` })
		} else if (isUsername !== undefined) {
			setError('username', { type: 'custom', message: `Username already exists. Please, choose another username.` })
		} else if (isEmail == undefined) {
			clearErrors('email')
		} else if (isUsername == undefined) {
			clearErrors('username')
		}
	}, [isEmail, isUsername])
}
