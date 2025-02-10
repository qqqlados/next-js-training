'use client'

import { EditPostForm } from '@/components/shared/forms/edit-post-form'
import { showModal } from '@/lib/utils/utils'
import { IPost } from '@/types/post.interface'
import Modal from './modal'
import { EditButton } from '../buttons/edit-button'

export default function EditPostModal({ userEmail, postData, className }: { userEmail?: string; postData?: IPost; className?: string }) {
	return (
		<div className={className}>
			<EditButton onClick={() => showModal('edit_post')} />

			<Modal id='edit_post'>
				<EditPostForm userEmail={userEmail} postData={postData} />
			</Modal>
		</div>
	)
}
