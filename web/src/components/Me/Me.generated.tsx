import * as Types from '@/web/generated/hasuraTypes.generated';

import * as Operations from '@/web/generated/hasuraTypes.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;


export function useMeQuery(options: Omit<Urql.UseQueryArgs<Types.MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<Types.MeQuery>({ query: Types.MeDocument, ...options });
};