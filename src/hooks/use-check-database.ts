import { UseFormSetError } from 'react-hook-form'
import { getUsers } from './actions'

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
