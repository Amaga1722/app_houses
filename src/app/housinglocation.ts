export interface HousingLocationInfo {
  id: number;
  name: string;
  city: string;
  state: string;
  photo: string;
  wifi: boolean;
  laundry: boolean;
  reservations: Array<{
    from: string; 
    to: string;   
  }>;
}