import { createBrowserRouter } from "react-router-dom";

export const createRouter: () => ReturnType<typeof createBrowserRouter> = () =>
  createBrowserRouter([
    {
      path: "/",
      lazy: async () => {
        const { JobsRoute } = await import("./jobs");
        return { Component: JobsRoute };
      },
    },
    {
      path: "*",
      lazy: async () => {
        const { NotFoundRoute } = await import("./not-found");
        return { Component: NotFoundRoute };
      },
    },
  ]);
