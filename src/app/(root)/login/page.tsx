import { Title } from '@/components/shared'
import { LoginForm } from '@/components/shared/forms'

export default function Login() {
	return (
		<div className='pt-10 mx-auto'>
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
	)
}
