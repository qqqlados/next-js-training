import { IUser } from '../lib/interfaces/user.interface'

type Props = {
	area?: string
	setIsData?: React.Dispatch<React.SetStateAction<string | undefined>>
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
	setIsError: React.Dispatch<React.SetStateAction<boolean>>
}

export async function useCheckDatabase({ area, setIsData, setLoading, setIsError }: Props) {
	try {
		setLoading(true)

		const res: IUser[] = await fetch('/api/users').then(res => res.json())

		const isDataPresent = res?.map(user => user?.email).find(item => item == area)

		if (setIsData) setIsData(isDataPresent)

		setIsError(false)

		return { isDataPresent }
	} catch (e: any) {
		setIsError(true)
	} finally {
		setLoading(false)
	}
}
