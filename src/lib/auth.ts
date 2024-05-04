import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import Credentials from "next-auth/providers/credentials";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_API ?? "",
);

export const NEXT_AUTH_CONFIG: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Checking authorization");
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        const admin = await supabase
          .from("Admin")
          .select("*")
          .eq("email", username)
          .eq("password", password);
        if (admin.error) {
          return null;
        }
        console.log(admin.data[0]);
        return {
          id: admin.data[0].id,
          email: admin.data[0].email,
          name: admin.data[0].username,
        };
      },
    }),
  ],

  pages: {
    // signIn: "/auth/signin",
    // signOut: "/api/auth/signin",
    error: "/api/auth/signin", // Error code passed in query string as ?error=
    //   verifyRequest: "/auth/verify-request", // (used for check email message)
    //   newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  //   adapter: SupabaseAdapter({
  //     url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  //     secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  //   }),
  //   callbacks: {
  //     async session({ session, token, user }) {
  //       const signingSecret = process.env.SUPABASE_JWT_SECRET;
  //       if (signingSecret) {
  //         const payload = {
  //           aud: "authenticated",
  //           exp: Math.floor(new Date(session.expires).getTime() / 1000),
  //           sub: user.id,
  //           email: user.email,
  //           role: "authenticated",
  //         };
  //         session.supabaseAccessToken = jwt.sign(payload, signingSecret);
  //       }
  //       return session;
  //     },
  //   },

  // secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    session: ({ session, token, user }: any) => {
      const payload = {
        aud: "authenticated",
        exp: Math.floor(new Date(session.expires).getTime() / 1000),
        sub: token.sub,
        name: token.name,
        email: token.email,
        role: "authenticated",
      };
      session.supabaseAccessToken = jwt.sign(
        payload,
        process.env.NEXTAUTH_SECRET as string,
      );
      console.log(session);
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/tables/characters-table";
    },
  },
};
