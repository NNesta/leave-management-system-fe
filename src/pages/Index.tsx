import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarCheck, FileText, Users, BarChart3 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Header section */}
      <header className="w-full py-6 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CalendarCheck className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">LeaveHorizon</h1>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="py-12 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simplify Leave Management
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            An intuitive system for requesting, approving, and tracking user
            leave with Microsoft integration.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link to="/login">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CalendarCheck className="h-12 w-12 text-blue-600 mb-2" />
              <CardTitle>Leave Requests</CardTitle>
              <CardDescription>
                Submit and track leave requests with an intuitive interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Request time off with just a few clicks. Select leave type,
                duration, and attach supporting documents.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="h-12 w-12 text-blue-600 mb-2" />
              <CardTitle>Approval Workflow</CardTitle>
              <CardDescription>
                Streamlined approval process for managers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Managers can easily review, approve or reject leave requests
                with comments and notifications.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-blue-600 mb-2" />
              <CardTitle>Team Calendar</CardTitle>
              <CardDescription>
                Visualize team availability at a glance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                See who's away and when with a comprehensive team calendar,
                integrated with your Microsoft Outlook.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-blue-600 mb-2" />
              <CardTitle>Leave Balance</CardTitle>
              <CardDescription>
                Track leave balances and accruals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Stay updated on your available leave balance with visual charts
                and monthly accrual tracking.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>&copy; 2025 LeaveHorizon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
