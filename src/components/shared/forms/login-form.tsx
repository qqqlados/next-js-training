'use client'

import { FormInputSubmit } from '@/components/ui'
import { LoginFormSchema, LoginFormValues } from '@/lib/interfaces/form.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { FormInput } from '../form-input'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Loading from '@/app/loading-component'
import { signIn } from 'next-auth/react'
import { Toaster, toast } from 'sonner'

export function LoginForm({ openRegistrationForm }: { openRegistrationForm: () => void }) {
	const form = useForm<LoginFormValues>({
		mode: 'onChange',
		resolver: zodResolver(LoginFormSchema),
	})
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const onSubmit: SubmitHandler<LoginFormValues> = async data => {
		try {
			setLoading(true)

			const result = await signIn('credentials', {
				redirect: false,
				email: data.email,
				password: data.password,
			})

			if (result?.error === 'user_not_found') {
				form.setError('email', { message: 'User was not found' })
			} else if (result?.error === 'incorrect_password') {
				form.setError('password', { message: 'Incorrect password' })
			} else {
				toast.success('You have successfully logged in')

				router.push(`/feed`)
			}
		} catch (err) {
			throw new Error()
		}
	}

	return (
		<>
			<FormProvider {...form}>
				<form className='relative max-w-[400px] w-full mx-auto' autoComplete='off' onSubmit={form.handleSubmit(onSubmit)}>
					<FormInput type='text' name='email' text='Your email' placeholder='example-user@gmail.com' />
					<FormInput type='password' name='password' text='Your password' placeholder='rabbit-234' />

					<div className='flex items-center gap-5 text-center justify-between w-full mt-5'>
						<FormInputSubmit text='Enter' className='w-[150px]' />

						<p className='cursor-default'>
							Haven't had not an account yet?{' '}
							<span onClick={() => openRegistrationForm()} className='underline cursor-pointer'>
								Please, register.
							</span>
						</p>
					</div>

					{loading && (
						<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.1)] z-10 backdrop-blur'>
							<Loading />
						</div>
					)}
				</form>
			</FormProvider>
			<Toaster position='top-center' />
		</>
	)
}
