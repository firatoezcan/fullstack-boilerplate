import React, { useEffect, useState } from "react";

import { Button } from "@/ui/components/form";

const supportedProviders = ["Github", "Google"] as const;
type SupportedProviders = typeof supportedProviders[number];

export function getAuthHeaders(providerName: SupportedProviders): HeadersInit {
  if (typeof window === "undefined") {
    return {};
  }

  const { href, hash } = window.location;

  const { token, provider } = Object.fromEntries(new URLSearchParams(hash.substr(1)));
  if (token && provider && provider === providerName) {
    window.location.replace(href.replace(hash, ""));
    localStorage.setItem(`${providerName.toLowerCase()}-token`, token);
  }

  let storedToken = localStorage.getItem(`${providerName.toLowerCase()}-token`);

  switch (providerName) {
    case "Github":
      return {
        Authorization: `token ${storedToken}`,
      };
    case "Google":
      return {
        Authorization: `Bearer ${storedToken}`,
      };
    default:
      throw new Error(`Auth Headers for provider "${providerName}" are not configured`);
  }
}

const Homepage = () => {
  const [githubMe, setGithubMe] = useState({});

  useEffect(() => {
    supportedProviders.forEach(getAuthHeaders);
  }, []);

  useEffect(() => {
    fetch("https://api.github.com/user", {
      headers: getAuthHeaders("Github"),
    })
      .then((res) => res.json())
      .then((res) => {
        setGithubMe(res);
      });
  }, []);

  const [googleMe, setGoogleMe] = useState({});

  useEffect(() => {
    fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: getAuthHeaders("Google"),
    })
      .then((res) => res.json())
      .then((res) => {
        setGoogleMe(res);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="p-4 space-y-6">
      <form method="POST" action="/api/oauth/signin/github">
        <Button type="submit">Github OAuth Flow</Button>
      </form>
      <form method="POST" action="/api/oauth/signin/google">
        <Button type="submit">Google OAuth Flow</Button>
      </form>
      <pre>{JSON.stringify({ githubMe }, null, 2)}</pre>
      <pre>{JSON.stringify({ googleMe }, null, 2)}</pre>
    </div>
  );
};

export default Homepage;
