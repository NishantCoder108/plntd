import { string, z } from "zod";
import { publicProcedure } from "../../trpc";

export const readUser = publicProcedure
  .input(
    z.object({
      username: string(),
    })
  )
  .query(({ input }) => {
    return {
      username: input.username,

      message: "Hello " + input.username,
    };
  });
