import './styles/base.scss'
import './styles/index.scss'
import "./styles/utilityClasses.scss";
import "./features/lang/i18n.ts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
