'use client'

import { showModal } from '@/lib/utils/utils'
import Modal from './modal'
import { IUser } from '@/lib/interfaces/user.interface'
import { EditProfileForm } from '@/components/shared/forms/edit-profile-form'
import { EditButton } from '../buttons/edit-button'

export default function EditProfileModal({ user, className }: { user?: IUser; className?: string }) {
	return (
		<div className={className}>
			<EditButton onClick={() => showModal('edit_profile')} />

			<Modal id='edit_profile'>
				<EditProfileForm user={user} />
			</Modal>
		</div>
	)
}
