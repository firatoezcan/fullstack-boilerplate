CREATE FUNCTION public.me(hasura_session json) RETURNS SETOF public.user
    LANGUAGE sql STABLE
    AS $$
    SELECT *
    FROM public.user
    WHERE
      id = (hasura_session ->> 'x-hasura-user-id')::integer
$$;
