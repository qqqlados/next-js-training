'use client'

import { addPost, getCurrentUserId } from '@/hooks/actions'
import { FormInput } from '../form-input'
import { FormInputSubmit, Textarea } from '@/components/ui'
import { CreatePostSchema, CreatePostValues } from '@/lib/interfaces/form.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useCheckUser } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { revalidateTag } from 'next/cache'
import { closeModal } from '@/lib/utils/utils'
import Loading from '@/app/loading-component'

export function CreatePostForm() {
	const [loading, setLoading] = useState(false)

	const form = useForm<CreatePostValues>({
		mode: 'onBlur',
		resolver: zodResolver(CreatePostSchema),
	})

	const {
		handleSubmit,
		reset,
		formState: { isSubmitSuccessful },
	} = form

	const { user } = useCheckUser()

	async function onSubmit() {
		setLoading(true)
		const userIdObject = await getCurrentUserId(user)

		await addPost({ userId: userIdObject!, title: form.getValues('title'), body: form.getValues('body') })

		setLoading(false)

		closeModal('create_post')
	}

	useEffect(() => {
		reset({
			title: '',
			body: '',
		})
	}, [isSubmitSuccessful])

	return (
		<>
			<FormProvider {...form}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormInput name='title' type='text' placeholder='What a beautiful day!' text='Type post title' />

					<Textarea name='body' label='Type post description' placeholder='I just walked out and saw that...' />

					<FormInputSubmit text='Create post' className='mt-8 block mx-auto' />
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
