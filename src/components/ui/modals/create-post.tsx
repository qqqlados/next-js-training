'use client'

import { CreatePostForm } from '@/components/shared/forms'
import { showModal } from '@/lib/utils/utils'
import Modal from './modal'

export default function CreatePostModal({ className }: { className?: string }) {
	return (
		<div className={className}>
			<button className='btn' onClick={() => showModal('create_post')}>
				Create post
			</button>

			<Modal id='create_post'>
				<CreatePostForm />
			</Modal>
		</div>
	)
}
