export interface OwnerRequest {
    Name: string;
    Contact: string;
    AssignedBuildingId: string;
  }
  
  export interface OwnerResponse {
    Id: string;
    Name: string;
    Contact: string;
    AssignedBuildingId: string;
    AssignedBuilding: {
      Name: string;
      Address: string;
      NumberOfUnits: number;
    };
  }
  