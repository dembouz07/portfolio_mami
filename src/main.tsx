import "@fontsource-variable/manrope";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/newsreader/wght.css";
import "@fontsource-variable/newsreader/wght-italic.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";
import "./styles/index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("L’élément racine de l’application est introuvable.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
