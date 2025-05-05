
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, startOfWeek, addWeeks, subWeeks } from "date-fns";

// Mock room data
const roomsData = [
  { id: 1, roomNumber: "101", type: "Standard Single" },
  { id: 2, roomNumber: "102", type: "Standard Double" },
  { id: 3, roomNumber: "103", type: "Standard Double" },
  { id: 4, roomNumber: "201", type: "Deluxe Single" },
  { id: 5, roomNumber: "202", type: "Deluxe Double" },
  { id: 6, roomNumber: "301", type: "Executive Suite" },
];

// Mock bookings data
const bookingsData = [
  { 
    id: 1, 
    roomId: 1, 
    guestName: "John Smith", 
    startDate: new Date(2025, 4, 3), 
    endDate: new Date(2025, 4, 7)
  },
  { 
    id: 2, 
    roomId: 2, 
    guestName: "Emily Johnson", 
    startDate: new Date(2025, 4, 5), 
    endDate: new Date(2025, 4, 10)
  },
  { 
    id: 3, 
    roomId: 4, 
    guestName: "Michael Brown", 
    startDate: new Date(2025, 4, 8), 
    endDate: new Date(2025, 4, 12)
  },
];

export default function RoomsCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [calendarView, setCalendarView] = useState("week");
  const [selectedFloor, setSelectedFloor] = useState("all");
  
  // Calculate start of the week for the current date
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday as week start
  
  // Generate dates for the week view
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  // Handle navigation
  const handlePrevious = () => {
    if (calendarView === "week") {
      setCurrentDate(subWeeks(currentDate, 1));
    } else {
      const newDate = new Date(currentDate);
      newDate.setMonth(currentDate.getMonth() - 1);
      setCurrentDate(newDate);
    }
  };
  
  const handleNext = () => {
    if (calendarView === "week") {
      setCurrentDate(addWeeks(currentDate, 1));
    } else {
      const newDate = new Date(currentDate);
      newDate.setMonth(currentDate.getMonth() + 1);
      setCurrentDate(newDate);
    }
  };
  
  // Helper to check if a room is booked on a specific date
  const getBookingForDate = (roomId: number, date: Date) => {
    const dateStr = date.toDateString();
    return bookingsData.find(booking => 
      booking.roomId === roomId && 
      new Date(booking.startDate).toDateString() <= dateStr && 
      new Date(booking.endDate).toDateString() >= dateStr
    );
  };
  
  // Filter rooms based on selected floor
  const filteredRooms = roomsData.filter(room => {
    if (selectedFloor === "all") return true;
    return room.roomNumber.startsWith(selectedFloor);
  });

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Rooms Calendar</h1>
        <div className="flex gap-2">
          <Select
            value={selectedFloor}
            onValueChange={setSelectedFloor}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Floor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Floors</SelectItem>
              <SelectItem value="1">Floor 1</SelectItem>
              <SelectItem value="2">Floor 2</SelectItem>
              <SelectItem value="3">Floor 3</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={calendarView}
            onValueChange={setCalendarView}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week View</SelectItem>
              <SelectItem value="month">Month View</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {calendarView === "month" ? (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">
                {format(currentDate, "MMMM yyyy")}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handlePrevious}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setCurrentDate(new Date())}>
                  Today
                </Button>
                <Button variant="outline" size="icon" onClick={handleNext}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                month={currentDate}
                onMonthChange={setCurrentDate}
                className="rounded-md border p-3 pointer-events-auto"
                classNames={{
                  month: "space-y-4"
                }}
              />
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">
                {`${format(weekDates[0], "MMM d")} - ${format(weekDates[6], "MMM d, yyyy")}`}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handlePrevious}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setCurrentDate(new Date())}>
                  Today
                </Button>
                <Button variant="outline" size="icon" onClick={handleNext}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px]">Room</TableHead>
                      {weekDates.map((date, index) => (
                        <TableHead key={index} className="min-w-[130px] text-center">
                          <div className="font-medium">{format(date, "EEE")}</div>
                          <div className="text-sm text-muted-foreground">{format(date, "MMM d")}</div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell className="font-medium">
                          <div>{room.roomNumber}</div>
                          <div className="text-xs text-muted-foreground">{room.type}</div>
                        </TableCell>
                        {weekDates.map((date, index) => {
                          const booking = getBookingForDate(room.id, date);
                          return (
                            <TableCell key={index} className="text-center">
                              {booking ? (
                                <div className="p-2 bg-blue-100 rounded-md">
                                  <Badge variant="outline" className="bg-blue-500 text-white">
                                    {booking.guestName}
                                  </Badge>
                                  <div className="text-xs mt-1">
                                    {format(new Date(booking.startDate), "MMM d")} - {format(new Date(booking.endDate), "MMM d")}
                                  </div>
                                </div>
                              ) : (
                                <div className="p-2 bg-green-100 rounded-md">
                                  <Badge variant="outline" className="bg-green-500 text-white">
                                    Available
                                  </Badge>
                                </div>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
