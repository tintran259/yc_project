import NextAuth from "next-auth";
import Github from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
});
