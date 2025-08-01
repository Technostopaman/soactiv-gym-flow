import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Users, BarChart3, Calendar, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Member Management",
    description: "Complete client registration, tracking, and membership management system."
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Detailed insights into your gym's performance with comprehensive reporting."
  },
  {
    icon: Calendar,
    title: "Scheduling",
    description: "Manage classes, personal training sessions, and facility bookings."
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    description: "Admin, staff, and member roles with appropriate access controls."
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Live notifications, check-ins, and instant data synchronization."
  },
  {
    icon: Dumbbell,
    title: "Equipment Tracking",
    description: "Monitor equipment usage, maintenance schedules, and inventory."
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
              <Dumbbell className="h-12 w-12 text-primary" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-gradient">
              SoActiv
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Modern Gym Management System
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Streamline your fitness business with our comprehensive management platform. 
              From member registration to advanced analytics, everything you need to run a successful gym.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Link to="/auth/register">
              <Button className="btn-primary-glow text-lg px-8 py-6 h-auto">
                Get Started - Admin
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button variant="outline" className="text-lg px-8 py-6 h-auto border-2">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Demo Access */}
          <div className="mt-8">
            <Link to="/admin/dashboard">
              <Button variant="secondary" className="btn-secondary-glow">
                View Demo Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-lg text-muted-foreground">
              Powerful features designed for modern fitness businesses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="card-enhanced">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center text-muted-foreground">
          <p>&copy; 2024 SoActiv - Modern Gym Management System</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
