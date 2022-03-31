import { ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

import { Router } from "./router/Router";
import { UserProvider } from "./shared/ui-kit/UserProvider";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <GlobalStyles styles={{ "*": { margin: 0, padding: 0, boxSizing: "border-box" } }} />
        <UserProvider>
          <Router />
        </UserProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
