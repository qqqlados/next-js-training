import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { toast } from 'sonner'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function closeModal(id: string) {
	const modal = document.getElementById(id) as HTMLDialogElement | null
	if (modal) modal.close()
}

export function showModal(id: string) {
	const modal = document.getElementById(id) as HTMLDialogElement | null
	if (modal) modal.showModal()
}

// export const toast = {
// 	success: () => toast
// }
