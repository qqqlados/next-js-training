import { showModal } from '@/lib/utils/utils'
import clsx from 'clsx'
import { Trash2 } from 'lucide-react'

export function DeleteButton({ modalName, className }: { modalName: string; className?: string }) {
	return (
		<button className={clsx('btn w-30', className)} onClick={() => showModal(`${modalName}`)}>
			<Trash2 />
		</button>
	)
}
