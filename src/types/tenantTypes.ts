export interface TenantRequest {
    Name: string;
    Contact: string;
    BuildingId: string;
    AssignedUnit: string;
  }

  export interface TenantResponse {
    Id: string;
    Name: string;
    Contact: string;
    BuildingId: string;
    AssignedUnit: string;
    Building: {
        Name: string,
        Address: string
    }
  }