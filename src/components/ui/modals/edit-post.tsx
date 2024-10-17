'use client'

import { EditPostForm } from '@/components/shared/forms/edit-post-form'
import { showModal } from '@/lib/utils/utils'
import { Pencil } from 'lucide-react'
import { IPost } from '@/types/post.interface'
import clsx from 'clsx'
import Modal from './modal'

export default function EditPostModal({ userEmail, postData, className }: { userEmail?: string; postData?: IPost; className?: string }) {
	return (
		<div className={className}>
			<button className={clsx('btn w-30', className)} onClick={() => showModal('edit_post')}>
				<Pencil />
			</button>

			<Modal id='edit_post'>
				<EditPostForm userEmail={userEmail} postData={postData} />
			</Modal>
		</div>
	)
}
