import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import HomePage from "../src/scenes/homepage";
import LoginPage from "../src/scenes/loginpage";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">

    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Routes>
        {/* <Route path="/" element={<LoginPage />} />
        <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/" />}
          /> */}

          <Route path="/" element={<HomePage />} />
        
      </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </div>
  );
}

export default App;
