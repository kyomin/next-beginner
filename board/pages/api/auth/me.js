import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    const client = await connectDB;
    const isConnected = client.topology.s.state === 'connected';

    if (isConnected) {
      try {
        const db = client.db('board');
        const session = await getServerSession(req, res, authOptions);

        res.status(200).json(session);
      } catch (err) {
        console.error(err);
      }
    } else {
      return res.status(500).json('데이터베이스 연결 상태가 불안정합니다.');
    }
  }
}
