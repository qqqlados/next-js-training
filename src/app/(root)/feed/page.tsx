import { Suspense } from 'react'
import Loading from '../../loading-component'
import PostsList from '@/components/shared/posts-list'

export default async function Feed() {
	return (
		<>
			<h1 className='text-center mb-3'>Posts</h1>
			<div className='relative w-full h-[600px] overflow-y-auto px-3'>
				<Suspense fallback={<Loading />}>
					<PostsList />
				</Suspense>
			</div>
		</>
	)
}
