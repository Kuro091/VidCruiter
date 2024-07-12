import { PropsWithChildren, useMemo } from "react";
import { RouterProvider } from "react-router-dom";

import { createRouter } from "./routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/libs/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {import.meta.env.DEV && <ReactQueryDevtools />}
      {children}
    </QueryClientProvider>
  );
};

const AppRouter = () => {
  const router = useMemo(() => createRouter(), []);

  return <RouterProvider router={router} />;
};

function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

export default App;
