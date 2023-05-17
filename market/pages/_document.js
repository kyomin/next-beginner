/* Layout을 짜는 곳입니다. */
import { Html, Head, Main, NextScript } from 'next/document';
import Link from 'next/link';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        {/* Navigation Bar */}
        <div className='navbar'>
          <Link href='/'>홈</Link>
          <Link href='/list'>상품목록</Link>
          <Link href='/cart'>장바구니</Link>
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
