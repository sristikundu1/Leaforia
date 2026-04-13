import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Route.jsx";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./contexts/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={true} />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
