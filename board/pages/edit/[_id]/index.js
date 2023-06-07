import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default function Edit({ post }) {
  const [user, setUser] = useState(null);
  const { _id, title, description, author } = post;

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await axios.get('/api/auth/me');

    setUser(response.data ? response.data.user : null);
  };

  return (
    <div className='p-20'>
      {!user ? (
        <Fragment>
          <h4>글을 수정하려면 로그인해 주십시오!</h4>
        </Fragment>
      ) : user.email === author ? (
        <Fragment>
          <h4>글 수정</h4>

          <form action='/api/post/update' method='POST'>
            <input
              name='title'
              defaultValue={title}
              placeholder='글 제목 입력'
            />
            <input
              name='description'
              defaultValue={description}
              placeholder='글 내용 입력'
            />
            <input
              style={{ display: 'none' }}
              name='_id'
              defaultValue={_id.toString()}
            />
            <button type='submit'>수정</button>
          </form>
        </Fragment>
      ) : (
        <Fragment>
          <h4>내가 작성한 글이 아니라 수정할 수 없습니다!</h4>
        </Fragment>
      )}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const client = await connectDB;
  const isConnected = client.topology.s.state === 'connected';
  let post = {};

  if (isConnected) {
    const id = params._id; // get dynamic route value in getServerSideProps
    const db = client.db('board');

    try {
      post = await db.collection('post').findOne({ _id: new ObjectId(id) });
      post = JSON.parse(JSON.stringify(post));
    } catch (err) {
      console.error(err);
    }
  }

  return {
    props: {
      post,
    },
  };
}
