'use client'

import { Title } from '@/components/shared'
import { LoginForm, RegistrationForm } from '@/components/shared/forms'
import { useState } from 'react'

export default function AuthSection() {
	const [login, setLogin] = useState(false)

	const openLoginForm = () => {
		setLogin(true)
	}

	const openRegistrationForm = () => {
		setLogin(false)
	}

	return (
		<div className='max-w-[700px] h-full'>
			{!login ? (
				<div className='flex flex-col justify-center h-full mb-10'>
					<Title
						text={
							<p>
								Welcome to our service! <br /> If you're new user, create account.
							</p>
						}
						className='mb-5'
					/>

					<RegistrationForm openLoginForm={openLoginForm} />
				</div>
			) : (
				<div className='flex flex-col justify-center h-full'>
					<Title
						text={
							<p>
								We are happy you are back! <br /> Please log in.
							</p>
						}
						className='mb-5'
					/>

					<LoginForm openRegistrationForm={openRegistrationForm} />
				</div>
			)}
		</div>
	)
}
