import { NextApiRequest, NextApiResponse } from "next";

import { getErrorMessage } from ".";

type Methods = "GET" | "POST";

interface Middleware {
  <Params, Return>(guard: (object: any) => object is Params, handler: (params: Params, req: NextApiRequest, res: NextApiResponse) => Return, allowedMethods?: Methods[]): (
    req: NextApiRequest,
    res: NextApiResponse
  ) => Promise<void>;
}

export const middleware: Middleware = (guard, handler, allowedMethods = ["POST"]) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.method || !allowedMethods.includes(req.method as Methods)) return res.status(405).end();
    if (!guard(req.body)) return res.status(400).send("Insufficient parameters passed");
    try {
      const result = await handler(req.body, req, res);
      if (!res.headersSent) {
        return res.send(result);
      }
    } catch (error: any) {
      const message = getErrorMessage(error);
      return res.status(400).send({ message });
    }
  };
};
