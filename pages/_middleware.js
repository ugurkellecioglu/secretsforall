import { NextResponse } from 'next/server';
import checkJwt from '../helpers/checkJwt';

var isAuth = false;

// eslint-disable-next-line no-unused-vars
export async function middleware(req, ev) {
  const { pathname } = req.nextUrl;
  const token = req.headers?.get('cookie')?.split('jwt_token=')[1];
  if (token) {
    isAuth = Object.keys(checkJwt(token)).length > 0;
    if (isAuth && (pathname === '/api/login' || pathname === '/api/register')) {
      return NextResponse.redirect('/dashboard');
    }
  } else {
    if (pathname !== '/login' && pathname !== '/register') {
      return NextResponse.redirect('/login');
    }
  }
  return NextResponse.next();
}
