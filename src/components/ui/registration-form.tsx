'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { IRegistrationFormType, RegistrationFormSchema } from '@/lib/interfaces/form.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import InputSubmit from './input-submit'
import { CookiesCheck } from '@/lib/utils/cookies'
import { useCheckDatabase } from '@/hooks/use-check-database'
import useDebounce from '@/lib/utils/debounce'
import { useState } from 'react'
import Input from '../shared/input'
import Loading from '@/app/loading-component'
import useValidateUserData from '@/hooks/use-validate-user-data'
import useNetworkFormError from '@/hooks/use-network-form-error'
import { useRouter } from 'next/navigation'
import { prisma } from '../../../prisma/prisma-client'
import clsx from 'clsx'

export default function RegistrationForm() {
	// prettier-ignore
	const { register, handleSubmit, formState: { errors, isValid }, setError, clearErrors, watch } = useForm<IRegistrationFormType>({
		mode: 'onChange',
		resolver: zodResolver(RegistrationFormSchema),
	})
	const [isEmail, setIsEmail] = useState<string | undefined>()
	const [isUsername, setIsUsername] = useState<string | undefined>()
	const [loading, setLoading] = useState(false)
	const [isError, setIsError] = useState<boolean>(false)

	const cookies = new CookiesCheck()

	const router = useRouter()

	const onSubmit: SubmitHandler<IRegistrationFormType> = async data => {
		// console.log(data)

		try {
			setLoading(true)
			const response = await fetch(`http://localhost:3000/api/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: data.username,
					email: data.email,
					password: data.password,
				}),
			})

			const result = await response.json()

			if (response.ok) {
				cookies.setUser(data)
				router.push('/feed')
			} else {
				console.error('Error response:', result)
			}
		} catch (err) {
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	const email = watch('email')

	const username = watch('username')

	useDebounce(email, () => useCheckDatabase({ email, setIsEmail, setLoading, setIsError }), 900)

	useDebounce(username, () => useCheckDatabase({ username, setIsUsername, setLoading, setIsError }), 900)

	useValidateUserData({ isEmail, isUsername, setError, clearErrors })

	useNetworkFormError({ isError, setError, clearErrors })

	return (
		<form className={clsx('max-w-[400px] w-full mx-auto', loading && 'pointer-events-none')} onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
			<Input type='text' placeholder='example-user@gmail.com' text='Your email' register={register('email')} error={errors.email} />

			<Input type='text' placeholder='rabbit-234' text='Your username' register={register('username')} error={errors.username} />

			<Input type='password' text='Your password' register={register('password')} error={errors.password} />

			<Input type='password' text='Repeat password' register={register('confirmPassword')} error={errors.confirmPassword} />

			<InputSubmit text='Registrate new user' className='text-white mt-4' disabled={isValid && Object.keys(errors).length == 0 ? false : true} />
			{loading && <Loading />}

			{errors.root && <p className='text-red-500 text-center mt-3'>{errors.root.message}</p>}
		</form>
	)
}
