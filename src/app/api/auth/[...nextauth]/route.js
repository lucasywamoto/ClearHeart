import NextAuth from "next-auth";
import authConfig from "@/auth";

const handler = NextAuth(authConfig);

//next-auth api routes
export { handler as GET, handler as POST };
