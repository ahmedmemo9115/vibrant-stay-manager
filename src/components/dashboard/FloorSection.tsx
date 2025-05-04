
import { RoomCard } from "./RoomCard";

interface FloorSectionProps {
  floorNumber: string;
  rooms: {
    roomNumber: string;
    type: string;
    status: "vacant" | "occupied" | "reserved" | "maintenance" | "cleaning" | "checkout";
    guest?: string;
    checkIn?: string;
    checkOut?: string;
  }[];
}

export function FloorSection({ floorNumber, rooms }: FloorSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold">Floor {floorNumber}</h2>
        <div className="h-[1px] bg-border flex-grow ml-4"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {rooms.map((room) => (
          <RoomCard
            key={room.roomNumber}
            roomNumber={room.roomNumber}
            type={room.type}
            status={room.status}
            guest={room.guest}
            checkIn={room.checkIn}
            checkOut={room.checkOut}
          />
        ))}
      </div>
    </div>
  );
}
