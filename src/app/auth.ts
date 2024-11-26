import { getServerSession } from 'next-auth'
import { options } from './api/auth/[...nextauth]/options'

export const auth = async () => {
	return await getServerSession(options)
}
