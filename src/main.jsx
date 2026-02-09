import ReactDOM from "react-dom/client";
import "./index.css";
import "rsuite/Pagination/styles/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes.jsx";
import StateProvider from "./context/StateProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import LanguageProvider from "./context/LanguageProvider.jsx";
import SettingsLayout from "./components/layout/SettingsLayout.jsx";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <StateProvider>
      <SettingsLayout>
        <LanguageProvider>
          <RouterProvider router={router} />
          <Toaster
            toastOptions={{
              success: {
                style: {
                  backgroundColor: "#39da8a",
                  color: "#fff",
                  padding: "10px 30px",
                },
              },
              error: {
                style: {
                  backgroundColor: "#ff5b5c",
                  color: "#fff",
                  padding: "10px 30px",
                },
              },
            }}
          />
        </LanguageProvider>
      </SettingsLayout>
    </StateProvider>
  </QueryClientProvider>,
  // {/* </React.StrictMode> */}
);
