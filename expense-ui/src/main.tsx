// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { CookiesProvider } from "react-cookie";
import Modal from "react-modal";

// Configurar el elemento de la aplicación
Modal.setAppElement("#root"); // o el ID de tu elemento root

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>
  // </StrictMode>
);
