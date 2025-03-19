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

// import { useMutation, useQuery } from "@tanstack/react-query";
// import { useTRPC } from "../utils/trpc";
// export default function UserList() {
//   const trpc = useTRPC(); // use `import { trpc } from './utils/trpc'` if you're using the singleton pattern
//   // const userQuery = useQuery(trpc.getUser.queryOptions({ id: 'id_bilbo' }));
//   // const userCreator = useMutation(trpc.createUser.mutationOptions());

//   const userQuery = useQuery(
//     trpc.user.readUser.queryOptions({
//       username: "NIshant",
//     })
//   );

//   console.log(userQuery);
//   return (
//     <div>
//       <p> Name :{userQuery.data?.username}</p>
//       {/* <button onClick={() => userCreator.mutate({ name: 'Frodo' })}>
//         Create Frodo
//       </button> */}
//     </div>
//   );
// }
