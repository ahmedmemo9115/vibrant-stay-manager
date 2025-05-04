
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Download, Building } from "lucide-react";

// Mock companies data
const companies = [
  { 
    id: "C001", 
    name: "Global Enterprises Ltd.", 
    contactPerson: "Robert Brown",
    email: "robert@globalent.com", 
    phone: "123-456-7890",
    address: "123 Business Ave, New York, NY",
    type: "Corporate",
    status: "Active",
    lastStay: "April 10, 2025"
  },
  { 
    id: "C002", 
    name: "Tech Innovations Inc.", 
    contactPerson: "Sarah Johnson",
    email: "sarah@techinnovations.com", 
    phone: "234-567-8901",
    address: "456 Tech Boulevard, San Francisco, CA",
    type: "Corporate",
    status: "Active",
    lastStay: "April 25, 2025"
  },
  { 
    id: "C003", 
    name: "Sunset Tours Ltd.", 
    contactPerson: "Michael Davis",
    email: "michael@sunsettours.com", 
    phone: "345-678-9012",
    address: "789 Tourism Road, Miami, FL",
    type: "Travel Agency",
    status: "Active",
    lastStay: "May 5, 2025"
  },
  { 
    id: "C004", 
    name: "Global Voyagers", 
    contactPerson: "Jennifer Wilson",
    email: "jennifer@globalvoyagers.com", 
    phone: "456-789-0123",
    address: "101 Travel Plaza, Chicago, IL",
    type: "Travel Agency",
    status: "Inactive",
    lastStay: "February 15, 2025"
  },
  { 
    id: "C005", 
    name: "Medical Conferences International", 
    contactPerson: "David Martinez",
    email: "david@medicalconferences.com", 
    phone: "567-890-1234",
    address: "202 Health Avenue, Boston, MA",
    type: "Event Organizer",
    status: "Active",
    lastStay: "March 20, 2025"
  }
];

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter companies based on search
  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Count by type
  const corporateCount = companies.filter(c => c.type === "Corporate").length;
  const travelAgencyCount = companies.filter(c => c.type === "Travel Agency").length;
  const otherCount = companies.filter(c => !["Corporate", "Travel Agency"].includes(c.type)).length;
  
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Corporate Clients</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Company
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
              <Building size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Companies</p>
              <p className="text-2xl font-semibold">{companies.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Corporate</p>
              <p className="text-2xl font-semibold">{corporateCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Travel Agencies</p>
              <p className="text-2xl font-semibold">{travelAgencyCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tag"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Other</p>
              <p className="text-2xl font-semibold">{otherCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Company Directory</CardTitle>
            <CardDescription>Manage your corporate clients and business partners</CardDescription>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search companies..."
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
                <TableHead>Company Name</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Contact Details</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Stay</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">{company.id}</TableCell>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.contactPerson}</TableCell>
                  <TableCell>
                    <div>{company.email}</div>
                    <div className="text-muted-foreground text-xs">{company.phone}</div>
                  </TableCell>
                  <TableCell>{company.type}</TableCell>
                  <TableCell>
                    <Badge className={company.status === "Active" ? "bg-green-500" : "bg-gray-500"}>
                      {company.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{company.lastStay}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  );
}
