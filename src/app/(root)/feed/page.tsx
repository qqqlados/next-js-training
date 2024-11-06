import React, { Suspense } from 'react'
import { PostsList } from '@/components/shared/posts/posts-list'
import { SearchInput, Skeleton } from '@/ui'
import dynamic from 'next/dynamic'
import { PostListSkeletons } from '@/components/ui/skeletons'

const CreatePostModal = dynamic(() => import('@/components/ui/modals/create-post'), {
	loading: () => <Skeleton className='w-full h-full bg-gray-200'></Skeleton>,
})

export async function generateMetadata({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
	return {
		title: searchParams.search == undefined ? 'Feed | Next.js Training' : `${searchParams!.search} | Search`,
	}
}

export default function Feed({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
	const searchValue = searchParams.search

	return (
		<>
			<div className='flex justify-center relative w-full pb-1'>
				<SearchInput className='w-[400px]' placeholder='Search for posts...' />

				<div className='absolute right-10 top-0 w-[114px] h-[48px] rounded-xl'>
					<CreatePostModal />
				</div>
			</div>

			<div className='relative w-full h-[600px] px-3 overflow-y-auto'>
				<Suspense fallback={<PostListSkeletons />} key={searchValue}>
					<PostsList searchValue={searchValue} />
				</Suspense>
			</div>
		</>
	)
}
