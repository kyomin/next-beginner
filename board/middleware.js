import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { nextUrl, cookies, headers } = request;

  // 사용자가 /list 페이지 접속 시 시간과 유저의 OS 정보를 터미널 출력
  if (nextUrl.pathname.startsWith('/list')) {
    console.log(headers.get('sec-ch-ua-platform'));
    console.log(new Date());

    return NextResponse.next();
  }

  // 미로그인 유저 /write 페이지 접속 시 로그인 페이지로 이동
  if (nextUrl.pathname.startsWith('/write')) {
    const session = await getToken({ req: request });

    if (!session) {
      return NextResponse.redirect(
        new URL('http://localhost:3000/api/auth/signin')
      );
    }
  }
}
