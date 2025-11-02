import { /*lazy,*/ Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./AppContext";
import "./styles/App.scss";
import { DebugThemeToggle } from "./features/theme/DebugThemeToggle";
import DebugLanguageToggle from "./features/lang/DebugLanguageToggle";
import LoadingSpinner from "./features/loading/LoadingSpinner";

// Component imports
import HomePage from "./features/home/HomePage";
import LoginPage from "./features/auth/LoginPage";
import RegistrationPage from "./features/auth/RegistrationPage";
import StyleSheetPage from "./styles/StyleSheetPage";
import TestPage from "./testing/TestPage";
import { DebugBreakpoints } from "./features/responsiveness/DebugBreakpoints";
import {
  breakpoints,
  useBreakpoint,
} from "./features/responsiveness/breakpoints";
import TestUploadPage from "./features/materials/upload/TestUploadPage";
import DebugLogoutButton from "./components/DebugLogoutButton";
import ManagerDashboardPage from "./features/materials/manager/ManagerDashboardPage";

const queryClient = new QueryClient();

// const HomePage = lazy(() => import("./features/home/HomePage"));
// const LoginPage = lazy(() => import("./features/auth/LoginPage"));
// const RegistrationPage = lazy(() => import("./features/auth/RegistrationPage"));
// const StyleSheetPage = lazy(() => import("./styles/StyleSheetPage"));
// const TestPage = lazy(() => import("./testing/TestPage"));

export default function App() {
  const [breakpoint] = useBreakpoint();

  useEffect(() => {
    const body = document.body;

    body.classList.remove(...Object.keys(breakpoints));
    const keys = Object.keys(breakpoints) as Array<keyof typeof breakpoints>;
    const index = keys.indexOf(breakpoint.label as any);
    if (breakpoint?.label === "large_desktop") {
      body.classList.add(breakpoint.label);
    } else if (breakpoint?.label !== "desktop") {
      body.classList.add(...keys.slice(index, keys.indexOf("tablet") + 1));
    }
  }, [breakpoint]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <BrowserRouter>
          <div className="debug">
            <DebugLogoutButton />
            <DebugBreakpoints />
            <DebugThemeToggle />
            <DebugLanguageToggle />
          </div>
          <Suspense fallback={<LoadingSpinner fullPage={true} />}>
            <Routes>
              <Route
                path="/test-upload"
                element={
                  <ProtectedRoute>
                    <TestUploadPage />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/manager"
                element={
                  <ProtectedRoute>
                    <ManagerDashboardPage />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/register" element={<RegistrationPage />}></Route>
              <Route path="/styles" element={<StyleSheetPage />}></Route>
              <Route path="/test" element={<TestPage />}></Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AppProvider>
    </QueryClientProvider>
  );
}
