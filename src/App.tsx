import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewLeaveRequest from "./pages/NewLeaveRequest";
import Manager from "./pages/Manager";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./pages/PrivateRoute";
import { useMsal } from "@azure/msal-react";
import { useState, useEffect } from "react";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/ui/SidebarAvatarProfile";
import LeaveDetails from "./pages/LeaveDetails";
import LeaveTypes from "./pages/LeaveTypes";
import LeaveBalance from "./pages/LeaveBalance";
import TeamCalendar from "./pages/TeamCalendar";
import UsersPage from "./pages/Users";

const App = () => {
  const { instance } = useMsal();
  const hideSidebarOn = ["/login", "/"];
  const location = useLocation();
  const shouldShowSidebar = !hideSidebarOn.includes(location.pathname);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    instance.initialize().then(() => {
      instance
        .handleRedirectPromise()
        .then((response) => {
          if (response) {
            instance.setActiveAccount(response.account);
          }
        })
        .catch((error) => {
          console.error("MSAL redirect error:", error);
        })
        .finally(() => {
          setIsAuthReady(true);
        });
    });
  }, [instance]);

  if (!isAuthReady) {
    return <div>Loading authentication...</div>;
  }
  return (
    <>
      <TooltipProvider>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-[#f7ede9]">
            {shouldShowSidebar && <AppSidebar />}
            <main className="flex-1 min-h-screen w-full">
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/new-request"
                  element={
                    <PrivateRoute>
                      <NewLeaveRequest />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/manager"
                  element={
                    <PrivateRoute>
                      <Manager />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/leave/:id"
                  element={
                    <PrivateRoute>
                      <LeaveDetails />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/leave-types"
                  element={
                    <PrivateRoute>
                      <LeaveTypes />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/leave-balance"
                  element={
                    <PrivateRoute>
                      <LeaveBalance />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/team-calendar"
                  element={
                    <PrivateRoute>
                      <TeamCalendar />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <PrivateRoute>
                      <UsersPage />
                    </PrivateRoute>
                  }
                />
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
          <Toaster />
          <Sonner />
        </SidebarProvider>
      </TooltipProvider>
    </>
  );
};

export default App;
