'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { RegistrationFormValues, RegistrationFormSchema } from '@/lib/interfaces/form.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormError, FormInputSubmit } from '@/ui'
import { CookiesCheck } from '@/lib/utils'
import { FormInput } from '@/components'
import { addUser } from '@/hooks'
import { useRouter } from 'next/navigation'
import { FormProvider } from 'react-hook-form'
import { useState } from 'react'
import Loading from '@/app/loading-component'
import Link from 'next/link'

export function RegistrationForm() {
	const form = useForm<RegistrationFormValues>({
		mode: 'onChange',
		resolver: zodResolver(RegistrationFormSchema),
		defaultValues: {
			email: '',
			username: '',
			password: '',
			confirmPassword: '',
		},
	})

	const [loading, setLoading] = useState(false)

	const cookies = new CookiesCheck()

	const router = useRouter()

	const onSubmit: SubmitHandler<RegistrationFormValues> = async data => {
		setLoading(true)

		await addUser(data)

		cookies.setUser(data.email)

		router.push('/feed')
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='relative max-w-[400px] w-full mx-auto' autoComplete='off'>
				<FormInput
					type='text'
					name='email'
					text='Your email'
					placeholder='example-user@gmail.com'
					shouldCheckDatabase={true}
					customErrorMessage='Email already exists. Please, choose another $email'
				/>

				<FormInput
					type='text'
					name='username'
					text='Your username'
					placeholder='rabbit-234'
					shouldCheckDatabase={true}
					customErrorMessage='Username already exists. Please, choose another username'
				/>

				<FormInput type='password' name='password' text='Your password' />

				<FormInput type='password' name='confirmPassword' text='Repeat your password' />

				<div className='flex items-center justify-between'>
					<FormInputSubmit text='Registrate new user' className='text-white mt-4' />

					<Link href='/login' className='underline'>
						Registered? Log in
					</Link>
				</div>

				{form.formState.errors.root && <FormError text={form.formState.errors.root?.message?.toString()} className='text-lg' />}

				{loading && (
					<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.1)] z-10 backdrop-blur'>
						<Loading />
					</div>
				)}
			</form>
		</FormProvider>
	)
}
