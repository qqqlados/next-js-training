'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

const LikeDislikeContext = createContext<
	| {
			isLiked?: boolean
			isDisliked?: boolean
			likes?: number
			dislikes?: number
			isInitiallyLiked?: boolean
			isInitiallyDisliked?: boolean
			toggleLike: () => void
			toggleDislike: () => void
	  }
	| undefined
>(undefined)

export function LikeDislikeProvider({
	children,
	isInitiallyLiked,
	isInitiallyDisliked,
	likesCount,
	dislikesCount,
}: {
	children: ReactNode
	isInitiallyLiked?: boolean
	isInitiallyDisliked?: boolean
	likesCount?: number
	dislikesCount?: number
}) {
	const [isLiked, setIsLiked] = useState(isInitiallyLiked)
	const [isDisliked, setIsDisliked] = useState(isInitiallyDisliked)

	const [likes, setLikes] = useState(likesCount)

	const [dislikes, setDislikes] = useState(dislikesCount)

	function toggleLike() {
		setIsLiked(prev => !prev)

		setLikes(isLiked == false ? prev => prev! + 1 : prev => prev! - 1)

		if (isDisliked) {
			setIsDisliked(false)

			setDislikes(prev => prev! - 1)
		}
	}

	function toggleDislike() {
		setIsDisliked(prev => !prev)

		setDislikes(isDisliked == false ? prev => prev! + 1 : dislikes! > 0 ? prev => prev! - 1 : undefined)

		if (isLiked) {
			setIsLiked(false)

			setLikes(prev => prev! - 1)
		}
	}

	return (
		<LikeDislikeContext.Provider value={{ isLiked, isDisliked, toggleLike, toggleDislike, likes, dislikes, isInitiallyLiked, isInitiallyDisliked }}>
			{children}
		</LikeDislikeContext.Provider>
	)
}

export function useLikeDislikeContext() {
	const context = useContext(LikeDislikeContext)
	if (context === undefined) {
		throw new Error('useLikeDislike must be used within a LikeDislikeProvider')
	}
	return context
}
