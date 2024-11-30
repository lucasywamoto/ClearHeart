import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/models/User";
import { connectDB } from "@/utils/db";
import bcrypt from "bcryptjs";

const authConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            return null;
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            avatar: user.avatar,
          };
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account.provider === "google") {
          await connectDB();
          let dbUser = await User.findOne({ email: user.email });

          if (dbUser) {
            if (dbUser.providerId !== account.providerAccountId) {
              await User.findByIdAndUpdate(dbUser._id, {
                providerId: account.providerAccountId,
                oauthProvider: account.provider,
                avatar: user.image || user.picture,
              });
            }
          } else {
            dbUser = await User.create({
              name: profile.given_name,
              email: user.email,
              oauthProvider: account.provider,
              providerId: account.providerAccountId,
              avatar: user.image || user.picture,
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
      if (user) {
        token.userId = user.id;
        token.avatar = user.avatar;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId;
        session.user.avatar = token.avatar;
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
