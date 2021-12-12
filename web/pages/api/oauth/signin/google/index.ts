import { Provider, providerSignIn } from "../../_providerUtils";

export const GoogleProvider: Provider = {
  name: "Google",
  scope: "email",
  wellKnown: "https://accounts.google.com",
  redirectUri: "http://localhost:3000/api/oauth/signin/google/callback",
  idToken: true,
};

export default providerSignIn(GoogleProvider);
