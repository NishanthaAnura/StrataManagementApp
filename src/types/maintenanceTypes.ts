export interface MaintenanceRequestResponse {
    Id: string;
    Title: string;
    Description: string;
    Status: MaintenanceStatus;
    BuildingId: string;
    UnitNumber?: string;
    LastChangedTime: string;
    BuildingName: string;
  }
  
  export interface MaintenanceRequest {
    Title: string;
    Description: string;
    Status: MaintenanceStatus;
    BuildingId: string;
    UnitNumber?: string;
  }
  
  export enum MaintenanceStatus {
    Pending = 'Pending',
    InProgress = 'InProgress',
    Completed = 'Completed',
  }
  
  export interface RoleBaseMaintenanceRequest {
    Role: string;
    BuildingId?: string;
    UnitNumber?: string;
  }