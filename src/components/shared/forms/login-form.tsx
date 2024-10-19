'use client'

import { FormInputSubmit } from '@/components/ui'
import { LoginFormSchema, LoginFormValues } from '@/lib/interfaces/form.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { FormInput } from '../form-input'
import { useCheckLogin } from '@/hooks'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Loading from '@/app/loading-component'
import { getUserCredentials } from '@/hooks/actions'
import { setCookie } from 'cookies-next'
import Link from 'next/link'

export function LoginForm() {
	const form = useForm<LoginFormValues>({
		mode: 'onChange',
		resolver: zodResolver(LoginFormSchema),
	})
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const onSubmit: SubmitHandler<LoginFormValues> = async data => {
		setLoading(true)

		const userIsPresent = await getUserCredentials({ email: data.email })

		await useCheckLogin({ name: 'email', email: data?.email, setError: form.setError, userIsPresent })

		await useCheckLogin({ name: 'password', password: data?.password, setError: form.setError, userIsPresent })

		if (Object.keys(form.formState.errors).length === 0) {
			setCookie('User', data.email)
			router.push('/feed')
		} else setLoading(false)
	}

	return (
		<FormProvider {...form}>
			<form className='relative max-w-[400px] w-full mx-auto' autoComplete='off' onSubmit={form.handleSubmit(onSubmit)}>
				<FormInput type='text' name='email' text='Your email' placeholder='example-user@gmail.com' />
				<FormInput type='password' name='password' text='Your password' placeholder='rabbit-234' />

				<div className='flex items-center gap-5 text-center justify-between w-full mt-5'>
					<FormInputSubmit text='Enter' className='w-[150px]' />
					<Link href='/register' className='underline'>
						Haven't had not an account yet? Please, register.
					</Link>
				</div>

				{loading && (
					<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.1)] z-10 backdrop-blur'>
						<Loading />
					</div>
				)}
			</form>
		</FormProvider>
	)
}
