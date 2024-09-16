import Title from '@/components/shared/title'
import RegistrationForm from '@/components/ui/registration-form'

export default function Registration() {
	return (
		<div className='pt-10 mx-auto'>
			<div className='max-w-[700px] mx-auto mb-10'>
				<Title
					text={
						<p>
							Welcome to our service! <br /> If you're new user, create account.
						</p>
					}
				/>
			</div>

			<RegistrationForm />
		</div>
	)
}
