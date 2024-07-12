import NextAuth, { type DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { authenticate } from "@/actions/authenticate"
import { User } from "./data/interface/user"

declare module "next-auth" {
  interface Session {
    user: User
  }
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null

        user = authenticate(credentials.username, credentials.password)
 
        if (!user) {
          throw new Error("Authentication failed")
        }
        console.log("USER:")
        console.log(user)

        return user
      },
    }),
  ],
})