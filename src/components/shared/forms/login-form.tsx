import { FormInputSubmit, Input } from '@/components/ui'

export function LoginForm() {
	return (
		<form className='relative max-w-[400px] w-full mx-auto' autoComplete='off'>
			<Input type='text' placeholder='example@user.com' label='Your email' />

			<Input type='password' label='Your password' />

			{/* <div className='w-full flex justify-center mt-5'>
				<FormInputSubmit text='Enter' className='w-[150px]' />
			</div> */}
		</form>
	)
}
