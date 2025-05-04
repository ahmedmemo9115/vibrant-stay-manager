
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { User, CalendarDays, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const isOccupied = status === "occupied";
  const isReserved = status === "reserved";
  
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
              <Button size="sm" variant="default">Check In</Button>
              <Button size="sm" variant="outline">Details</Button>
            </>
          )}
          {status === "occupied" && (
            <>
              <Button size="sm" variant="default">Check Out</Button>
              <Button size="sm" variant="outline">Details</Button>
            </>
          )}
          {status === "reserved" && (
            <>
              <Button size="sm" variant="default">Check In</Button>
              <Button size="sm" variant="outline">Details</Button>
            </>
          )}
          {status === "cleaning" && (
            <>
              <Button size="sm" variant="default">Mark Ready</Button>
              <Button size="sm" variant="outline">Details</Button>
            </>
          )}
          {status === "maintenance" && (
            <>
              <Button size="sm" variant="default">Mark Ready</Button>
              <Button size="sm" variant="outline">Details</Button>
            </>
          )}
          {status === "checkout" && (
            <>
              <Button size="sm" variant="default">Mark Clean</Button>
              <Button size="sm" variant="outline">Details</Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
