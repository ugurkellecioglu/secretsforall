import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
const checkJwt = (token) => {
  return jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });
};

// eslint-disable-next-line no-unused-vars
export async function middleware(req, ev) {
  const { pathname } = req.nextUrl;
  let token = req.headers?.get('cookie')?.split('jwtToken=')[1];
  token = token?.split(';')[0];
  if (token && token !== 'undefined') {
    const isAuth = Object.keys(checkJwt(token)).length > 0;
    if (isAuth && (pathname === '/api/login' || pathname === '/api/register')) {
      NextResponse.redirect('/dashboard');
    } else if (isAuth && pathname === '/') return NextResponse.redirect('/dashboard');
  } else {
    if (pathname === '/login' || pathname === '/register') return;
    if (!pathname.includes('/api/')) return NextResponse.redirect('/login');
  }
  return NextResponse.next();
}
