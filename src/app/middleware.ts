// import { NextRequest, NextResponse } from 'next/server'
// import { auth } from './auth'

// export async function middleware(req: NextRequest) {
// 	const session = await auth(req)

// 	console.log(session)

// 	if (!session || !session.user!.token) {
// 		return NextResponse.redirect(new URL('/auth', req.url))
// 	}

// 	return NextResponse.next()
// }
