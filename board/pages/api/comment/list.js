import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { method, query } = req;

  if (method === 'GET') {
    const client = await connectDB;
    const isConnected = client.topology.s.state === 'connected';

    if (isConnected) {
      try {
        const db = client.db('board');

        const result = await db
          .collection('comment')
          .find({
            postId: new ObjectId(query.postId),
          })
          .toArray();

        res.status(200).json(result);
      } catch (err) {
        console.error(err);
      }
    } else {
      return res.status(500).json('데이터베이스 연결 상태가 불안정합니다.');
    }
  }
}
