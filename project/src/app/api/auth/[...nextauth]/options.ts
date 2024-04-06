import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import api from '@/client';
import { SignInDto } from '@/generated/typing';

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email:',
          type: 'email',
          placeholder: 'email',
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'password',
        },
      },
      async authorize(credentials?: SignInDto) {
        if (!credentials) {
          return null;
        }

        const { access_token: token } = await api.auth.getAuth(credentials);

        return {
          id: '173625',
          token,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
      }

      return token;
    },
    // @ts-ignore
    async session({ token: { id, token } }) {
      return { user: { id }, token };
    },
  },
};
