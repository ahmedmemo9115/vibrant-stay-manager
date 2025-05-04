
import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Download, User, Users } from "lucide-react";

// Mock employees data
const employees = [
  { 
    id: "EMP001", 
    name: "John Smith", 
    position: "Front Desk Manager", 
    department: "Front Office", 
    email: "john@example.com", 
    phone: "123-456-7890",
    status: "Active",
    joinDate: "Jan 15, 2024"
  },
  { 
    id: "EMP002", 
    name: "Emily Johnson", 
    position: "Housekeeper", 
    department: "Housekeeping", 
    email: "emily@example.com", 
    phone: "234-567-8901",
    status: "Active",
    joinDate: "Feb 20, 2024"
  },
  { 
    id: "EMP003", 
    name: "Michael Rodriguez", 
    position: "Maintenance Technician", 
    department: "Maintenance", 
    email: "michael@example.com", 
    phone: "345-678-9012",
    status: "Active",
    joinDate: "Mar 5, 2024"
  },
  { 
    id: "EMP004", 
    name: "Sarah Wilson", 
    position: "Executive Chef", 
    department: "Food & Beverage", 
    email: "sarah@example.com", 
    phone: "456-789-0123",
    status: "Active",
    joinDate: "Dec 10, 2023"
  },
  { 
    id: "EMP005", 
    name: "David Thompson", 
    position: "Security Officer", 
    department: "Security", 
    email: "david@example.com", 
    phone: "567-890-1234",
    status: "On Leave",
    joinDate: "Apr 18, 2024"
  },
  { 
    id: "EMP006", 
    name: "Jennifer Garcia", 
    position: "Human Resources Manager", 
    department: "Human Resources", 
    email: "jennifer@example.com", 
    phone: "678-901-2345",
    status: "Active",
    joinDate: "Feb 1, 2024"
  }
];

// Mock departments data
const departments = [
  { name: "Front Office", employeeCount: 8 },
  { name: "Housekeeping", employeeCount: 12 },
  { name: "Food & Beverage", employeeCount: 15 },
  { name: "Maintenance", employeeCount: 6 },
  { name: "Security", employeeCount: 4 },
  { name: "Human Resources", employeeCount: 3 }
];

export default function Employees() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter employees based on search
  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Staff Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Staff</p>
              <p className="text-2xl font-semibold">48</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
              <User size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Staff</p>
              <p className="text-2xl font-semibold">45</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">On Leave</p>
              <p className="text-2xl font-semibold">3</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="employees" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="schedules">Schedules</TabsTrigger>
        </TabsList>
        
        <TabsContent value="employees" className="mt-0">
          <Card>
            <CardHeader className="pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-lg">Employee List</CardTitle>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-grow sm:flex-grow-0">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search employees..."
                    className="pl-10 w-full md:w-80"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.id}</TableCell>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>
                        <div>{employee.email}</div>
                        <div className="text-muted-foreground text-xs">{employee.phone}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={employee.status === "Active" ? "bg-green-500" : "bg-orange-500"}>
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{employee.joinDate}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="departments" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Departments</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {departments.map((department) => (
                  <Card key={department.name}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{department.name}</h3>
                        <p className="text-sm text-muted-foreground">{department.employeeCount} Employees</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedules" className="mt-0">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Employee schedules and shift management will be available here</p>
              <Button className="mt-4">Setup Schedules</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
