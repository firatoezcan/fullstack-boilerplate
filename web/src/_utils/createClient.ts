import { GraphQLClient } from "graphql-request";

import { getSdk } from "./graphqlSdk.generated";

export const createClient = (headers: Record<string, string> = {}) => {
  if (!process.env.HASURA_GRAPHQL_HOST) throw new Error(`You need to set the host to access Hasura via the environment variable "HASURA_GRAPHQL_HOST"`);

  const client = new GraphQLClient(`${process.env.HASURA_GRAPHQL_HOST}/v1/graphql`, {
    headers,
  });
  return getSdk(client);
};

export const createAdminClient = (headers: Record<string, string> = {}) => {
  if (!process.env.HASURA_ADMIN_SECRET) throw new Error(`You need to set the admin secret to access Hasura via the environment variable "HASURA_ADMIN_SECRET"`);
  if (!process.env.HASURA_GRAPHQL_HOST) throw new Error(`You need to set the host to access Hasura via the environment variable "HASURA_GRAPHQL_HOST"`);

  const client = new GraphQLClient(`${process.env.HASURA_GRAPHQL_HOST}/v1/graphql`, {
    headers: {
      "X-Hasura-Admin-Secret": process.env.HASURA_ADMIN_SECRET,
      ...headers,
    },
  });
  return getSdk(client);
};
