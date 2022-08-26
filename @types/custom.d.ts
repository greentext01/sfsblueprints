import { DefaultSession, Session, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

declare module "next" {
  interface NextApiRequest {
    user?: Session
  }
}
