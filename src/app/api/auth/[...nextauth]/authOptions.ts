import { AuthOptions, CustomUser, Session, User } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import { prisma } from "@/libs";

interface GoogleUser extends GoogleProfile {
  given_name: string;
  family_name: string;
  email: string;
  picture: string;
}

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          fullname: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          avatar: profile.picture,
          roleId: 1,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      const googleUser = profile as GoogleUser;
      const existingUser = await prisma.user.findUnique({
        where: { email: googleUser.email ?? "" },
      });

      console.log(existingUser);

      if (!existingUser) {
        const queryParams = new URLSearchParams({
          email: googleUser.email,
          firstName: googleUser.given_name,
          lastName: googleUser.family_name,
          avatar: googleUser.picture,
        }).toString();

        return `/todo?${queryParams}`;
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as CustomUser;
        token.id = customUser.id;
        token.username = customUser.fullname ?? "";
        token.email = customUser.email ?? "";
        token.avatar = customUser.avatar ?? "";
        token.roleId = customUser.roleId ?? 1;
        token.adress = customUser.adress ?? "";
        token.latitude = customUser.latitude ?? "";
        token.longitude = customUser.longitude ?? "";
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.fullname = token.username;
      session.user.email = token.email;
      session.user.avatar = token.avatar ?? "";
      session.user.roleId = token.roleId;
      session.user.adress = token.adress;
      session.user.latitude = token.latitude;
      session.user.longitude = token.longitude;

      return session;
    },
  },

  pages: {
    signIn: "/signin",
    error: "/error",
  },
};

export default authOptions;
