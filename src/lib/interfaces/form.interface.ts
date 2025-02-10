import { z } from 'zod'

export const RegistrationFormSchema = z
	.object({
		email: z
			.string()
			.min(6, { message: 'Email must contain minimum 6 characters' })
			.max(30, { message: 'Email must not exceed 20 characters' })
			.email(),
		fullName: z
			.string()
			.min(8, { message: 'Full name must contain minimum 6 characters' })
			.max(30, { message: 'Full name must not exceed 20 characters' })
			.regex(/^[A-Za-z]+\s[A-Za-z]+$/, { message: 'Full name must contain exactly two words separated by a space' }),
		username: z
			.string()
			.min(5, { message: 'Username must contain minimum 5 characters' })
			.max(15, { message: 'Username must not exceed 15 characters' }),
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

export type RegistrationFormValues = z.infer<typeof RegistrationFormSchema>

export const LoginFormSchema = z.object({
	email: z
		.string()
		.min(6, { message: 'Email must contain minimum 6 characters' })
		.max(30, { message: 'Email must not exceed 20 characters' })
		.email(),
	password: z
		.string()
		.min(8, { message: 'Password must contain minimum 8 characters' })
		.max(20, { message: 'Password must not exceed 20 characters' }),
})

export type LoginFormValues = z.infer<typeof RegistrationFormSchema>

export const CreatePostSchema = z.object({
	title: z.string().min(6, { message: 'Write a title with more than 5 characters' }).max(82, { message: 'Post title cannot exceed 82 characters.' }),
	body: z
		.string()
		.min(15, { message: 'Write a post body with more than 15 characters' })
		.max(450, { message: 'Post body cannot exceed 450 characters.' }),
})

export type CreatePostValues = z.infer<typeof CreatePostSchema>

export const ProfileInfoSchema = z.object({
	username: z
		.string()
		.min(5, { message: 'Username must contain minimum 5 characters' })
		.max(15, { message: 'Username must not exceed 15 characters' }),
})

export type ProfileInfoValues = z.infer<typeof ProfileInfoSchema>
