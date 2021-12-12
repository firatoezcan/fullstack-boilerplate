import Cookies from "cookies";
import { ClientMetadata, generators, Issuer, IssuerMetadata } from "openid-client";
import { createIs } from "typescript-is";
import UrlParse from "url-parse";

import { middleware } from "../../_utils/middleware";

export type Params = {};

type Provider = {
  metadata: ClientMetadata;
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

const getMetadataFromEnv = (providerName: string): ClientMetadata => {
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

export const GithubProvider: Provider = {
  scope: "read:user+user:email",
  redirectUri: "http://localhost:3000/api/oauth/signin/github/callback",
  metadata: {
    ...getMetadataFromEnv("Github"),
  },
  issuerMetadata: {
    issuer: "Github",
    authorization_endpoint: "https://github.com/login/oauth/authorize",
    token_endpoint: "https://github.com/login/oauth/access_token",
    userinfo_endpoint: "https://api.github.com/user",
  },
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
  const client = new issuer.Client({ ...provider.metadata, redirect_uris: [provider.redirectUri] });
  return client;
};

export default middleware(createIs<Params>(), async (_, req, res) => {
  const cookies = new Cookies(req, res);

  const client = await createProviderClient(GithubProvider);
  const verifier = generators.codeVerifier();
  const codeChallenge = generators.codeChallenge(verifier);

  const redirectUrl = client.authorizationUrl({
    scope: `openid profile ${(Array.isArray(GithubProvider.scope) ? GithubProvider.scope : [GithubProvider.scope]).join(" ")}`,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  const callbackUrl = new UrlParse(GithubProvider.redirectUri);

  const cookieOptions: Cookies.SetOption = {
    httpOnly: true,
    domain: callbackUrl.host,
    path: callbackUrl.pathname,
  };

  // Cookies cannot be set on localhost:3000 so we omit it entirely
  if (/localhost:\d+/.test(cookieOptions.domain as string)) {
    delete cookieOptions.domain;
  }

  cookies.set(`code-challenge`, codeChallenge, cookieOptions);

  // Somehow res.redirect seems to not work. Probably because its intended for 307 redirects
  res.status(302).setHeader("Location", redirectUrl);
  return res.end();
});
