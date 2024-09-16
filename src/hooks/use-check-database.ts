import { IUser } from '../lib/interfaces/user.interface'

type Props = {
	email?: string
	username?: string
	setIsEmail?: React.Dispatch<React.SetStateAction<string | undefined>>
	setIsUsername?: React.Dispatch<React.SetStateAction<string | undefined>>
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
	setIsError: React.Dispatch<React.SetStateAction<boolean>>
}

export async function useCheckDatabase({ email, username, setIsEmail, setIsUsername, setLoading, setIsError }: Props) {
	try {
		setLoading(true)

		const res: IUser[] = await fetch('/api/users').then(res => res.json())

		const isEmail = res?.map(user => user?.email).find(item => item == email)

		if (setIsEmail) setIsEmail(isEmail)

		const isUsername = res?.map(user => user?.username).find(item => item == username)

		if (setIsUsername) setIsUsername(isUsername)

		setIsError(false)

		return { isEmail, isUsername }
	} catch (e: any) {
		setIsError(true)
	} finally {
		setLoading(false)
	}
}
