import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

const authConfig = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isMatch) {
              return user;
            }
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account.provider === "google" || account.provider === "github") {
          let dbUser = await User.findOne({ email: user.email });

          if (dbUser) {
            if (dbUser.providerId !== account.providerAccountId) {
              await User.findByIdAndUpdate(dbUser._id, {
                providerId: account.providerAccountId,
                oauthProvider: account.provider,
              });
            }
          } else {
            dbUser = await User.create({
              name: user.name.split(" ")[0],
              email: user.email,
              oauthProvider: account.provider,
              providerId: account.providerAccountId,
            });
          }
          user.id = dbUser._id.toString();
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (user?.id) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const { auth } = NextAuth(authConfig);
export default authConfig;
