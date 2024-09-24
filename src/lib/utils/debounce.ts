import { useEffect } from 'react'
import { boolean } from 'zod'

export function useDebounce(value: any, callback: () => void, delay: number) {
	useEffect(() => {
		if (value) {
			const handler = setTimeout(() => {
				callback()
			}, delay)

			return () => clearTimeout(handler)
		}
	}, [value])
}

export function useDebounceClickingLikes(value: boolean | null, callback: () => void, delay: number) {
	useEffect(() => {
		if (value === true || value === false) {
			const handler = setTimeout(() => {
				callback()
			}, delay)

			return () => clearTimeout(handler)
		}
	}, [value])
}
