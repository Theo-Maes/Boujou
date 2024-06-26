import { AuthOptions, CustomUser } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/libs";
import bcrypt from "bcrypt";

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
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Invalid credentials");
        }

        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("No user found with the provided email");
        }

        const isValidPassword = await bcrypt.compare(password, user.password || "");
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        return {
            id: user.id.toString(),
            fullname: user.fullname,
            email: user.email,
            avatar: user.avatar,
            roleId: user.roleId,
          
        };
      }
    }),
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
      console.log(account?.provider.toString());
      
      if (account?.provider === "credentials") {
        const credentialUser = user as CustomUser;
        const existingCredentialUser = await prisma.user.findUnique({
          where: { email: credentialUser.email ?? "" },
        });

        if (!existingCredentialUser) return false;
      }

      if (account?.provider === "google") {
        const googleUser = profile as GoogleUser;
        const existingGoogleUser = await prisma.user.findUnique({
          where: { email: googleUser.email ?? "" },
        });

        if (!existingGoogleUser) {
          const queryParams = new URLSearchParams({
            email: googleUser.email,
            firstName: googleUser.given_name,
            lastName: googleUser.family_name || " ",
            avatar: googleUser.picture,
          }).toString();

          return `/signup?${queryParams}`;
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {      
        const customUser = user as CustomUser; 
        const userConnected = await prisma.user.findUnique({
          where: { email: customUser.email}
        })
        token.id = userConnected?.id;
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
