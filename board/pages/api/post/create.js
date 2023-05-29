import { connectToDatabase } from '@/util/database';

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === 'POST') {
    const { client, db } = await connectToDatabase();
    const isConnected = client.topology.s.state === 'connected';

    if (isConnected) {
      try {
        if (body.title === '') {
          return res.status(500).json('제목을 입력해 주십시오');
        }

        if (body.description === '') {
          return res.status(500).json('내용을 입력해 주십시오');
        }

        // create document(row)
        const result = await db.collection('post').insertOne(body);

        return res.status(302).redirect('/list');
      } catch (err) {
        console.error(err);
      }
    } else {
      return res.status(500).json('데이터베이스 연결 상태가 불안정합니다.');
    }
  }
}
