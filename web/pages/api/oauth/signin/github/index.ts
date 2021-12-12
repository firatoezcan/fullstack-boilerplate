import { Provider, providerSignIn } from "../../_providerUtils";

export const GithubProvider: Provider = {
  name: "Github",
  scope: "read:user+user:email",
  redirectUri: "http://localhost:3000/api/oauth/signin/github/callback",
  issuerMetadata: {
    issuer: "Github",
    authorization_endpoint: "https://github.com/login/oauth/authorize",
    token_endpoint: "https://github.com/login/oauth/access_token",
    userinfo_endpoint: "https://api.github.com/user",
  },
};

export default providerSignIn(GithubProvider);
