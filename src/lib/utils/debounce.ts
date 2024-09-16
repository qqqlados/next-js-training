import { useEffect } from 'react'

export default function useDebounce(value: string, callback: () => void, delay: number) {
	useEffect(() => {
		if (value) {
			const handler = setTimeout(() => {
				callback()
			}, delay)

			return () => clearTimeout(handler)
		}
	}, [value])
}
