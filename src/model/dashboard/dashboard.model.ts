export interface RoomOccupancy {
  roomType: string;
  totalBeds: number;
  occupied: number;
  available: number;
}

export interface MonthlyBooking {
  month: string;
  total: number;
}
    
export interface Dashboard {
  totalRoom: number | null;
  totalTenant: number | null;
  roomOccupancies: RoomOccupancy[];
  monthlyBookings: MonthlyBooking[];
}