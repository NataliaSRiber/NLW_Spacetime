import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code') // code from github

  const redirectTo = request.cookies.get('redirectTo')?.value

  const registerResponse = await api.post('/register', {
    code,
  })

  const { token } = registerResponse.data

  // it redirects user  to redirectTo or to /
  const redirectURL = redirectTo ?? new URL('/', request.url)

  const cookieExpiresInSeconds = 60 * 60 * 24 * 30

  return NextResponse.redirect(redirectURL, {
    // it's saving the token information on cookie, path=/ all app can access the token
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds};`,
    },
  })
}
