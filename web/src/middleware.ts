import { NextRequest, NextResponse } from 'next/server'

const signInURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(signInURL, {
      headers: {
        // redirectTo, after login the user comes back to the previously URl
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20;`,
      },
    })
  }
  // if there's a token don't do anything
  return NextResponse.next()
}

// which endpoints i want to use the middleware(user needs to be logged in)
export const config = {
  matcher: '/memories/:path*',
}
