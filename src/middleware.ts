import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
	const { cookies, nextUrl } = request

	const { pathname } = request.nextUrl

	const token = cookies.get('next-auth.session-token')
	const isAuthorized = !!token
	const isAuthPage = nextUrl.pathname === '/auth'

	if (!isAuthorized && !isAuthPage) {
		return NextResponse.redirect(new URL('/auth', request.url))
	}

	if (pathname.startsWith('/auth') && isAuthorized) {
		return NextResponse.redirect(new URL('/feed', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/auth', '/feed', '/users', '/my-profile'],
}
