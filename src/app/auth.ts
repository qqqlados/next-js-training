import { getServerSession } from 'next-auth'
import { options } from './api/auth/[...nextauth]/options'

export const auth = async (req?: Request, res?: Response) => {
	return await getServerSession(options)
}
