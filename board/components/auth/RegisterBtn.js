'use client';
import { useRouter } from 'next/navigation';

export default function RegisterBtn() {
  const router = useRouter();

  return <button onClick={() => router.push('/register')}>회원가입</button>;
}
