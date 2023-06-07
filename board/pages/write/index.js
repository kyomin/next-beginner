import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

export default function Write() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await axios.get('/api/auth/me');

    setUser(response.data ? response.data.user : null);
  };

  return (
    <div className='p-20'>
      {user ? (
        <Fragment>
          <h4>글 작성</h4>

          <form action='/api/post/create' method='POST'>
            <input name='title' placeholder='글 제목 입력' />
            <input name='description' placeholder='글 내용 입력' />
            <button type='submit'>작성</button>
          </form>
        </Fragment>
      ) : (
        <Fragment>
          <h4>글을 작성하려면 로그인해 주십시오!</h4>
        </Fragment>
      )}
    </div>
  );
}
