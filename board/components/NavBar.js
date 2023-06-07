import Link from 'next/link';
import AuthBtns from './auth/AuthBtns';

export default function NavBar() {
  return (
    <div className='navbar'>
      <div>
        <Link href='/' className='logo'>
          Home
        </Link>
        <Link href='/list'>List</Link>
        <Link href='/write'>Write</Link>
      </div>
      <AuthBtns />
    </div>
  );
}
