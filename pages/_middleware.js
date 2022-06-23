import { NextResponse } from 'next/server';
import checkJwt from '../helpers/checkJwt';

// eslint-disable-next-line no-unused-vars
export async function middleware(req, ev) {
  const { pathname } = req.nextUrl;
  let token = req.headers?.get('cookie')?.split('jwtToken=')[1];
  token = token?.split(';')[0];
  if (token) {
    const isAuth = Object.keys(checkJwt(token)).length > 0;
    if (isAuth && (pathname === '/api/login' || pathname === '/api/register')) {
      NextResponse.redirect('/dashboard');
    } else if (isAuth && pathname === '/') return NextResponse.redirect('/dashboard');
  } else {
    if (pathname === '/login') return;
    return NextResponse.redirect('/login');
  }
  return NextResponse.next();
}
