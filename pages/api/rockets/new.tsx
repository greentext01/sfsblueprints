import pako from "pako";
import { db } from "../../../lib/db";
import { requireAuth } from "../../../middleware/requireAuth";
import { api } from "../../../lib/api";

const SFS_URL_REGEX =
  /https:\/\/sharing\.spaceflightsimulator\.app\/rocket\/(\w+)/;

const handler = api()
  .use(requireAuth)
  .post(async (req, res) => {
    if (!req.body.url) return res.status(400).send("No URL provided");
    if (!req.body.title) return res.status(400).send("No title provided");

    const rocketId = SFS_URL_REGEX.exec(req.body.url)?.[1];

    if (!rocketId) return res.status(400).send("Please add a valid URL");

    const data = await fetch(
      `https://sharing.spaceflightsimulator.app/api/rockets/${rocketId}`,
      {
        headers: {
          "User-Agent": process.env.USER_AGENT as string,
          "Login-Token": process.env.LOGIN_TOKEN as string,
        },
      }
    )
      .then((res) => res.json())
      .then((data) =>
        pako.ungzip(Buffer.from(data.data, "base64"), { to: "string" })
      );

    const blueprint = await db.blueprint.create({
      data: {
        title: req.body.title,
        body: data,
        imageURL: "",
        author: {
          connect: {
            id: req.user?.user?.id as string,
          },
        },
      },
    });

    return res.status(200).json({ id: blueprint.id });
  });

export default handler;
