import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, User, Clock, DollarSign, UserCheck, Phone, Mail, Calendar } from "lucide-react";

// Mock data
const mockStaff = [
  {
    id: 1,
    name: "Sarah Johnson",
    designation: "Senior Trainer",
    phone: "+1 234 567 8900",
    email: "sarah.johnson@soactiv.com",
    joiningDate: "2023-01-15",
    salary: 4500,
    status: "Active",
    department: "Training",
    shift: "Morning",
    experience: "5 years"
  },
  {
    id: 2,
    name: "Mike Wilson",
    designation: "Receptionist",
    phone: "+1 234 567 8901",
    email: "mike.wilson@soactiv.com",
    joiningDate: "2023-06-01",
    salary: 2800,
    status: "Active",
    department: "Front Desk",
    shift: "Full Day",
    experience: "2 years"
  },
  {
    id: 3,
    name: "Alex Brown",
    designation: "Personal Trainer",
    phone: "+1 234 567 8902",
    email: "alex.brown@soactiv.com",
    joiningDate: "2023-09-10",
    salary: 3500,
    status: "Active",
    department: "Training",
    shift: "Evening",
    experience: "3 years"
  },
  {
    id: 4,
    name: "Lisa Chen",
    designation: "Yoga Instructor",
    phone: "+1 234 567 8903",
    email: "lisa.chen@soactiv.com",
    joiningDate: "2023-03-20",
    salary: 3200,
    status: "On Leave",
    department: "Classes",
    shift: "Morning",
    experience: "4 years"
  },
  {
    id: 5,
    name: "David Martinez",
    designation: "Maintenance",
    phone: "+1 234 567 8904",
    email: "david.martinez@soactiv.com",
    joiningDate: "2022-11-01",
    salary: 2500,
    status: "Active",
    department: "Operations",
    shift: "Full Day",
    experience: "6 years"
  }
];

const statusColors = {
  "Active": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "On Leave": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  "Inactive": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
};

const departmentColors = {
  "Training": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "Front Desk": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  "Classes": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  "Operations": "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
};

export default function Staff() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredStaff = mockStaff.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.designation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || staff.department === departmentFilter;
    const matchesStatus = statusFilter === "all" || staff.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const stats = {
    total: mockStaff.length,
    active: mockStaff.filter(s => s.status === "Active").length,
    onLeave: mockStaff.filter(s => s.status === "On Leave").length,
    totalSalary: mockStaff.reduce((sum, s) => sum + s.salary, 0)
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Staff Management</h1>
          <p className="text-muted-foreground">Manage gym staff, attendance, and payroll</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Clock className="h-4 w-4 mr-2" />
            Mark Attendance
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Add New Staff
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Staff</p>
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
                <UserCheck className="h-4 w-4 text-green-600 dark:text-green-300" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On Leave</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.onLeave}</p>
              </div>
              <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Salary</p>
                <p className="text-2xl font-bold">${stats.totalSalary.toLocaleString()}</p>
              </div>
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Staff</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or designation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Training">Training</SelectItem>
                <SelectItem value="Front Desk">Front Desk</SelectItem>
                <SelectItem value="Classes">Classes</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>Staff List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Shift</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Joining Date</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell className="font-medium">{staff.name}</TableCell>
                    <TableCell>{staff.designation}</TableCell>
                    <TableCell>
                      <Badge className={departmentColors[staff.department as keyof typeof departmentColors]}>
                        {staff.department}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">{staff.phone}</div>
                        <div className="text-sm text-muted-foreground">{staff.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{staff.shift}</TableCell>
                    <TableCell>{staff.experience}</TableCell>
                    <TableCell>{staff.joiningDate}</TableCell>
                    <TableCell>${staff.salary.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[staff.status as keyof typeof statusColors]}>
                        {staff.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
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