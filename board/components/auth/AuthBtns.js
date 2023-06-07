'use client';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import LoginBtn from './LoginBtn';
import LogoutBtn from './LogoutBtn';
import RegisterBtn from './RegisterBtn';

export default function AuthBtns() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await axios.get('/api/auth/me');

    setUser(response.data ? response.data.user : null);
  };

  return (
    <div>
      {!user ? (
        <Fragment>
          <LoginBtn />
          <RegisterBtn />
        </Fragment>
      ) : (
        <Fragment>
          <span className='mr-10'>{user.name}님 환영합니다.</span>
          <LogoutBtn />
        </Fragment>
      )}
    </div>
  );
}
