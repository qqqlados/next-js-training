import { showModal } from '@/lib/utils/utils'
import clsx from 'clsx'
import { Pencil } from 'lucide-react'

export function EditButton({ onClick, className }: { onClick: () => void; className?: string }) {
	return (
		<button className={clsx('btn w-30 outline-none', className)} onClick={onClick}>
			<Pencil />
		</button>
	)
}
