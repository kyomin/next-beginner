import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_AUTH_ID,
      clientSecret: process.env.GITHUB_AUTH_PASSWORD,
    }),
  ],
  secret: 'dslkjdlasjdljaslkdjaslkjlqwj',
};

export default NextAuth(authOptions);
