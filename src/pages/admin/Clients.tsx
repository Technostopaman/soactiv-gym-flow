import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, User, Calendar, Phone, Mail, AlertTriangle } from "lucide-react";

// Mock data
const mockClients = [
  {
    id: 1,
    name: "Sarah Johnson",
    gender: "Female",
    phone: "+1 234 567 8900",
    email: "sarah.johnson@email.com",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    remainingDays: 275,
    status: "Active",
    plan: "Premium Annual"
  },
  {
    id: 2,
    name: "Mike Wilson",
    gender: "Male",
    phone: "+1 234 567 8901",
    email: "mike.wilson@email.com",
    startDate: "2023-12-15",
    endDate: "2024-02-15",
    remainingDays: 15,
    status: "Expiring Soon",
    plan: "Basic Monthly"
  },
  {
    id: 3,
    name: "Emily Chen",
    gender: "Female",
    phone: "+1 234 567 8902",
    email: "emily.chen@email.com",
    startDate: "2023-06-01",
    endDate: "2024-06-01",
    remainingDays: 120,
    status: "Active",
    plan: "Standard Annual"
  },
  {
    id: 4,
    name: "David Brown",
    gender: "Male",
    phone: "+1 234 567 8903",
    email: "david.brown@email.com",
    startDate: "2023-08-01",
    endDate: "2024-01-10",
    remainingDays: -5,
    status: "Expired",
    plan: "Premium Monthly"
  },
  {
    id: 5,
    name: "Lisa Anderson",
    gender: "Female",
    phone: "+1 234 567 8904",
    email: "lisa.anderson@email.com",
    startDate: "2024-01-10",
    endDate: "2024-02-01",
    remainingDays: 7,
    status: "Expiring Soon",
    plan: "Basic Monthly"
  }
];

const statusColors = {
  "Active": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "Expiring Soon": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  "Expired": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  "Pending": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
};

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    const matchesPlan = planFilter === "all" || client.plan.toLowerCase().includes(planFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const stats = {
    total: mockClients.length,
    active: mockClients.filter(c => c.status === "Active").length,
    expiring: mockClients.filter(c => c.status === "Expiring Soon").length,
    expired: mockClients.filter(c => c.status === "Expired").length
  };

  const getRemainingDaysColor = (days: number) => {
    if (days < 0) return "text-red-600 dark:text-red-400";
    if (days <= 30) return "text-yellow-600 dark:text-yellow-400";
    return "text-green-600 dark:text-green-400";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Clients</h1>
          <p className="text-muted-foreground">Manage all gym members and their memberships</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add New Member
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-green-600 dark:text-green-300" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.expiring}</p>
              </div>
              <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Expired</p>
                <p className="text-2xl font-bold text-red-600">{stats.expired}</p>
              </div>
              <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-red-600 dark:text-red-300" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Expiring Soon">Expiring Soon</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Members List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Remaining Days</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.gender}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">{client.phone}</div>
                        <div className="text-sm text-muted-foreground">{client.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{client.plan}</TableCell>
                    <TableCell>{client.startDate}</TableCell>
                    <TableCell>{client.endDate}</TableCell>
                    <TableCell>
                      <span className={getRemainingDaysColor(client.remainingDays)}>
                        {client.remainingDays > 0 ? `${client.remainingDays} days` : 
                         client.remainingDays === 0 ? 'Expires today' : 
                         `${Math.abs(client.remainingDays)} days ago`}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[client.status as keyof typeof statusColors]}>
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Renew</Button>
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}