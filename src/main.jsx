import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./providers/AuthProvider";
import EmailProvider from "./providers/EmailProvider";
import OtpProvider from "./providers/OtpProvider";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-center" reverseOrder={false} />
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <EmailProvider>
          <OtpProvider>
            <RouterProvider router={router} />
          </OtpProvider>
        </EmailProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
