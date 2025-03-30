import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import {
  AUTHOR_BY_EMAIL_QUERY,
  AUTHOR_BY_GITHUB_ID_QUERY,
} from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/view-client";

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      // Kiểm tra hoặc log
      const exitsUser = await client
        .config({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: user?.id,
        });
      // //  User not exists in database
      if (!exitsUser) {
        await writeClient.create({
          _type: "author",
          id: profile?.id,
          name: user?.name,
          username: profile?.login,
          email: user?.email,
          image: user?.image,
          bio: profile?.bio || "",
        });

        return true;
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .config({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile?.id,
          });

        token.id = user?._id;

        return token;
      } else {
        const user = await client
          .config({ useCdn: false })
          .fetch(AUTHOR_BY_EMAIL_QUERY, {
            email: token?.email,
          });

        token.id = user?._id;

        return token;
      }
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
