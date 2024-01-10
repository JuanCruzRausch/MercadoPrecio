import { NextResponse } from 'next/server';

export async function middleware(request) {
  const jwt = request.cookies.get('jwt');

  if (jwt === undefined) {
    return NextResponse.redirect(new URL('/ingresa', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/mis-puntajes', '/profile'],
};
