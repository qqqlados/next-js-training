import React, { Suspense } from 'react'
import { PostsList } from '@/components/shared/posts/posts-list'
import { SearchInput } from '@/ui'
import dynamic from 'next/dynamic'
import { PostListSkeletons } from '@/components/ui/skeletons'
import { cookies } from 'next/headers'

const CreatePostModal = dynamic(() => import('@/components/ui/modals/create-post'), { ssr: false })

export default function Feed({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
	const searchValue = searchParams.search

	return (
		<>
			<div className='flex justify-center relative w-full pb-1'>
				<SearchInput className='w-[400px]' placeholder='Search for posts...' />
				<CreatePostModal className='absolute right-10 top-0' />
			</div>

			<div className='relative w-full h-[600px] px-3 overflow-y-auto'>
				<Suspense fallback={<PostListSkeletons />} key={searchValue}>
					<PostsList searchValue={searchValue} />
				</Suspense>
			</div>
		</>
	)
}
