import { userRouter } from "@/server/api/routers/user";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const createContext = async () => ({});

const handler = (request: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    router: userRouter,
    req: request,
    createContext,
  });

export { handler as GET, handler as POST };
