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
          <Link href='/' className='logo'>
            Home
          </Link>
          <Link href='/list'>List</Link>
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
