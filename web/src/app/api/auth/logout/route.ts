import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // it redirects user to /
  const redirectURL = new URL('/', request.url)

  return NextResponse.redirect(redirectURL, {
    // it deletes the token
    headers: {
      'Set-Cookie': `token=; Path=/; max-age=0;`,
    },
  })
}
