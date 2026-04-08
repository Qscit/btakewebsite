export type BookingStatus =
  | "CONFIRMED"
  | "PENDING"
  | "CANCELLED";

export type BookingType =
  | "MONTHLY"
  | "DAILY";

export type TenantType =
  | "BOYS"
  | "GIRLS"
  | "FAMILY";

export type IncludeFood =
  | "YES"
  | "NO";

export interface BookingTenant {
  advanceDeposit: number;
  bookingId: string;
  bookingStatus: BookingStatus;
  bookingType: BookingType;
  checkInDate: string;
  checkOutDate: string | null;
  includeFood: IncludeFood;
  lastSixMonthsRent: string[];
  monthlyRent: number;
  occupiedBed: number;
  roomName: string;
  tenantType: TenantType;
  totalBed: number;
  userEmail: string;
  userName: string;
  userPhoneNumber: string;
}