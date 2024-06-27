import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      roleId: number;
    } & DefaultSession[1];
  }
}

declare module "next-auth" {
  interface Session {
    user: CustomUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    roleId: number;
  }
}