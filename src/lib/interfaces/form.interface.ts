import { string, z } from 'zod'

export const RegistrationFormSchema = z
	.object({
		email: z
			.string()
			.min(6, { message: 'Email must contain minimum 6 characters' })
			.max(30, { message: 'Email must not exceed 20 characters' })
			.email(),
		username: z
			.string()
			.min(5, { message: 'Username must contain minimum 5 characters' })
			.max(12, { message: 'Username must not exceed 12 characters' }),
		password: z
			.string()
			.min(8, { message: 'Password must contain minimum 8 characters' })
			.max(20, { message: 'Password must not exceed 20 characters' }),
		confirmPassword: z.string(),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	})

export type IRegistrationFormType = z.infer<typeof RegistrationFormSchema>
