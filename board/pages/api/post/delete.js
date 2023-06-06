import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === 'POST') {
    const client = await connectDB;
    const isConnected = client.topology.s.state === 'connected';

    if (isConnected) {
      try {
        const db = client.db('board');

        // delete document(row)
        const result = await db.collection('post').deleteOne({
          _id: new ObjectId(body),
        });

        res.status(200).json(result);
      } catch (err) {
        console.error(err);
      }
    } else {
      return res.status(500).json('데이터베이스 연결 상태가 불안정합니다.');
    }
  }
}
