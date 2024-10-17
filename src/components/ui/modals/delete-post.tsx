'use client'

import { showModal } from '@/lib/utils/utils'
import { Trash2 } from 'lucide-react'
import clsx from 'clsx'
import Modal from './modal'
import { deletePost } from '@/hooks/actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Loading from '@/app/loading-component'

export default function DeletePostModal({ postId, className }: { postId?: string; className?: string }) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const router = useRouter()

	async function handleDelete(postId?: string) {
		setLoading(true)
		try {
			await deletePost(postId)
		} catch (err) {
			setError('Something went wrong. Try again later.')
		} finally {
			setLoading(false)
			router.back()
		}
	}

	return (
		<div className={className}>
			<button className={clsx('btn w-30', className)} onClick={() => showModal('delete_post')}>
				<Trash2 />
			</button>

			<Modal id='delete_post'>
				<div className='h-[130px] flex flex-col items-center gap-5'>
					<h2 className='text-center text-lg text-stone-700'>
						Are you sure? <br /> This post will be deleted permanently.
					</h2>

					<div className='flex gap-2'>
						<button className='btn btn-primary w-20' onClick={() => handleDelete(postId)}>
							Yes
						</button>
						<button className='btn w-20'>No</button>
					</div>
				</div>

				{loading && (
					<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.1)] z-10 backdrop-blur'>
						<Loading />
					</div>
				)}
			</Modal>
		</div>
	)
}
