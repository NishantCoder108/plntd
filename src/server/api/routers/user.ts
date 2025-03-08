import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

export const userRouter = t.router({
  getUser: t.procedure.input(z.string()).query(({ input }) => {
    //call db
    return {
      id: input,
      name: "User " + input,
    };
  }),
});

export type UserRouter = typeof userRouter;
