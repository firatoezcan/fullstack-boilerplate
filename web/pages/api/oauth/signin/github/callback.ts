import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";

import { createProviderClient, GithubProvider } from "../github";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res);

  const codeChallenge = cookies.get("code-challenge");
  if (!codeChallenge) {
    return res.status(400).send("Your session timed out, try logging in again");
  }
  const client = await createProviderClient(GithubProvider);
  const params = client.callbackParams(req);

  // Not binding breaks this. inside of the callbacks. This is why we dont do this kids. Got the pun?
  const callback = params.id_token ? client.callback.bind(client) : client.oauthCallback.bind(client);
  const tokenSet = await callback(undefined, params, { code_verifier: codeChallenge });

  cookies.set(`code-challenge`, "", { maxAge: 0 });
  res.redirect(`http://localhost:3000#token=${tokenSet.access_token}`);
};
