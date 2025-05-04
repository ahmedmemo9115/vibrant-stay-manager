
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
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">Room {roomNumber}</h3>
            <p className="text-sm text-muted-foreground">{roomType}</p>
          </div>
          <StatusBadge status={status} />
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
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
      <CardFooter>
        <Button onClick={onViewDetails} variant="outline" className="w-full" size="sm">
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
