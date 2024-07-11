import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { authenticate } from "@/actions/authenticate"
 
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

        return user as any
      },
    }),
  ],
})