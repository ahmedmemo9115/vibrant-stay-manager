
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface RoomCardProps {
  roomNumber: string;
  roomType: string;
  status: "vacant" | "occupied" | "reserved" | "cleaning" | "maintenance" | "checkout";
  guest?: string;
  checkIn?: string;
  checkOut?: string;
  onViewDetails?: () => void;
}

export function RoomCard({ 
  roomNumber, 
  roomType, 
  status, 
  guest, 
  checkIn, 
  checkOut,
  onViewDetails 
}: RoomCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden border-l-4 hover:shadow-md transition-all"
      style={{ borderLeftColor: getStatusColor(status) }}>
      <CardHeader className="pb-2 bg-gray-50">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">Room {roomNumber}</h3>
            <p className="text-sm text-muted-foreground">{roomType}</p>
          </div>
          <StatusBadge status={status} />
        </div>
      </CardHeader>
      <CardContent className="flex-grow pt-4">
        {status === "occupied" && guest ? (
          <div className="space-y-1">
            <p className="text-sm font-medium">Guest: {guest}</p>
            <p className="text-xs text-muted-foreground">Check-in: {checkIn}</p>
            <p className="text-xs text-muted-foreground">Check-out: {checkOut}</p>
          </div>
        ) : status === "reserved" && guest ? (
          <div className="space-y-1">
            <p className="text-sm font-medium">Reserved for: {guest}</p>
            <p className="text-xs text-muted-foreground">Arriving: {checkIn}</p>
            <p className="text-xs text-muted-foreground">Departing: {checkOut}</p>
          </div>
        ) : (
          <p className="text-sm">{getStatusDescription(status)}</p>
        )}
      </CardContent>
      <CardFooter className="pt-2 bg-gray-50">
        <Button onClick={onViewDetails} variant="outline" className="w-full hover:bg-gray-100" size="sm">
          <FileText className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

function getStatusDescription(status: string) {
  switch (status) {
    case "vacant":
      return "Room is ready for check-in";
    case "cleaning":
      return "Room is being cleaned";
    case "maintenance":
      return "Room is under maintenance";
    case "checkout":
      return "Guest checked out, pending cleaning";
    default:
      return "";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "vacant":
      return "#10b981"; // green
    case "occupied":
      return "#3b82f6"; // blue
    case "reserved":
      return "#f59e0b"; // amber
    case "cleaning":
      return "#8b5cf6"; // purple
    case "maintenance":
      return "#ef4444"; // red
    case "checkout":
      return "#6b7280"; // gray
    default:
      return "#cbd5e1"; // slate
  }
}
