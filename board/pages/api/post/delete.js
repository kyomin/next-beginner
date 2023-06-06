import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === 'POST') {
    const client = await connectDB;
    const isConnected = client.topology.s.state === 'connected';

    if (isConnected) {
      try {
        const db = client.db('board');
        const session = await getServerSession(req, res, authOptions);

        // 로그인하지 않은 경우
        if (!session) {
          return res.status(500).json('로그인해 주십시오');
        }

        const targetDocument = await db
          .collection('post')
          .findOne({ _id: new ObjectId(body) });

        // 내가 작성한 글이 아닐 때
        if (targetDocument.author !== session.user.email) {
          return res.status(500).json('내가 작성한 글이 아닙니다');
        }

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
