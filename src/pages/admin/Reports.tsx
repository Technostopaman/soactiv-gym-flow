import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Users, UserCheck, Calendar, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for charts
const monthlyRevenue = [
  { month: "Jan", revenue: 15000, expenses: 8000, profit: 7000 },
  { month: "Feb", revenue: 18000, expenses: 8500, profit: 9500 },
  { month: "Mar", revenue: 22000, expenses: 9000, profit: 13000 },
  { month: "Apr", revenue: 20000, expenses: 8800, profit: 11200 },
  { month: "May", revenue: 25000, expenses: 9500, profit: 15500 },
  { month: "Jun", revenue: 28000, expenses: 10000, profit: 18000 },
];

const membershipData = [
  { month: "Jan", newMembers: 45, renewals: 120, cancellations: 15 },
  { month: "Feb", newMembers: 52, renewals: 135, cancellations: 12 },
  { month: "Mar", newMembers: 61, renewals: 148, cancellations: 18 },
  { month: "Apr", newMembers: 48, renewals: 152, cancellations: 14 },
  { month: "May", newMembers: 67, renewals: 165, cancellations: 16 },
  { month: "Jun", newMembers: 73, renewals: 178, cancellations: 13 },
];

const planDistribution = [
  { name: "Basic", value: 120, color: "#8884d8" },
  { name: "Standard", value: 180, color: "#82ca9d" },
  { name: "Premium", value: 95, color: "#ffc658" },
  { name: "Annual", value: 75, color: "#ff7300" }
];

const trainerPerformance = [
  { name: "Sarah Johnson", clients: 45, revenue: 6750, rating: 4.8 },
  { name: "Mike Wilson", clients: 38, revenue: 5700, rating: 4.6 },
  { name: "Alex Brown", clients: 42, revenue: 6300, rating: 4.7 },
  { name: "Lisa Chen", clients: 35, revenue: 5250, rating: 4.9 },
];

export default function Reports() {
  const [dateFilter, setDateFilter] = useState("monthly");
  const [reportType, setReportType] = useState("financial");

  const stats = {
    totalRevenue: 28000,
    totalExpenses: 10000,
    netProfit: 18000,
    totalMembers: 470,
    newMembers: 73,
    activeTrainers: 4,
    avgRevenuePerMember: 59.6
  };

  const getStatChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change > 0
    };
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Track gym performance and financial metrics</p>
        </div>
        <div className="flex gap-2">
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+12.5%</span>
                </div>
              </div>
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Net Profit</p>
                <p className="text-2xl font-bold">${stats.netProfit.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+18.2%</span>
                </div>
              </div>
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-300" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold">{stats.totalMembers}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+8.1%</span>
                </div>
              </div>
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Revenue/Member</p>
                <p className="text-2xl font-bold">${stats.avgRevenuePerMember.toFixed(0)}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+4.1%</span>
                </div>
              </div>
              <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <UserCheck className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Profit Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Profit Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" name="Revenue" />
                <Bar dataKey="profit" fill="#10b981" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Membership Growth */}
        <Card>
          <CardHeader>
            <CardTitle>Membership Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={membershipData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="newMembers" stroke="hsl(var(--primary))" strokeWidth={2} name="New Members" />
                <Line type="monotone" dataKey="renewals" stroke="#10b981" strokeWidth={2} name="Renewals" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Plan Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Membership Plan Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={planDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {planDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Trainer Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Trainer Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trainerPerformance.map((trainer, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{trainer.name}</h4>
                    <p className="text-sm text-muted-foreground">{trainer.clients} clients</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${trainer.revenue.toLocaleString()}</p>
                    <div className="flex items-center">
                      <span className="text-xs text-muted-foreground mr-1">★</span>
                      <span className="text-sm">{trainer.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>This Month Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Revenue:</span>
              <span className="font-medium">${stats.totalRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expenses:</span>
              <span className="font-medium">${stats.totalExpenses.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-medium">Net Profit:</span>
              <span className="font-bold text-green-600">${stats.netProfit.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Member Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Active:</span>
              <span className="font-medium">{stats.totalMembers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">New This Month:</span>
              <span className="font-medium">{stats.newMembers}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-medium">Growth Rate:</span>
              <span className="font-bold text-green-600">+8.1%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staff Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Active Trainers:</span>
              <span className="font-medium">{stats.activeTrainers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Avg Rating:</span>
              <span className="font-medium">4.7★</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-medium">Total Clients:</span>
              <span className="font-bold">{trainerPerformance.reduce((sum, t) => sum + t.clients, 0)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}