import { Title } from '@/components'
import { RegistrationForm } from '@/components/shared/forms'

export default function Registration() {
	return (
		<div className='h-screen'>
			<div className='flex flex-col justify-center h-full max-w-[700px] mx-auto mb-10'>
				<Title
					text={
						<p>
							Welcome to our service! <br /> If you're new user, create account.
						</p>
					}
					className='mb-5'
				/>

				<RegistrationForm />
			</div>
		</div>
	)
}
