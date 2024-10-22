'use client'

import { getCurrentUserId, updatePost, updateProfileInfo } from '@/hooks/actions'
import { FormInput } from '../form-input'
import { FormInputSubmit, Textarea } from '@/components/ui'
import { CreatePostSchema, CreatePostValues, ProfileInfoSchema, ProfileInfoValues } from '@/lib/interfaces/form.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { closeModal } from '@/lib/utils/utils'
import Loading from '@/app/loading-component'
import { IPost } from '@/lib/interfaces/post.interface'
import { IUser } from '@/lib/interfaces/user.interface'
import { useCheckRegister } from '@/hooks'
import { Star } from 'lucide-react'

export function EditProfileForm({ user }: { user?: IUser }) {
	const [loading, setLoading] = useState(false)
	const [phoneInput, showPhoneInput] = useState(Boolean(user?.phone))

	const form = useForm<ProfileInfoValues>({
		mode: 'onChange',
		resolver: zodResolver(ProfileInfoSchema),
	})

	const { handleSubmit, reset } = form

	async function onSubmit() {
		setLoading(true)
		const userId = await getCurrentUserId(user?.email)

		await useCheckRegister({ name: 'username', value: form.getValues('username'), setError: form.setError })

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

	console.log(form.getValues('website'))

	useEffect(() => {
		if (user) {
			reset({
				username: user?.username,
				telephone: user?.phone,
				website: user?.website,
			})
		}
	}, [user, reset])

	return (
		<>
			<FormProvider {...form}>
				<form className='relative' onSubmit={handleSubmit(onSubmit)}>
					<FormInput name='username' type='text' placeholder='What a beautiful day!' text='Write your new username' />

					{!phoneInput && (
						<p onClick={() => showPhoneInput(true)} className='flex gap-1 absolute right-0 top-0 underline'>
							Add phone number*
						</p>
					)}

					{phoneInput && (
						<FormInput name='telephone' type='tel' placeholder='+380123456789' text={`${phoneInput ? 'Change' : 'Add'} your telephone number`} />
					)}

					<FormInput name='website' type='text' placeholder='instagram.com' text='Type your company website (optional)' />

					<FormInputSubmit text='Save profile' className='mt-8 block mx-auto' />
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
