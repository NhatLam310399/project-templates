export interface IHomePageManager {
  successBooking?: number;
  approvedBooking?: number;
  waitingForApprovedBooking?: number;
  canceledBooking?: number;
  revenue?: number;
  totalRoom?: number;
  totalCustomer?: number;
}

export interface IGetAllHomePageManager {
  placeId?: string;
}
