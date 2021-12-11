import { NextApiRequest, NextApiResponse } from "next";
import { is } from "typescript-is";

import { getErrorMessage } from "../_utils";
import { handler, Params } from "./handler";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).end();
  if (!is<Params>(req.body)) return res.status(400).send("Insufficient parameters passed");
  try {
    const result = await handler(req.body);
    return res.send(result);
  } catch (error: any) {
    const message = getErrorMessage(error);
    return res.status(400).send({ message });
  }
};
