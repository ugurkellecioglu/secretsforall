import { NextResponse } from 'next/server';
const jwt = require('jsonwebtoken');

var isAuth = false;
const checkJwt = (token) => {
  return jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      isAuth = false;
    } else {
      isAuth = true;
    }
    return decoded;
  });
};
// eslint-disable-next-line no-unused-vars
export async function middleware(req, ev) {
  const { pathname } = req.nextUrl;
  const token = req.headers?.get('cookie')?.split('=')[1];
  checkJwt(token);
  if (isAuth && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect('/dashboard');
  } else if (!isAuth && pathname === '/dashboard') {
    return NextResponse.redirect('/login');
  }

  return NextResponse.next();
}
