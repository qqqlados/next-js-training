'use client'

import { CreatePostForm } from '@/components/shared/forms'
import { showModal } from '@/lib/utils/utils'
import Modal from './modal'

export default function CreatePostModal({ userId, className }: { userId: string; className?: string }) {
	return (
		<div className={className}>
			<button className='btn' onClick={() => showModal('create_post')}>
				Create post
			</button>

			<Modal id='create_post'>
				<CreatePostForm userId={userId} />
			</Modal>
		</div>
	)
}
