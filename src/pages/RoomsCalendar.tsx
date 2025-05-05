
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { format, addDays, startOfWeek, addWeeks, subWeeks, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";

// Mock room data
const roomsData = [
  { id: 1, roomNumber: "101", type: "Standard Single", floor: "1" },
  { id: 2, roomNumber: "102", type: "Standard Double", floor: "1" },
  { id: 3, roomNumber: "103", type: "Standard Double", floor: "1" },
  { id: 4, roomNumber: "201", type: "Deluxe Single", floor: "2" },
  { id: 5, roomNumber: "202", type: "Deluxe Double", floor: "2" },
  { id: 6, roomNumber: "301", type: "Executive Suite", floor: "3" },
];

// Mock bookings data
const bookingsData = [
  { 
    id: 1, 
    roomId: 1, 
    guestName: "John Smith", 
    startDate: new Date(2025, 4, 3), 
    endDate: new Date(2025, 4, 7),
    status: "confirmed"
  },
  { 
    id: 2, 
    roomId: 2, 
    guestName: "Emily Johnson", 
    startDate: new Date(2025, 4, 5), 
    endDate: new Date(2025, 4, 10),
    status: "confirmed"
  },
  { 
    id: 3, 
    roomId: 4, 
    guestName: "Michael Brown", 
    startDate: new Date(2025, 4, 8), 
    endDate: new Date(2025, 4, 12),
    status: "pending"
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
  
  // Helper to check if date is the start date of booking
  const isBookingStartDate = (booking: any, date: Date) => {
    return booking && isSameDay(new Date(booking.startDate), date);
  };

  // Helper to check if date is the end date of booking
  const isBookingEndDate = (booking: any, date: Date) => {
    return booking && isSameDay(new Date(booking.endDate), date);
  };
  
  // Filter rooms based on selected floor
  const filteredRooms = roomsData.filter(room => {
    if (selectedFloor === "all") return true;
    return room.floor === selectedFloor;
  });

  const getBookingClasses = (booking: any) => {
    if (!booking) return "bg-green-100 text-green-800 border-green-200";
    return booking.status === "confirmed" 
      ? "bg-blue-100 text-blue-800 border-blue-300" 
      : "bg-amber-100 text-amber-800 border-amber-300";
  };

  return (
    <Layout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-hotel-700">Rooms Calendar</h1>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Select
              value={selectedFloor}
              onValueChange={setSelectedFloor}
            >
              <SelectTrigger className="w-full sm:w-[140px] bg-white border-hotel-200">
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
              <SelectTrigger className="w-full sm:w-[140px] bg-white border-hotel-200">
                <SelectValue placeholder="Select View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Week View</SelectItem>
                <SelectItem value="month">Month View</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Card className="border-hotel-200 shadow-md">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-hotel-100">
            <CardTitle className="text-xl text-hotel-700">
              {calendarView === "month" 
                ? format(currentDate, "MMMM yyyy") 
                : `${format(weekDates[0], "MMM d")} - ${format(weekDates[6], "MMM d, yyyy")}`}
            </CardTitle>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handlePrevious}
                className="border-hotel-200 hover:bg-hotel-50"
              >
                <ChevronLeft className="h-4 w-4 text-hotel-600" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentDate(new Date())}
                className="border-hotel-200 hover:bg-hotel-50 text-hotel-600"
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Today
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleNext}
                className="border-hotel-200 hover:bg-hotel-50"
              >
                <ChevronRight className="h-4 w-4 text-hotel-600" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {calendarView === "month" ? (
              <div className="p-4 bg-white rounded-b-lg">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  month={currentDate}
                  onMonthChange={setCurrentDate}
                  className="mx-auto max-w-sm border border-hotel-100 rounded-lg shadow-sm"
                />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-hotel-50">
                      <TableHead className="w-[120px] font-medium text-hotel-700">Room</TableHead>
                      {weekDates.map((date, index) => (
                        <TableHead key={index} className="min-w-[130px] text-center font-medium">
                          <div className={cn(
                            "py-1",
                            isSameDay(date, new Date()) && "bg-hotel-100 rounded-t-md"
                          )}>
                            <div className="text-hotel-700">{format(date, "EEE")}</div>
                            <div className="text-sm text-hotel-500">{format(date, "MMM d")}</div>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRooms.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-32 text-center">
                          <div className="flex flex-col items-center justify-center text-hotel-500">
                            <CalendarIcon className="h-12 w-12 mb-2 opacity-20" />
                            <p className="text-lg">No rooms found for the selected floor</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRooms.map((room) => (
                        <TableRow key={room.id} className="hover:bg-hotel-50/50">
                          <TableCell className="font-medium border-r border-hotel-100">
                            <div className="bg-hotel-50 px-2 py-1 rounded">
                              <div className="text-hotel-800">{room.roomNumber}</div>
                              <div className="text-xs text-hotel-500">{room.type}</div>
                            </div>
                          </TableCell>
                          {weekDates.map((date, index) => {
                            const booking = getBookingForDate(room.id, date);
                            const isStartDate = isBookingStartDate(booking, date);
                            const isEndDate = isBookingEndDate(booking, date);
                            
                            return (
                              <TableCell 
                                key={index} 
                                className={cn(
                                  "p-1 text-center border-r border-hotel-100 h-20",
                                  isSameDay(date, new Date()) && "bg-hotel-50/50"
                                )}
                              >
                                {booking ? (
                                  <div className={cn(
                                    "h-full p-2 rounded-md border flex flex-col justify-between",
                                    getBookingClasses(booking),
                                    isStartDate && "rounded-l-md border-l-4",
                                    isEndDate && "rounded-r-md border-r-4"
                                  )}>
                                    <div className="text-xs font-medium">
                                      {isStartDate && (
                                        <Badge variant="outline" className={cn(
                                          "bg-white",
                                          booking.status === "confirmed" ? "text-blue-600" : "text-amber-600"
                                        )}>
                                          {booking.status === "confirmed" ? "Check-in" : "Pending"}
                                        </Badge>
                                      )}
                                      {isEndDate && (
                                        <Badge variant="outline" className="bg-white text-blue-600">
                                          Check-out
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="mt-auto">
                                      <div className="text-sm font-medium truncate">
                                        {booking.guestName}
                                      </div>
                                      <div className="text-xs mt-1">
                                        {format(new Date(booking.startDate), "MMM d")} - {format(new Date(booking.endDate), "MMM d")}
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="h-full p-2 rounded-md border border-green-200 bg-green-50 flex items-center justify-center">
                                    <Badge variant="outline" className="bg-white text-green-600 hover:bg-green-50">
                                      Available
                                    </Badge>
                                  </div>
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
