import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { RequestHandler } from "next-connect";
import { authConfig } from "../pages/api/auth/[...nextauth]";

export const requireAuth: RequestHandler<
  NextApiRequest,
  NextApiResponse
> = async (req, res, next) => {
  const user = await unstable_getServerSession(req, res, authConfig);

  if (!user) res.status(403).send("Not logged in");
  else {
    req.user = user
    next();
  }
};
