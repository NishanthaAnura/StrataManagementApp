export interface BuildingResponse {
    Id: string;
    Name: string;
    Address: string;
    NumberOfUnits: number;
  }
  
  export interface BuildingRequest {
    Name: string;
    Address: string;
    NumberOfUnits: number;
  }