import { NextApiRequest, NextApiResponse } from "next";
import nextConnect, { ErrorHandler } from "next-connect";

const onError: ErrorHandler<NextApiRequest, NextApiResponse<any>> = (
  err,
  _,
  res,
  next
) => {
  console.log(err)
  res.status(500).end(err.toString());
  next();
};

export function api() {
  return nextConnect<NextApiRequest, NextApiResponse>({
    onError,
  });
}
