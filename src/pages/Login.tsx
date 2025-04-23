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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 48 48"
                className="mr-2"
              >
                <path
                  fill="#f8312f"
                  d="M44,24c0,11.044-8.956,20-20,20S4,35.044,4,24S12.956,4,24,4S44,12.956,44,24z"
                />
                <path
                  fill="#fff"
                  d="M21,22.019h5v5h-5V22.019z M15.001,27.019L15,22l5,0.019v5H15.001z M16,16h9v-5h-9V16z M27.001,33H18v-4.981h9.001V33z"
                />
              </svg>
              Sign in with Microsoft
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
