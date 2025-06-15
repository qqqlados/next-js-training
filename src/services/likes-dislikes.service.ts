export async function addLike({ postId, userId }: { postId?: string; userId?: string }) {
	const res = await fetch(`/api/like`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ postId, userId }),
	})

	if (!res.ok) {
		const errorData = await res.json()

		if (res.status === 400) {
			return { message: errorData.message, error: 400 }
		} else if (res.status === 500) {
			return { message: errorData.message, error: 500 }
		}
	}

	return res.json()
}

export async function removeLike(postId?: string) {
	const res = await fetch('/api/like', {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({}),
	})

	if (!res.ok) {
		const errorData = await res.json()
		if (res.status === 400) {
			return { message: errorData.message, error: 400 }
		} else if (res.status === 500) {
			return { message: errorData.message, error: 500 }
		}
	}

	return res.json()
}
