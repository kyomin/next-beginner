import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === 'POST') {
    const client = await connectDB;
    const isConnected = client.topology.s.state === 'connected';
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(500).json('로그인해 주십시오');
    }

    if (isConnected) {
      try {
        const { comment, postId } = body;
        const db = client.db('board');

        if (comment === '') {
          return res.status(500).json('댓글을 입력해 주십시오');
        }

        const newComment = {
          content: comment,
          postId: new ObjectId(postId),
          author: session.user.email,
        };

        const result = await db.collection('comment').insertOne(newComment);

        res.status(200).json(newComment);
      } catch (err) {
        console.error(err);
      }
    } else {
      return res.status(500).json('데이터베이스 연결 상태가 불안정합니다.');
    }
  }
}
