import type { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {User} from "@/types"
export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          "http://localhost:8090/api/v1/auth/authenticate",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.username,
              password: credentials?.password,
            }),
          }
        );

        const data = await res.json();
        console.log("clean response:", JSON.stringify(data, undefined, 2));

        if (res.ok && data.token) {
          const { user, token } = data;
          return { ...user, token };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Handle JWT token
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as User;
        token.role = customUser.role;
        token.accessToken = customUser.token || "";; // Attach token to JWT
        
      }
      return token;
    },

    // Handle session
    async session({ session, token }): Promise<DefaultSession> {
      if (session?.user) {
        session.user.role = token.role || ""; // Attach role from JWT
        session.user.token = token.accessToken || ""; // Attach access token
        session.user.id = token.sub || ""; 
        session.user.tenantId = token.tenantId;
      }
      return session;
    },
  },
};
