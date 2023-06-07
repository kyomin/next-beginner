import { connectDB } from '@/util/database';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === 'POST') {
    const client = await connectDB;
    const isConnected = client.topology.s.state === 'connected';

    if (isConnected) {
      try {
        const { name, email, password } = body;
        const db = client.db('board');

        if (name === '') {
          return res.status(500).json('이름을 입력해 주십시오');
        }

        if (email === '') {
          return res.status(500).json('이메일을 입력해 주십시오');
        }

        if (password === '') {
          return res.status(500).json('패스워드를 입력해 주십시오');
        }

        // 이미 가입되어 있는 이메일인가?
        const retrievedEmail = await db
          .collection('user_cred')
          .findOne({ email });
        if (retrievedEmail) {
          return res.status(500).json('이미 가입되어 있는 이메일입니다.');
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = {
          name,
          email,
          password: encryptedPassword,
        };

        // create document(row)
        const result = await db.collection('user_cred').insertOne(newUser);

        return res.status(200).json('가입 성공!!');
      } catch (err) {
        console.error(err);
      }
    }
  }
}
