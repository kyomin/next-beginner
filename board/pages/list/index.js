import { connectToDatabase } from '@/util/database';
import ListItem from './ListItem';

// 리스트 요청은 변동이 있는 데이터를 가져오는 작업이므로 정적(static) 페이지가 아니다.
// 따라서 다이나믹 렌더링 페이지임을 강제한다.
export const dynamic = 'force-dynamic';

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
