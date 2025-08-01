import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  DollarSign,
  Users,
  UserPlus,
  Calendar,
  TrendingUp,
  Eye,
  Search,
  Filter,
  Bell,
  Gift,
  Award,
  Clock,
} from "lucide-react";

// Sample data for demonstration
const summaryCards = [
  {
    title: "Total Sales",
    value: "₹45,231",
    change: "+20.1% from last month",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Payments Collected",
    value: "₹38,420",
    change: "+15.3% from last month",
    icon: TrendingUp,
    color: "text-blue-600",
  },
  {
    title: "Payments Pending",
    value: "₹6,811",
    change: "-2.4% from last month",
    icon: Clock,
    color: "text-orange-600",
  },
  {
    title: "New Clients",
    value: "24",
    change: "+12% from last month",
    icon: UserPlus,
    color: "text-purple-600",
  },
  {
    title: "Renewals",
    value: "18",
    change: "+8% from last month",
    icon: Users,
    color: "text-cyan-600",
  },
  {
    title: "Check-ins",
    value: "142",
    change: "+5% from yesterday",
    icon: Calendar,
    color: "text-indigo-600",
  },
];

const followUps = [
  { name: "Rajesh Kumar", type: "Payment Due", time: "2 hours ago", priority: "high" },
  { name: "Priya Sharma", type: "Renewal", time: "4 hours ago", priority: "medium" },
  { name: "Amit Singh", type: "PT Session", time: "1 day ago", priority: "low" },
];

const upcomingEvents = [
  { title: "Yoga Class", time: "10:00 AM", instructor: "Sarah" },
  { title: "CrossFit Training", time: "2:00 PM", instructor: "Mike" },
  { title: "Zumba Dance", time: "6:00 PM", instructor: "Lisa" },
];

const birthdays = [
  { name: "Neha Patel", date: "Today" },
  { name: "Vikram Gupta", date: "Tomorrow" },
  { name: "Sanya Jain", date: "Dec 3" },
];

const AdminDashboard = () => {
  const [dateFilter, setDateFilter] = useState("today");
  const [memberFilter, setMemberFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening at your gym today.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg bg-card border border-border">
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="3days">Last 3 Days</SelectItem>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>

        <Select value={memberFilter} onValueChange={setMemberFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by member" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Members</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="expiring">Expiring Soon</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex-1 flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search members, activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button className="btn-primary-glow" size="sm">
            Go
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {summaryCards.map((card, index) => (
          <Card key={index} className="card-enhanced">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.change}
              </p>
              <Button variant="link" className="p-0 h-auto text-xs text-primary">
                <Eye className="h-3 w-3 mr-1" />
                View More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Takes 2/3 space */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and shortcuts for daily operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex flex-col">
                  <UserPlus className="h-6 w-6 mb-2" />
                  <span className="text-xs">Add Member</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <Calendar className="h-6 w-6 mb-2" />
                  <span className="text-xs">Schedule</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <DollarSign className="h-6 w-6 mb-2" />
                  <span className="text-xs">Payment</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <Award className="h-6 w-6 mb-2" />
                  <span className="text-xs">Reports</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest member activities and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div>
                        <p className="font-medium">Member checked in</p>
                        <p className="text-sm text-muted-foreground">John Doe - 2 hours ago</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Check-in</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <Tabs defaultValue="snapshot" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="snapshot">Snapshot</TabsTrigger>
              <TabsTrigger value="followups">Follow-ups</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaders</TabsTrigger>
            </TabsList>

            <TabsContent value="snapshot" className="space-y-4">
              {/* Follow-ups */}
              <Card className="card-enhanced">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-4 w-4 mr-2" />
                    Follow-ups
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {followUps.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.type}</p>
                        </div>
                        <Badge 
                          variant={item.priority === "high" ? "destructive" : item.priority === "medium" ? "default" : "secondary"}
                        >
                          {item.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card className="card-enhanced">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Up Next
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="flex justify-between">
                        <div>
                          <p className="font-medium text-sm">{event.title}</p>
                          <p className="text-xs text-muted-foreground">{event.instructor}</p>
                        </div>
                        <span className="text-xs font-medium text-primary">{event.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Birthdays */}
              <Card className="card-enhanced">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gift className="h-4 w-4 mr-2" />
                    Birthdays
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {birthdays.map((birthday, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-medium text-sm">{birthday.name}</span>
                        <Badge variant="outline">{birthday.date}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="followups">
              <Card className="card-enhanced">
                <CardHeader>
                  <CardTitle>All Follow-ups</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {followUps.map((item, index) => (
                      <div key={index} className="p-3 rounded-lg border border-border">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{item.name}</h4>
                          <Badge variant="outline">{item.time}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{item.type}</p>
                        <Button size="sm" variant="outline">
                          Follow Up
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="leaderboard">
              <Card className="card-enhanced">
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Trainer John", "Trainer Sarah", "Trainer Mike"].map((trainer, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                            index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-500"
                          }`}>
                            {index + 1}
                          </div>
                          <span className="font-medium">{trainer}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{15 - index * 3} clients</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;