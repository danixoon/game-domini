import { BackendError } from "providers/ApiProvider";
import * as reactQuery from "react-query";
import { MutationConfig, QueryConfig, QueryKey } from "react-query";

export const useMutation = <V, R>(
  fn: reactQuery.MutationFunction<R, V>,
  config: MutationConfig<R, BackendError, V> = {}
) => {
  return reactQuery.useMutation(fn, config);
};

export const useQuery = <V, R>(
  fn: reactQuery.TypedQueryFunction<R, [V]>,
  key: QueryKey,
  vars: V,
  config: QueryConfig<R, BackendError> = {}
) => {
  const hook = reactQuery.useQuery([key, vars], () => fn(vars), { ...config });
  return hook;
};
