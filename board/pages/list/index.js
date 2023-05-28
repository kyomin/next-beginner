import { connectToDatabase } from '@/util/database';
import Link from 'next/link';

export default function List({ posts }) {
  return (
    <div className='list-bg'>
      {posts.map((post) => {
        return (
          <Link href={`/detail/${post._id}`} key={post._id} prefetch={false}>
            <div className='list-item'>
              <h4>{post.title}</h4>
              <p>{post.description}</p>
            </div>
          </Link>
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
