'use client'

import { getCurrentUserId, updateProfileInfo } from '@/hooks/actions'
import { FormInput } from '../form-input'
import { FormInputSubmit } from '@/components/ui'
import { ProfileInfoSchema, ProfileInfoValues } from '@/lib/interfaces/form.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { closeModal } from '@/lib/utils/utils'
import Loading from '@/app/loading-component'
import { IUser } from '@/lib/interfaces/user.interface'
import { useCheckRegister } from '@/hooks'

export function EditProfileForm({ user }: { user?: IUser }) {
	const [loading, setLoading] = useState(false)
	const [phoneInput, showPhoneInput] = useState(Boolean(user?.phone))

	const form = useForm<ProfileInfoValues>({
		mode: 'onChange',
		resolver: zodResolver(ProfileInfoSchema),
		defaultValues: {
			username: '',
			telephone: '',
			website: '',
		},
	})

	const { handleSubmit, reset, watch } = form

	const isFormChanged = (): boolean => {
		return watch('username') !== user?.username || watch('telephone') !== user?.phone || watch('website') !== user?.website
	}

	const wasUsernameChanged = watch('username') !== user?.username

	async function onSubmit() {
		setLoading(true)
		const userId = await getCurrentUserId(user?.email)

		if (wasUsernameChanged) {
			await useCheckRegister({ name: 'username', value: form.getValues('username'), setError: form.setError })
		}

		if (Object.keys(form.formState.errors).length === 0) {
			await updateProfileInfo({
				currentUserId: userId,
				updatedUsername: form.getValues('username'),
				updatedTelephone: form.getValues('telephone'),
				updatedWebsite: form.getValues('website'),
			})
		}

		closeModal('edit_profile')
		setLoading(false)
	}

	useEffect(() => {
		if (user) {
			reset({
				username: user?.username,
				telephone: user?.phone || '',
				website: user?.website || '',
			})
		}
	}, [user, reset])

	return (
		<>
			<FormProvider {...form}>
				<form className='relative' onSubmit={handleSubmit(onSubmit)}>
					<FormInput name='username' type='text' placeholder='johnny345' text='Write your new username' />

					{phoneInput && (
						<FormInput
							name='telephone'
							type='tel'
							placeholder='+380123456789'
							text={
								<>
									{`${Boolean(user?.phone) ? 'Change' : 'Add'} your telephone number `}
									<span style={{ color: 'red' }}>*</span>
								</>
							}
						/>
					)}

					<div className='relative'>
						<FormInput name='website' type='text' placeholder='instagram.com' text='Type your company website' />

						{!phoneInput && (
							<div className='flex gap-1 absolute right-0 bottom-[-30px] '>
								<p onClick={() => showPhoneInput(prev => !prev)} className='text-md underline cursor-pointer'>
									Add phone number
								</p>
								<span className='text-red-500 no-underline'>*</span>
							</div>
						)}
					</div>

					<FormInputSubmit text='Save profile' className='mt-8 block mx-auto' disabled={!isFormChanged()} />
				</form>
			</FormProvider>
			{loading && (
				<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.1)] z-10 backdrop-blur'>
					<Loading />
				</div>
			)}
		</>
	)
}
