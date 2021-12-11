import { LoginQueryVariables } from "@/web/generated/hasuraTypes.generated";

import { createAdminClient } from "../_utils";
import { createToken } from "./createToken";

export type Params = {
  action: {
    name: "login";
  };
  input: LoginQueryVariables;
};

export const handler = async (params: Params) => {
  const { input } = params;
  const client = createAdminClient();
  const data = await client.Login(input);
  if (data.user.length === 0) throw new Error(`No user found with id "${input.email}"`);
  const [user] = data.user;
  const token = createToken({ id: user.id, role: "user" });
  return { token };
};
