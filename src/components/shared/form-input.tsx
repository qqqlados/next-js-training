'use client'

import '@/globals.css'
import { Input } from '@/ui'
import { useFormContext } from 'react-hook-form'
import { useDebounce } from '@/lib/utils'
import { useCheckDatabase, useNetworkFormError, useValidateUserData } from '@/hooks'
import { useState } from 'react'
import { FormError } from '@/ui'
import Loading from '@/app/loading-component'
import clsx from 'clsx'

type Props = {
	text?: string
	name: string
	placeholder?: string
	type: 'text' | 'password' | 'checkbox' | 'radio'
	shouldCheckDatabase?: boolean
	className?: string
}

export function FormInput(props: Props) {
	const { text, name, placeholder, type, shouldCheckDatabase, className } = props

	const {
		register,
		watch,
		formState: { errors },
		setError,
		clearErrors,
	} = useFormContext()

	const [isData, setIsData] = useState<string | undefined>(undefined)
	const [loading, setLoading] = useState(false)
	const [isError, setIsError] = useState<boolean>(false)

	const area = watch(name)
	const errorText = errors[name]?.message as string

	if (shouldCheckDatabase) {
		useDebounce(area, () => useCheckDatabase({ area, setIsData, setLoading, setIsError }), 900)

		useValidateUserData({ isData, name, setError, clearErrors })

		useNetworkFormError({ isError, setError, clearErrors })
	}

	return (
		<div className={clsx('relative', loading && 'pointer-events-none')}>
			<label className={clsx('form-control w-full mb-2 relative', className)}>
				<div className='label'>
					<span className='label-text'>{text}</span>
				</div>
				<input {...register(name)} type={type} placeholder={placeholder} className='input input-bordered w-full' />
			</label>

			{loading && (
				<div className='absolute right-[50px] top-1/2'>
					<Loading />
				</div>
			)}

			{errors[name] && !errors.root && <FormError text={errorText} />}
		</div>
	)
}
