import Cookies from 'js-cookie'
import { IRegistrationFormType } from '../interfaces/form.interface'

export class CookiesCheck {
	setUser(userData: IRegistrationFormType) {
		Cookies.set('User', JSON.stringify(userData))
	}

	getUser() {
		const user = Cookies.get('User')
		return user
	}
}
