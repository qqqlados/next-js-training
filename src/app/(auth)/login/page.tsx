import { Title } from '@/components/shared'
import { LoginForm } from '@/components/shared/forms'
import { cookies } from 'next/headers'

export default function Login() {
	const cookiesStore = cookies()

	function setCookies(data: string) {
		cookiesStore.set('User', data)
	}

	return (
		<div className='h-screen'>
			<div className='flex flex-col justify-center h-full mx-auto pb-[200px]'>
				<div className='max-w-[700px] mx-auto mb-10'>
					<Title
						text={
							<p>
								We are happy you are back! <br /> Please log in.
							</p>
						}
					/>
				</div>

				<LoginForm />
			</div>
		</div>
	)
}
