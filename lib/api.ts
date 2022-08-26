import { NextApiRequest, NextApiResponse } from "next";
import nextConnect, { ErrorHandler } from "next-connect";

const onError: ErrorHandler<NextApiRequest, NextApiResponse<any>> = (
  err,
  req,
  res,
  next
) => {
  if (process.env.NODE_ENV !== "production") {
    throw new Error(err);
  } else {
    res.status(500).end(err.toString());
    next();
  }
};

export function api() {
  return nextConnect<NextApiRequest, NextApiResponse>({
    onError,
  });
}
