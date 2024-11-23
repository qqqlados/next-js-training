'use client'

import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { RegistrationFormValues, RegistrationFormSchema } from '@/lib/interfaces/form.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormInput } from '@/components'
import { FormInputSubmit, FormError } from '@/components/ui'
import { addUser } from '@/hooks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useCheckRegister } from '@/hooks'
import Loading from '@/app/loading-component'
import { signIn } from 'next-auth/react'
import { toast, Toaster } from 'sonner'

export function RegistrationForm({ openLoginForm }: { openLoginForm: () => void }) {
	const form = useForm<RegistrationFormValues>({
		mode: 'onChange',
		resolver: zodResolver(RegistrationFormSchema),
	})

	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const onSubmit: SubmitHandler<RegistrationFormValues> = async data => {
		try {
			setLoading(true)

			await useCheckRegister({ name: 'email', value: data.email, setError: form.setError })
			await useCheckRegister({ name: 'username', value: data.username, setError: form.setError })

			if (Object.keys(form.formState.errors).length === 0) {
				await addUser(data)

				const result = await signIn('credentials', {
					redirect: false,
					email: data?.email,
					password: data?.password,
				})

				if (result?.error) {
					form.setError('root', { message: 'Something went wrong.' })
				} else {
					toast.success('You have successfully registered.')

					router.push('/feed')
				}
			}
		} catch (err) {
			console.log(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='relative max-w-[400px] w-full mx-auto' autoComplete='off'>
					<FormInput type='text' name='email' text='Your email' placeholder='example-user@gmail.com' />

					<FormInput type='text' name='fullName' text='Your fullname' placeholder='Sebastian Moore' />

					<FormInput type='text' name='username' text='Your username' placeholder='rabbit-234' />

					<FormInput type='password' name='password' text='Your password' />

					<FormInput type='password' name='confirmPassword' text='Repeat your password' />

					<div className='flex items-center justify-between'>
						<FormInputSubmit text='Register new user' className='text-white mt-4' />

						<p className='cursor-default'>
							Already registered?{' '}
							<span onClick={() => openLoginForm()} className='underline cursor-pointer'>
								Log in.
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
