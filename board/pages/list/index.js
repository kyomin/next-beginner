import { connectToDatabase } from '@/util/database';
import ListItem from './ListItem';

export default function List({ posts }) {
  return (
    <div className='list-bg'>
      <ListItem posts={posts} />
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
