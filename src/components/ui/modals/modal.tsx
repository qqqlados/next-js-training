import clsx from 'clsx'
import { ReactNode } from 'react'

export default function Modal({ children, id, className }: { children: ReactNode; id: string; className?: string }) {
	return (
		<dialog id={id} className={clsx('modal', className)}>
			<div className='modal-box w-[500px]'>
				<form method='dialog'>
					<button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
				</form>

				{children}
			</div>
			<form method='dialog' className='modal-backdrop'>
				<button>close</button>
			</form>
		</dialog>
	)
}
