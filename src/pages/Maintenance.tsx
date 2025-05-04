
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Filter, Wrench, AlertTriangle, CheckCheck } from "lucide-react";

// Mock maintenance requests data
const maintenanceRequests = [
  { 
    id: "M001", 
    room: "102", 
    issue: "Air conditioning not working",
    reportedBy: "Front Desk",
    reportedDate: "May 2, 2025",
    priority: "High",
    status: "Open",
    assignedTo: "Michael Rodriguez"
  },
  { 
    id: "M002", 
    room: "205", 
    issue: "Leaking faucet in bathroom",
    reportedBy: "Housekeeping",
    reportedDate: "May 1, 2025",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "Michael Rodriguez"
  },
  { 
    id: "M003", 
    room: "301", 
    issue: "TV remote not functioning",
    reportedBy: "Guest",
    reportedDate: "May 3, 2025",
    priority: "Low",
    status: "Open",
    assignedTo: "Unassigned"
  },
  { 
    id: "M004", 
    room: "Lobby", 
    issue: "Main entrance automatic door malfunction",
    reportedBy: "Security",
    reportedDate: "April 30, 2025",
    priority: "High",
    status: "In Progress",
    assignedTo: "David Thompson"
  },
  { 
    id: "M005", 
    room: "204", 
    issue: "Broken lamp",
    reportedBy: "Housekeeping",
    reportedDate: "May 2, 2025",
    priority: "Low",
    status: "Completed",
    assignedTo: "Michael Rodriguez"
  }
];

// Mock maintenance staff
const maintenanceStaff = [
  { id: "EMP003", name: "Michael Rodriguez" },
  { id: "EMP005", name: "David Thompson" },
  { id: "EMP010", name: "Richard Lee" }
];

export default function Maintenance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  
  // Filter maintenance requests based on search and filters
  const filteredRequests = maintenanceRequests.filter(request => 
    (request.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
     request.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
     request.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
     request.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedPriority ? request.priority === selectedPriority : true) &&
    (selectedStatus ? request.status === selectedStatus : true)
  );

  // Count by status
  const openCount = maintenanceRequests.filter(r => r.status === "Open").length;
  const inProgressCount = maintenanceRequests.filter(r => r.status === "In Progress").length;
  const completedCount = maintenanceRequests.filter(r => r.status === "Completed").length;
  
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Maintenance</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Maintenance Request
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-4">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Open Issues</p>
              <p className="text-2xl font-semibold">{openCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
              <Wrench size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-2xl font-semibold">{inProgressCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
              <CheckCheck size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-semibold">{completedCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="activeRequests" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="activeRequests">Active Requests</TabsTrigger>
          <TabsTrigger value="completedRequests">Completed Requests</TabsTrigger>
          <TabsTrigger value="newRequest">New Request</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activeRequests" className="mt-0">
          <Card>
            <CardHeader className="pb-2 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <CardTitle>Maintenance Requests</CardTitle>
                <CardDescription>View and manage all active maintenance requests</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                <div className="relative flex-grow sm:flex-grow-0">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search requests..."
                    className="pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-priorities">All Priorities</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-statuses">All Statuses</SelectItem>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Reported</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests
                    .filter(request => request.status !== "Completed")
                    .map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>{request.room}</TableCell>
                      <TableCell>{request.issue}</TableCell>
                      <TableCell>
                        <div>{request.reportedDate}</div>
                        <div className="text-muted-foreground text-xs">{request.reportedBy}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          request.priority === "High" ? "bg-red-500" : 
                          request.priority === "Medium" ? "bg-orange-500" : 
                          "bg-blue-500"
                        }>
                          {request.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          request.status === "Open" ? "bg-yellow-500" : 
                          request.status === "In Progress" ? "bg-blue-500" : 
                          "bg-green-500"
                        }>
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{request.assignedTo}</TableCell>
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
        
        <TabsContent value="completedRequests" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Completed Maintenance Requests</CardTitle>
              <CardDescription>History of resolved maintenance issues</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Reported</TableHead>
                    <TableHead>Completed</TableHead>
                    <TableHead>Resolved By</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests
                    .filter(request => request.status === "Completed")
                    .map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>{request.room}</TableCell>
                      <TableCell>{request.issue}</TableCell>
                      <TableCell>{request.reportedDate}</TableCell>
                      <TableCell>May 4, 2025</TableCell>
                      <TableCell>{request.assignedTo}</TableCell>
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
        
        <TabsContent value="newRequest" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Create Maintenance Request</CardTitle>
              <CardDescription>Submit a new maintenance issue for resolution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="requestRoom" className="text-sm font-medium">Room/Location</label>
                  <Select>
                    <SelectTrigger id="requestRoom">
                      <SelectValue placeholder="Select room or location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="101">Room 101</SelectItem>
                      <SelectItem value="102">Room 102</SelectItem>
                      <SelectItem value="103">Room 103</SelectItem>
                      <SelectItem value="lobby">Lobby</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="pool">Pool Area</SelectItem>
                      <SelectItem value="gym">Gym</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="requestPriority" className="text-sm font-medium">Priority</label>
                  <Select>
                    <SelectTrigger id="requestPriority">
                      <SelectValue placeholder="Select priority level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="requestCategory" className="text-sm font-medium">Issue Category</label>
                  <Select>
                    <SelectTrigger id="requestCategory">
                      <SelectValue placeholder="Select issue category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="hvac">HVAC</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="appliance">Appliance</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="requestAssignee" className="text-sm font-medium">Assign To</label>
                  <Select>
                    <SelectTrigger id="requestAssignee">
                      <SelectValue placeholder="Assign maintenance staff" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      {maintenanceStaff.map(staff => (
                        <SelectItem key={staff.id} value={staff.id}>{staff.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="requestDescription" className="text-sm font-medium">Description</label>
                <Textarea 
                  id="requestDescription" 
                  placeholder="Describe the maintenance issue in detail"
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="requestReportedBy" className="text-sm font-medium">Reported By</label>
                <Select>
                  <SelectTrigger id="requestReportedBy">
                    <SelectValue placeholder="Select who reported the issue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guest">Guest</SelectItem>
                    <SelectItem value="frontDesk">Front Desk</SelectItem>
                    <SelectItem value="housekeeping">Housekeeping</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="management">Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-2 flex justify-end">
                <Button variant="outline" className="mr-2">Cancel</Button>
                <Button>Submit Request</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
