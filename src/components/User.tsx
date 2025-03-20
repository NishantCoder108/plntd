"use client";

import { api } from "@/trpc/react";

export default function User() {
  const { data, isLoading, error } = api.user.readUser.useQuery(
    {
      username: "Nishant Kumar",
    },
    {
      staleTime: Infinity,
    }
  );

  if (isLoading) return <p> Loading...</p>;

  if (error) return <p> Error: {error.message}</p>;

  return (
    <div>
      <h2>User Data:</h2>
      <pre>
        {JSON.stringify(
          data,
          (key, value) =>
            typeof value === "bigint" ? value.toString() + "n" : value,
          2
        )}
      </pre>
    </div>
  );
}
