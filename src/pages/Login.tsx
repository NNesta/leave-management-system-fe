import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarCheck } from "lucide-react";
import { useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { TfiMicrosoftAlt } from "react-icons/tfi";

const Login = () => {
  const { instance, accounts } = useMsal();

  const navigate = useNavigate();
  const from = "/dashboard";

  useEffect(() => {
    if (accounts.length > 0) {
      fetch("http://localhost:8080/api/v1/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: accounts[0].username,
          fullName: accounts[0].name,
        }),
      }).then(() => navigate(from, { replace: true }));
    }
  }, [accounts, from, navigate]);

  const handleLogin = () => {
    instance.loginRedirect();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-white px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <CalendarCheck className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold">Welcome to LeaveHorizon</h1>
          <p className="text-gray-600 mt-2">
            Sign in with your Microsoft account
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Use your Microsoft work account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleLogin} className="w-full" variant="outline">
              <TfiMicrosoftAlt className="h-4 w-4 mr-2" />
              Sign in with Microsoft
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
