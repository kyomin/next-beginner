import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === 'POST') {
    const client = await connectDB;
    const isConnected = client.topology.s.state === 'connected';

    if (isConnected) {
      try {
        const { _id, title, description } = body;
        const db = client.db('board');

        if (title === '') {
          return res.status(500).json('제목을 입력해 주십시오');
        }

        if (description === '') {
          return res.status(500).json('내용을 입력해 주십시오');
        }

        const updatedPost = {
          title,
          description,
        };

        // update document(row)
        const result = await db
          .collection('post')
          .updateOne({ _id: new ObjectId(_id) }, { $set: updatedPost });

        return res.status(302).redirect('/list');
      } catch (err) {
        console.error(err);
      }
    } else {
      return res.status(500).json('데이터베이스 연결 상태가 불안정합니다.');
    }
  }
}
