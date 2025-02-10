'use client'

import { getCurrentUserId, updateProfileInfo } from '@/hooks/actions'
import { FormInput } from '../form-input'
import { FormInputSubmit, EditProfileImage } from '@/components/ui'
import { ProfileInfoSchema, ProfileInfoValues } from '@/lib/interfaces/form.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { closeModal } from '@/lib/utils/utils'
import Loading from '@/app/loading-component'
import { IUser } from '@/lib/interfaces/user.interface'
import { useCheckRegister } from '@/hooks'
import { API_URL } from '@/app/config'

export function EditProfileForm({ user }: { user?: IUser }) {
	const [loading, setLoading] = useState(false)
	const [uploadedImage, setUploadedImage] = useState<any>(null)

	const form = useForm<ProfileInfoValues>({
		mode: 'onChange',
		resolver: zodResolver(ProfileInfoSchema),
	})

	const { handleSubmit, reset, watch } = form

	const wasUsernameChanged = watch('username') !== user?.username

	const uploadImage = (imageFile: any) => {
		setUploadedImage(imageFile)
	}

	async function onSubmit() {
		setLoading(true)
		const userId = await getCurrentUserId(user?.email)

		if (wasUsernameChanged) {
			await useCheckRegister({ name: 'username', value: form.getValues('username'), setError: form.setError })
		}

		if (Object.keys(form.formState.errors).length === 0) {
			// if (uploadedImage) {
			const formData = new FormData()

			formData.append('username', form.getValues('username'))
			if (uploadedImage) formData.append('profileImage', uploadedImage)

			// await updateProfileInfo({
			// 	currentUserId: userId,
			// 	updatedUsername: form.getValues('username'),
			// 	// updatedImage: imageData,
			// })
			await fetch(`/uploads`, {
				method: 'POST',
				body: formData,
			}).then(res => res.json())
		}

		closeModal('edit_profile')
		setLoading(false)
	}

	useEffect(() => {
		if (user) {
			reset({
				username: user?.username,
			})
		}
	}, [user, reset])

	return (
		<>
			<EditProfileImage imageUrl={user?.imageUrl} uploadedImage={uploadedImage} uploadImage={uploadImage} />

			<FormProvider {...form}>
				<form className='relative' onSubmit={handleSubmit(onSubmit)}>
					<FormInput name='username' type='text' placeholder='johnny345' text='Write your new username' />

					<FormInputSubmit text='Save profile' className='mt-8 block mx-auto' disabled={!wasUsernameChanged} />
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
