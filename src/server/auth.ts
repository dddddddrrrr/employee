import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import { db } from "~/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string | undefined | null;
      image: string | undefined | null;
      role: number | undefined | null;
      referrerId?: string | undefined | null;
    } & DefaultSession["user"];
  }

  interface User {
    name: string | undefined | null;
    image: string | undefined | null;
    role: number | undefined | null;
    referrerId?: string | undefined | null;
  }
}

const AuthProviders = [
  GithubProvider({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
  DiscordProvider({
    clientId: process.env.DISCORD_CLIENT_ID!,
    clientSecret: process.env.DISCORD_CLIENT_SECRET!,
  }),
];

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.image = token.image as string;
        session.user.role = token.role as number;
      }
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.image = user.image;
        token.role = user.role;
      }

      return token;
    },
    redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl + "/api/auth/signout")) {
        return baseUrl;
      }

      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 60, // 2 months
  },
  adapter: PrismaAdapter(db),
  providers: AuthProviders,
};

export const getServerAuthSession = () => getServerSession(authOptions);
