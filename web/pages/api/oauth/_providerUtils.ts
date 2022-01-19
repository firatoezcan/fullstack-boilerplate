import Cookies from "cookies";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { ClientMetadata, generators, Issuer, IssuerMetadata } from "openid-client";
import { createIs } from "typescript-is";
import UrlParse from "url-parse";

import { middleware } from "../_utils/middleware";

export type Params = {};

export type Provider = {
  idToken?: true;
  name: string;
  metadata?: Omit<ClientMetadata, "client_id" | "client_secret" | "redirect_uris">;
  scope: string | string[];
  redirectUri: string;
} & (
  | {
      wellKnown: string;
    }
  | {
      customWellKnown: string;
    }
  | {
      issuerMetadata: IssuerMetadata;
    }
);

export const getMetadataFromEnv = (providerName: string): ClientMetadata => {
  const idKey = `${providerName.toUpperCase()}_CLIENT_ID`;
  const secretKey = `${providerName.toUpperCase()}_CLIENT_SECRET`;
  const id = process.env[idKey];
  const secret = process.env[secretKey];
  if (!id || !secret) {
    throw new Error(`You need to configure "${idKey}" and "${secretKey}" in your environment variables`);
  }
  return {
    client_id: id,
    client_secret: secret,
  };
};

export const getIssuer = async (provider: Provider) => {
  if ("issuerMetadata" in provider) {
    return new Issuer(provider.issuerMetadata);
  }
  if ("customWellKnown" in provider) {
    const res = await fetch(provider.customWellKnown).then(async (response) => {
      if (!response.ok) throw await response.text();
      return response.json();
    });
    return new Issuer(res);
  }
  if ("wellKnown" in provider) {
    return Issuer.discover(provider.wellKnown);
  }
  throw new Error(`You need to configure "wellKnown", "customWellKnown" or "issuerMetadata" in the provider`);
};

export const createProviderClient = async (provider: Provider) => {
  const issuer = await getIssuer(provider);
  const client = new issuer.Client({ ...provider.metadata, ...getMetadataFromEnv(provider.name), redirect_uris: [provider.redirectUri] });
  return client;
};

export const providerSignIn = (provider: Provider) => {
  return middleware(createIs<Params>(), async (_, req, res) => {
    const cookies = new Cookies(req, res);

    const client = await createProviderClient(provider);
    const verifier = generators.codeVerifier();

    const redirectUrl = client.authorizationUrl({
      scope: `openid profile email ${(Array.isArray(provider.scope) ? provider.scope : [provider.scope]).join(" ")}`,
      state: verifier
    });

    const callbackUrl = new UrlParse(provider.redirectUri);

    const cookieOptions: Cookies.SetOption = {
      httpOnly: true,
      domain: callbackUrl.host,
      path: callbackUrl.pathname,
    };

    // Cookies cannot be set on localhost:3000 so we omit it entirely
    if (/localhost:\d+/.test(cookieOptions.domain as string)) {
      delete cookieOptions.domain;
    }
    cookies.set(`oauth-verifier`, verifier, cookieOptions);

    // Somehow res.redirect seems to not work. Probably because its intended for 307 redirects
    res.status(302).setHeader("Location", redirectUrl);
    return res.end();
  });
};

export const providerCallback = (provider: Provider) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const cookies = new Cookies(req, res);

    const verifier = cookies.get("oauth-verifier");
    if (!verifier || Math.random() > 0.5) {
      res.setHeader("Content-Type", "text/html");
      return res
        .status(400)
        .send(
          `<form method="POST" action="${provider.redirectUri.replace(
            "callback",
            ""
          )}"><button style="font-size:1.2rem">Your session timed out, try logging in again here</button></form>`
        );
    }
    const client = await createProviderClient(provider);
    const params = client.callbackParams(req);
    // Not binding breaks this. inside of the callbacks. This is why we dont do this kids. Got the pun?
    const callback = provider.idToken ? client.callback.bind(client) : client.oauthCallback.bind(client);
    const tokenSet = await callback(provider.redirectUri, params, { state: verifier });

    cookies.set(`oauth-verifier`, "", { maxAge: 0 });
    console.log(tokenSet);
    res.redirect(`http://localhost:3000#token=${tokenSet.access_token}&provider=${provider.name}`);
  };
};
