
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
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search, Filter, Download } from "lucide-react";

// Mock guests data
const guests = [
  { 
    id: "G001", 
    name: "Alex Johnson", 
    email: "alex@example.com", 
    phone: "123-456-7890", 
    checkIn: "May 2, 2025", 
    checkOut: "May 5, 2025", 
    room: "102",
    status: "Checked In",
    visits: 3
  },
  { 
    id: "G002", 
    name: "Sarah Williams", 
    email: "sarah@example.com", 
    phone: "234-567-8901", 
    checkIn: "May 5, 2025", 
    checkOut: "May 8, 2025", 
    room: "103",
    status: "Reserved",
    visits: 1
  },
  { 
    id: "G003", 
    name: "Michael Brown", 
    email: "michael@example.com", 
    phone: "345-678-9012", 
    checkIn: "May 1, 2025", 
    checkOut: "May 4, 2025", 
    room: "202",
    status: "Checked In",
    visits: 5
  },
  { 
    id: "G004", 
    name: "Emily Davis", 
    email: "emily@example.com", 
    phone: "456-789-0123", 
    checkIn: "May 3, 2025", 
    checkOut: "May 10, 2025", 
    room: "204",
    status: "Checked In",
    visits: 2
  },
  { 
    id: "G005", 
    name: "David Wilson", 
    email: "david@example.com", 
    phone: "567-890-1234", 
    checkIn: "May 7, 2025", 
    checkOut: "May 12, 2025", 
    room: "206",
    status: "Reserved",
    visits: 4
  },
  { 
    id: "G006", 
    name: "Jennifer Taylor", 
    email: "jennifer@example.com", 
    phone: "678-901-2345", 
    checkIn: "May 2, 2025", 
    checkOut: "May 6, 2025", 
    room: "302",
    status: "Checked In",
    visits: 1
  },
  { 
    id: "G007", 
    name: "Robert Martinez", 
    email: "robert@example.com", 
    phone: "789-012-3456", 
    checkIn: "May 8, 2025", 
    checkOut: "May 15, 2025", 
    room: "303",
    status: "Reserved",
    visits: 2
  },
  { 
    id: "G008", 
    name: "Thomas Anderson", 
    email: "thomas@example.com", 
    phone: "890-123-4567", 
    checkIn: "April 29, 2025", 
    checkOut: "May 1, 2025", 
    room: "",
    status: "Checked Out",
    visits: 3
  }
];

export default function Guests() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.phone.includes(searchTerm) ||
    guest.room.includes(searchTerm)
  );
  
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Guest Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Guest
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Guests</p>
            <p className="text-2xl font-semibold">8</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Checked In</p>
            <p className="text-2xl font-semibold text-blue-600">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Reserved</p>
            <p className="text-2xl font-semibold text-orange-600">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Checked Out</p>
            <p className="text-2xl font-semibold text-gray-600">1</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-4 flex justify-between items-center">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search guests..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Visits</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGuests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell className="font-medium">{guest.id}</TableCell>
                  <TableCell>{guest.name}</TableCell>
                  <TableCell>{guest.email}</TableCell>
                  <TableCell>{guest.phone}</TableCell>
                  <TableCell>{guest.checkIn}</TableCell>
                  <TableCell>{guest.checkOut}</TableCell>
                  <TableCell>{guest.room || "-"}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      guest.status === "Checked In" ? "bg-blue-100 text-blue-800" : 
                      guest.status === "Reserved" ? "bg-orange-100 text-orange-800" : 
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {guest.status}
                    </span>
                  </TableCell>
                  <TableCell>{guest.visits}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
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
