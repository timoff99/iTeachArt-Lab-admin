import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

import { Router } from "./router/Router";
import { UserProvider } from "./shared/ui-kit/UserProvider";
import { theme } from "./theme";
import { ErrorBoundary } from "shared/ui-kit/ErrorBoundary";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <div className="App">
            <GlobalStyles styles={{ "*": { margin: 0, padding: 0, boxSizing: "border-box" } }} />
            <UserProvider>
              <Router />
            </UserProvider>
          </div>
        </ErrorBoundary>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
