import Cookies from 'js-cookie'

export class CookiesCheck {
	setUser(email: string) {
		Cookies.set('User', email)
	}

	getUser() {
		const user = Cookies.get('User')
		return user
	}
}
