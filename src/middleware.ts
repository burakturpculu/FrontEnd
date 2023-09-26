
import { NextRequest, NextResponse } from 'next/server'
import { BaseRoutes } from './app/constant/base-routes'

export const config = { matcher: ['/', '/auth/:path*', '/dashboard/:path*'] }

const authOnlyRoutes = [/^\/dashboard\/?.*/]
const noAuthRoutes = [/^\/auth\/?.*/]

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  if (!path || path === '/') {
    return NextResponse.redirect(new URL(BaseRoutes.auth, request.url))
  }



  return NextResponse.next()
}