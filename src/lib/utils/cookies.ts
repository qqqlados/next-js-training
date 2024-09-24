import Cookies from 'js-cookie'
import { RegistrationFormValues } from '../interfaces/form.interface'

export class CookiesCheck {
	setUser(email: string) {
		Cookies.set('User', email)
	}

	getUser() {
		const user = Cookies.get('User')
		return user
	}
}
