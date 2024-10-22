'use client'

import { EditPostForm } from '@/components/shared/forms/edit-post-form'
import { showModal } from '@/lib/utils/utils'
import { Pencil } from 'lucide-react'
import clsx from 'clsx'
import Modal from './modal'
import { IUser } from '@/lib/interfaces/user.interface'
import { EditProfileForm } from '@/components/shared/forms/edit-profile-form'

export default function EditProfileModal({ user, className }: { user?: IUser; className?: string }) {
	return (
		<div className={className}>
			<button className={clsx('btn w-30', className)} onClick={() => showModal('edit_profile')}>
				<Pencil />
			</button>

			<Modal id='edit_profile'>
				<EditProfileForm user={user} />
			</Modal>
		</div>
	)
}
