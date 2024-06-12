/*
CssBaseline: Material UI proporciona un componente CssBaseline opcional. Corrige algunas incoherencias entre navegadores y dispositivos al tiempo que proporciona restablecimientos que se adaptan mejor a la interfaz de usuario de Material que las hojas de estilo globales alternativas como normalize.css.
CssBaseline incluye una serie de reglas CSS que establecen valores para propiedades como la tipografía, los márgenes y los paddings, entre otros. Estas reglas son aplicadas a toda la aplicación y se aseguran de que todos los componentes tengan una apariencia consistente.
*/
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

//import "./index.css";
//import { ThemeProvider } from "@emotion/react";
//import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";



const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#699F48",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline /> {/** Reinicia todos los estilos base y usa la fuente Roboto */}
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
