'use client'

import { CircleUserRound } from 'lucide-react'
import { EditButton } from '../../ui/buttons/edit-button'
import { useRef } from 'react'

export function EditProfileImage({
	imageUrl,
	uploadedImage,
	uploadImage,
}: {
	imageUrl?: string
	uploadedImage: any
	uploadImage: (imageFile: FormData) => void
}) {
	const filePicker = useRef<HTMLInputElement>(null)

	const handlePick = () => {
		filePicker!.current!.click()
	}

	const handleChange = (ev: any) => {
		// const imageUrl2 = URL.createObjectURL(ev.target.files[0])

		uploadImage(ev.target.files[0])
	}

	return (
		<>
			<EditButton onClick={handlePick} />

			<input onChange={handleChange} type='file' ref={filePicker} className='opacity-0 invisible' />

			{imageUrl ? (
				<div>Hello</div>
			) : (
				<div
					style={{
						width: '150px',
						height: '150px',
						borderRadius: '50%',
						overflow: 'hidden',
						background: `url(${uploadedImage}) no-repeat center/cover`,
					}}
				>
					{!uploadedImage && <CircleUserRound width={150} height={150} stroke='#302f2f' />}
				</div>
			)}
		</>
	)
}
