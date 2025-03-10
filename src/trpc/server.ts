import { appRouter } from "@/server/api/root";
import { createCallerFactory, createTRPCContext } from "@/server/api/trpc";

const createCaller = createCallerFactory(appRouter);

export async function createServerCaller() {
  // session?: any
  // Create context with session if provided
  const context = await createTRPCContext({
    headers: new Headers(),
  });

  return createCaller(context);
}
