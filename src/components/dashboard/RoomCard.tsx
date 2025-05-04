import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { User, CalendarDays, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

type RoomStatus = "vacant" | "occupied" | "reserved" | "maintenance" | "cleaning" | "checkout";

interface RoomCardProps {
  roomNumber: string;
  type: string;
  status: RoomStatus;
  guest?: string;
  checkIn?: string;
  checkOut?: string;
  className?: string;
}

export function RoomCard({
  roomNumber,
  type,
  status,
  guest,
  checkIn,
  checkOut,
  className
}: RoomCardProps) {
  const navigate = useNavigate();
  const isOccupied = status === "occupied";
  const isReserved = status === "reserved";
  
  const handleCheckIn = () => {
    navigate(`/checkin?room=${roomNumber}`);
  };
  
  const handleCheckOut = () => {
    navigate(`/checkout?room=${roomNumber}`);
  };
  
  const handleViewDetails = () => {
    if (isOccupied || isReserved) {
      navigate(`/reservations?room=${roomNumber}`);
    } else {
      navigate(`/rooms?room=${roomNumber}`);
    }
  };
  
  const handleMarkReady = () => {
    // For maintenance or cleaning, navigate to maintenance details
    navigate(`/maintenance?room=${roomNumber}`);
  };
  
  const handleMarkClean = () => {
    // For checkout, navigate to housekeeping
    navigate(`/housekeeping?room=${roomNumber}`);
  };
  
  return (
    <Card className={cn("overflow-hidden border-l-4", {
      "border-l-status-vacant": status === "vacant",
      "border-l-status-occupied": status === "occupied",
      "border-l-status-reserved": status === "reserved",
      "border-l-status-maintenance": status === "maintenance",
      "border-l-status-cleaning": status === "cleaning",
      "border-l-status-checkout": status === "checkout",
    }, className)}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold">{roomNumber}</h3>
            <p className="text-sm text-muted-foreground">{type}</p>
          </div>
          <StatusBadge status={status} />
        </div>
        
        {(isOccupied || isReserved) && (
          <div className="space-y-2">
            {guest && (
              <div className="flex items-center gap-2 text-sm">
                <User size={14} className="text-muted-foreground" />
                <span>{guest}</span>
              </div>
            )}
            {checkIn && (
              <div className="flex items-center gap-2 text-sm">
                <CalendarDays size={14} className="text-muted-foreground" />
                <span>Check In: {checkIn}</span>
              </div>
            )}
            {checkOut && (
              <div className="flex items-center gap-2 text-sm">
                <Clock size={14} className="text-muted-foreground" />
                <span>Check Out: {checkOut}</span>
              </div>
            )}
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-2 mt-3">
          {status === "vacant" && (
            <>
              <Button size="sm" variant="default" onClick={handleCheckIn}>Check In</Button>
              <Button size="sm" variant="outline" onClick={handleViewDetails}>Details</Button>
            </>
          )}
          {status === "occupied" && (
            <>
              <Button size="sm" variant="default" onClick={handleCheckOut}>Check Out</Button>
              <Button size="sm" variant="outline" onClick={handleViewDetails}>Details</Button>
            </>
          )}
          {status === "reserved" && (
            <>
              <Button size="sm" variant="default" onClick={handleCheckIn}>Check In</Button>
              <Button size="sm" variant="outline" onClick={handleViewDetails}>Details</Button>
            </>
          )}
          {status === "cleaning" && (
            <>
              <Button size="sm" variant="default" onClick={handleMarkReady}>Mark Ready</Button>
              <Button size="sm" variant="outline" onClick={handleViewDetails}>Details</Button>
            </>
          )}
          {status === "maintenance" && (
            <>
              <Button size="sm" variant="default" onClick={handleMarkReady}>Mark Ready</Button>
              <Button size="sm" variant="outline" onClick={handleViewDetails}>Details</Button>
            </>
          )}
          {status === "checkout" && (
            <>
              <Button size="sm" variant="default" onClick={handleMarkClean}>Mark Clean</Button>
              <Button size="sm" variant="outline" onClick={handleViewDetails}>Details</Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
