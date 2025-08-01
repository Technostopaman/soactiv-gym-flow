import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, Phone, Mail, Calendar } from "lucide-react";

// Mock data
const mockEnquiries = [
  {
    id: 1,
    name: "John Smith",
    phone: "+1 234 567 8900",
    email: "john.smith@email.com",
    status: "New",
    assignedStaff: "Sarah Johnson",
    date: "2024-01-15",
    followUp: "2024-01-18",
    source: "Website"
  },
  {
    id: 2,
    name: "Emily Davis",
    phone: "+1 234 567 8901",
    email: "emily.davis@email.com",
    status: "Contacted",
    assignedStaff: "Mike Wilson",
    date: "2024-01-14",
    followUp: "2024-01-17",
    source: "Walk-in"
  },
  {
    id: 3,
    name: "Alex Brown",
    phone: "+1 234 567 8902",
    email: "alex.brown@email.com",
    status: "Interested",
    assignedStaff: "Sarah Johnson",
    date: "2024-01-13",
    followUp: "2024-01-16",
    source: "Referral"
  },
  {
    id: 4,
    name: "Lisa Chen",
    phone: "+1 234 567 8903",
    email: "lisa.chen@email.com",
    status: "Converted",
    assignedStaff: "Mike Wilson",
    date: "2024-01-12",
    followUp: null,
    source: "Social Media"
  }
];

const statusColors = {
  "New": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "Contacted": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  "Interested": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "Converted": "bg-primary/10 text-primary",
  "Lost": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
};

export default function Enquiries() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [staffFilter, setStaffFilter] = useState("all");

  const filteredEnquiries = mockEnquiries.filter(enquiry => {
    const matchesSearch = enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enquiry.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || enquiry.status === statusFilter;
    const matchesStaff = staffFilter === "all" || enquiry.assignedStaff === staffFilter;
    
    return matchesSearch && matchesStatus && matchesStaff;
  });

  const stats = {
    total: mockEnquiries.length,
    new: mockEnquiries.filter(e => e.status === "New").length,
    contacted: mockEnquiries.filter(e => e.status === "Contacted").length,
    converted: mockEnquiries.filter(e => e.status === "Converted").length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Enquiries</h1>
          <p className="text-muted-foreground">Manage and track all customer enquiries</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Enquiry
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Mail className="h-4 w-4 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New</p>
                <p className="text-2xl font-bold">{stats.new}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Plus className="h-4 w-4 text-green-600 dark:text-green-300" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Contacted</p>
                <p className="text-2xl font-bold">{stats.contacted}</p>
              </div>
              <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <Phone className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Converted</p>
                <p className="text-2xl font-bold">{stats.converted}</p>
              </div>
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Enquiries</CardTitle>
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
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Interested">Interested</SelectItem>
                <SelectItem value="Converted">Converted</SelectItem>
                <SelectItem value="Lost">Lost</SelectItem>
              </SelectContent>
            </Select>
            <Select value={staffFilter} onValueChange={setStaffFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by staff" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Staff</SelectItem>
                <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                <SelectItem value="Mike Wilson">Mike Wilson</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Enquiries Table */}
      <Card>
        <CardHeader>
          <CardTitle>Enquiries List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Staff</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Follow-up</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEnquiries.map((enquiry) => (
                  <TableRow key={enquiry.id}>
                    <TableCell className="font-medium">{enquiry.name}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">{enquiry.phone}</div>
                        <div className="text-sm text-muted-foreground">{enquiry.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[enquiry.status as keyof typeof statusColors]}>
                        {enquiry.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{enquiry.assignedStaff}</TableCell>
                    <TableCell>{enquiry.date}</TableCell>
                    <TableCell>
                      {enquiry.followUp ? (
                        <span className="text-sm">{enquiry.followUp}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>{enquiry.source}</TableCell>
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