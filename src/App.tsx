import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewLeaveRequest from "./pages/NewLeaveRequest";
import Manager from "./pages/Manager";
import NotFound from "./pages/NotFound";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/ui/SidebarAvatarProfile";
import LeaveDetails from "./pages/LeaveDetails";
import LeaveTypes from "./pages/LeaveTypes";
import LeaveBalance from "./pages/LeaveBalance";
import TeamCalendar from "./pages/TeamCalendar";
import UsersPage from "./pages/Users";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { userRole, isAuthReady } = useAuth();

  if (!isAuthReady || !userRole) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const App = () => {
  const { isAuthReady, userRole } = useAuth();
  const hideSidebarOn = ["/login", "/"];
  const location = useLocation();
  const shouldShowSidebar = !hideSidebarOn.includes(location.pathname);

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-[#f7ede9]">
          {shouldShowSidebar && <AppSidebar />}
          <main className="flex-1 min-h-screen w-full">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />

              <Route
                element={
                  <ProtectedRoute
                    allowedRoles={["Staff", "Manager", "Admin"]}
                  />
                }
              >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/new-request" element={<NewLeaveRequest />} />
              </Route>

              <Route
                element={<ProtectedRoute allowedRoles={["Manager", "Admin"]} />}
              >
                <Route path="/manager" element={<Manager />} />
                <Route path="/leave/:id" element={<LeaveDetails />} />
                <Route path="/leave-types" element={<LeaveTypes />} />
                <Route path="/leave-balance" element={<LeaveBalance />} />
                <Route path="/team-calendar" element={<TeamCalendar />} />
                <Route path="/users" element={<UsersPage />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        <Toaster />
        <Sonner />
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default App;
