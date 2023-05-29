import { connectToDatabase } from '@/util/database';
import Link from 'next/link';

export default function List({ posts }) {
  return (
    <div className='list-bg'>
      {posts.map((post) => {
        return (
          <div className='list-item' key={post._id}>
            <Link href={`/detail/${post._id}`} prefetch={false}>
              <h4>{post.title}</h4>
            </Link>
            <p>{post.description}</p>
            <Link href={`/edit/${post._id}`}>✏️</Link>
          </div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps() {
  const { client, db } = await connectToDatabase();
  const isConnected = client.topology.s.state === 'connected';
  let posts = [];

  if (isConnected) {
    posts = await db.collection('post').find({}).toArray();
    posts = JSON.parse(JSON.stringify(posts));
  }

  return {
    props: {
      posts,
    },
  };
}
