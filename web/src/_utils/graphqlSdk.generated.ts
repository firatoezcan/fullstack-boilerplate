import * as Types from '@/web/generated/hasuraTypes.generated';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import * as Operations from '@/web/generated/hasuraTypes.generated';




export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Login(variables: Types.LoginQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Types.LoginQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.LoginQuery>(Operations.LoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Login');
    },
    Register(variables: Types.RegisterMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Types.RegisterMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.RegisterMutation>(Operations.RegisterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Register');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;