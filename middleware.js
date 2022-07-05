import { NextResponse } from 'next/server';
export default function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const token = req.cookies.get('jwtToken');
  if ((pathname === '/login' || pathname === '/register') && token) {
    console.log('redirecting to /');
    const redirect =
      process.env.NODE_ENV === 'production'
        ? 'https://secretsforall.vercel.app'
        : 'http://localhost:3000';

    return NextResponse.redirect(`${redirect}/dashboard`);
  }
}
