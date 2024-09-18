'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { TRegistrationValues, RegistrationFormSchema } from '@/lib/interfaces/form.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputSubmit } from '@/ui'
import { CookiesCheck, useDebounce } from '@/lib/utils'
import { useState } from 'react'
import { Input } from '@/components'
import Loading from '@/app/loading-component'
import { useCheckDatabase, useNetworkFormError, useValidateUserData, addUser } from '@/hooks'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'

export function RegistrationForm() {
	// prettier-ignore
	const { register, handleSubmit, formState: { errors, isValid }, setError, clearErrors, watch } = useForm<TRegistrationValues>({
		mode: 'onChange',
		resolver: zodResolver(RegistrationFormSchema),
	})
	const [isEmail, setIsEmail] = useState<string | undefined>()
	const [isUsername, setIsUsername] = useState<string | undefined>()
	const [loading, setLoading] = useState(false)
	const [isError, setIsError] = useState<boolean>(false)

	const cookies = new CookiesCheck()

	const router = useRouter()

	const onSubmit: SubmitHandler<TRegistrationValues> = async data => {
		await addUser(data)
		cookies.setUser(JSON.stringify(data))
		router.push('/feed')
	}

	const email = watch('email')

	const username = watch('username')

	useDebounce(email, () => useCheckDatabase({ email, setIsEmail, setLoading, setIsError }), 900)

	useDebounce(username, () => useCheckDatabase({ username, setIsUsername, setLoading, setIsError }), 900)

	useValidateUserData({ isEmail, isUsername, setError, clearErrors })

	useNetworkFormError({ isError, setError, clearErrors })

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={clsx('max-w-[400px] w-full mx-auto', loading && 'pointer-events-none')} autoComplete='off'>
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
