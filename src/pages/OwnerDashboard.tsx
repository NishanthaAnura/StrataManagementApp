import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import MaintenanceTable from "../components/Common/MaintenanceTable";
import MaintenanceForm from "../components/Common/MaintenanceForm";
import api from "../api/api";
import {
  MaintenanceRequestResponse,
  MaintenanceRequest,
  RoleBaseMaintenanceRequest,
  MaintenanceStatus,
} from "../types/maintenanceTypes";
import { BuildingResponse } from "../types/buildingTypes";
import { OwnerResponse } from "../types/ownerTypes";
import { SubmitHandler } from "react-hook-form";

const OwnerDashboard: React.FC = () => {
  const { logout, userRole, userEmail } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<MaintenanceRequestResponse[]>([]);
  const [buildings, setBuildings] = useState<BuildingResponse[]>([]);
  const [selectedRequest, setSelectedRequest] =
    useState<MaintenanceRequestResponse | null>(null);
  const [hasProfile, setHasProfile] = useState<boolean>(false);
  const [ownerProfile, setOwnerProfile] = useState<OwnerResponse | null>(null); // Add ownerProfile state

  // Memoize the checkOwnerProfile function
  const checkOwnerProfile = useCallback(async () => {
    try {
      const response = await api.get(`/Owner/by-email/${userEmail}`);
      setOwnerProfile(response.data); // Set owner profile data
      setHasProfile(true);
    } catch (error) {
      console.error("Failed to fetch owner profile:", error);
      setHasProfile(false);
      navigate("/owner/profile");
    }
  }, [userEmail, navigate]);

  const fetchBuildings = useCallback(async () => {
    try {
      const response = await api.get("/Building");
      setBuildings(response.data);
    } catch (error) {
      console.error("Failed to fetch buildings:", error);
    }
  }, []);

  const fetchMaintenanceRequests = useCallback(async () => {
    try {
      const request: RoleBaseMaintenanceRequest = {
        Role: userRole || "Owner",
        BuildingId: ownerProfile?.AssignedBuildingId,
      };
      const response = await api.post("/MaintenanceRequest/user", request);
      setRequests(response.data);
    } catch (error) {
      console.error("Failed to fetch maintenance requests:", error);
    }
  }, [userRole, ownerProfile?.AssignedBuildingId]);

  useEffect(() => {
    document.title = "Owner Dashboard - Strata Management Portal";
    checkOwnerProfile();
    fetchBuildings();
    fetchMaintenanceRequests();
  }, [checkOwnerProfile, fetchBuildings, fetchMaintenanceRequests]);

  const handleEditRequest = (request: MaintenanceRequestResponse) => {
    setSelectedRequest(request);
  };

  const handleDeleteRequest = async (id: string) => {
    try {
      await api.delete(`/MaintenanceRequest/${id}`);
      fetchMaintenanceRequests();
    } catch (error) {
      console.error("Failed to delete maintenance request:", error);
    }
  };

  const handleStatusChange = async (id: string, status: MaintenanceStatus) => {
    try {
      await api.put(`/MaintenanceRequest/${id}`, { Status: status });
      fetchMaintenanceRequests();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleSubmitRequest: SubmitHandler<MaintenanceRequest> = async (
    data
  ) => {
    try {
      if (selectedRequest) {
        await api.put(`/MaintenanceRequest/${selectedRequest.Id}`, data);
      } else {
        await api.post("/MaintenanceRequest", data);
      }
      setSelectedRequest(null);
      fetchMaintenanceRequests();
    } catch (error) {
      console.error("Failed to save maintenance request:", error);
    }
  };

  if (!hasProfile) {
    return null; // Redirect to profile creation is handled in useEffect
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Owner Dashboard
      </Typography>
      <Button onClick={logout}>Logout</Button>

      {/* Display Owner Profile Data */}
      {ownerProfile && (
        <Box sx={{ mt: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Profile Information
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>{ownerProfile.Name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Contact</strong>
                  </TableCell>
                  <TableCell>{ownerProfile.Contact}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Assigned Building</strong>
                  </TableCell>
                  <TableCell>
                    {ownerProfile.AssignedBuilding.Name} (
                    {ownerProfile.AssignedBuilding.Address})
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Number of Units</strong>
                  </TableCell>
                  <TableCell>
                    {ownerProfile.AssignedBuilding.NumberOfUnits}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      <Typography variant="h5" gutterBottom>
        Maintenance Requests
      </Typography>
      <MaintenanceForm
        onSubmit={handleSubmitRequest}
        defaultValues={selectedRequest || undefined}
        buildings={buildings}
        canEditBuilding={false}
        assignedBuildingId={ownerProfile?.AssignedBuildingId}
      />
      <MaintenanceTable
        requests={requests}
        onEdit={handleEditRequest}
        onDelete={handleDeleteRequest}
        onStatusChange={handleStatusChange}
        canEditStatus={false}
      />
    </Box>
  );
};

export default OwnerDashboard;
