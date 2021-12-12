import React, { useEffect, useState } from "react";

import { Button } from "@/ui/components/form";

export function getAuthHeaders(): HeadersInit {
  if (typeof window === "undefined") {
    return {};
  }
  const match = window.location.hash.match(/token=(.*)/);
  if (match) {
    const token = match[1];
    window.location.replace(window.location.href.replace(/token=(.*)/, ""));
    localStorage.setItem("token", token);
  }
  let token = localStorage.getItem("token");
  return {
    Authorization: `token ${token}`,
  };
}

const Homepage = () => {
  const [githubMe, setGithubMe] = useState({});

  useEffect(() => {
    fetch("https://api.github.com/user", {
      headers: getAuthHeaders(),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "Bad credentials") {
          localStorage.removeItem("token");
          return;
        }
        setGithubMe(res);
      });
  }, []);

  return (
    <div className="p-4 space-y-6">
      <form method="POST" action="/api/oauth/signin/github">
        <Button type="submit">Github OAuth Flow</Button>
      </form>
      <pre>{JSON.stringify({ githubMe }, null, 2)}</pre>
    </div>
  );
};

export default Homepage;
