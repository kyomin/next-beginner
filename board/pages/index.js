import { connectToDatabase } from '@/util/database';

export default function Home({ posts }) {
  console.log('posts: ', posts);
  return <div>메인 페이지</div>;
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
