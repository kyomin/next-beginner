import { connectToDatabase } from '@/util/database';
import { ObjectId } from 'mongodb';

export default function Edit({ post }) {
  const { _id, title, description } = post;

  return (
    <div className='p-20'>
      <h4>글 수정</h4>

      <form action='/api/post/update' method='POST'>
        <input name='title' defaultValue={title} placeholder='글 제목 입력' />
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
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { client, db } = await connectToDatabase();
  const isConnected = client.topology.s.state === 'connected';
  let post = {};

  if (isConnected) {
    // get dynamic route value in getServerSideProps
    const id = params._id;

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
