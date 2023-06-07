import { connectDB } from '@/util/database';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_AUTH_ID,
      clientSecret: process.env.GITHUB_AUTH_PASSWORD,
    }),
    CredentialsProvider({
      // 1. 로그인 페이지 폼 자동 생성해 주는 코드
      name: 'credentials',
      credentials: {  // 로그인 페이지에 들어갈 input 항목들 결정
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      // 2. 로그인 요청 시 실행되는 코드
      // 직접 DB에서 아이디, 비번 비교하고
      // 아이디, 비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        let db = (await connectDB).db('board');
        let user = await db
          .collection('user_cred')
          .findOne({ email: credentials.email });
        if (!user) {
          console.log('가입되어 있지 않은 이메일입니다.');
          return null;
        }
        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!pwcheck) {
          console.log('비번번호가 틀렸습니다.');
          return null;
        }
        return user;
      },
    }),
  ],
  // 3. strategy로 jwt 써 놔야 잘 된다. maxAge는 jwt 만료일 설정
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30일
  },

  callbacks: {
    // 4. jwt 만들 때 실행되는 코드
    // user 변수는 DB의 유저 정보가 담겨있고, token.user에 어떤 것을 저장하면 jwt에 들어간다.
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
      }
      return token;
    },
    // 5. 유저 세션이 조회될 때마다 실행되는 코드
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.SECRET_KEY,
  adapter: MongoDBAdapter(connectDB),
};

export default NextAuth(authOptions);
