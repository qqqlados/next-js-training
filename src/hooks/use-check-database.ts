import { FieldValues, UseFormSetError } from 'react-hook-form'
import { IUser } from '@/lib/interfaces/user.interface'
import { LoginFormValues } from '@/lib/interfaces/form.interface'
import { getUserCredentials, getUsers } from './actions'

type Props = {
	name: string
	value: string
	setError: UseFormSetError<any>
}

export async function useCheckRegister({ name, value, setError }: Props) {
	try {
		const users = await getUsers()

		const isDataPresent = users?.find(user => user?.email === value || user?.username === value)

		if (isDataPresent) {
			setError(name, { type: 'manual', message: `${name.charAt(0).toUpperCase() + name.slice(1)} already exists` })
		}
	} catch (e: any) {
		console.error(e)
	}
}

export async function useCheckLogin({
	name,
	email,
	password,
	setError,
	userIsPresent,
}: {
	name: 'email' | 'password'
	email?: string
	password?: string
	setError: UseFormSetError<LoginFormValues>
	userIsPresent:
		| {
				email: string
				password: string
		  }
		| null
		| undefined
}) {
	try {
		// const user = res?.find(user => user?.email === email)
		if (!userIsPresent) {
			if (name === 'email') {
				setError('email', { type: 'manual', message: 'Email not found' })
			} else if (name === 'password') {
				setError('password', { type: 'manual', message: 'Incorrect password' })
			}
			return
		}

		if (email && email !== userIsPresent!.email) {
			setError(name, { type: 'manual', message: `Email not found` })
		}

		if (password && password !== userIsPresent!.password) {
			setError(name, { type: 'manual', message: `Incorrect password` })
		}
	} catch (e: any) {
		console.error(e)
	}
}
