import { RegisterMutationVariables } from "@/web/generated/hasuraTypes.generated";

import { createAdminClient, rethrowHasuraError } from "../_utils";

export type Params = {
  action: {
    name: "register";
  };
  input: RegisterMutationVariables;
};

export const handler = async (params: Params) => {
  const { input } = params;
  const client = createAdminClient();
  const data = await client.Register(input).catch(rethrowHasuraError(["Register", input.email]));
  return data.insert_user_one;
};
