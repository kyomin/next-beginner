import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default function Detail({ post }) {
  return (
    <div className='p-20'>
      <h4>상세 페이지</h4>
      <h4>{post.title}</h4>
      <p>{post.description}</p>
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
