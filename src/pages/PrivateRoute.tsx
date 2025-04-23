import { Navigate, useLocation } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { accounts } = useMsal();
  const location = useLocation();

  if (!accounts.length) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
