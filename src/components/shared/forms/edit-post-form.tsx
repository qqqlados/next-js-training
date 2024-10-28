'use client'

import { getCurrentUserId, updatePost } from '@/hooks/actions'
import { FormInput } from '../form-input'
import { FormInputSubmit, Textarea } from '@/components/ui'
import { CreatePostSchema, CreatePostValues } from '@/lib/interfaces/form.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { closeModal } from '@/lib/utils/utils'
import Loading from '@/app/loading-component'
import { IPost } from '@/lib/interfaces/post.interface'
import { toast, Toaster } from 'sonner'

export function EditPostForm({ userEmail, postData }: { userEmail?: string; postData?: IPost }) {
	const [loading, setLoading] = useState(false)

	const form = useForm<CreatePostValues>({
		mode: 'onBlur',
		resolver: zodResolver(CreatePostSchema),
	})

	const { handleSubmit, reset, watch } = form

	const isFormChanged = (): boolean => {
		return watch('title') !== postData?.title || watch('body') !== postData?.body
	}

	async function onSubmit(data: CreatePostValues) {
		setLoading(true)
		const userId = await getCurrentUserId(userEmail)

		toast.promise(updatePost({ postId: postData?.id, userId, title: form.getValues('title'), body: form.getValues('body') }), {
			loading: 'Editing post...',
			success: 'Post updated successfully',
			error: 'Failed to update the post',
		})

		closeModal('edit_post')
		setLoading(false)
	}

	useEffect(() => {
		if (postData) {
			reset({
				title: postData.title,
				body: postData.body,
			})
		}
	}, [postData, reset])

	return (
		<>
			<FormProvider {...form}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormInput name='title' type='text' placeholder='What a beautiful day!' text='Type post title' />

					<Textarea name='body' label='Type post description' placeholder='I just walked out and saw that...' />

					<FormInputSubmit text='Edit post' className='mt-8 block mx-auto' disabled={!isFormChanged()} />
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
