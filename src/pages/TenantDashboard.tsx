import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Stack,
  Tooltip,
} from "@mui/material";
import { AccountCircle, Close, Add } from "@mui/icons-material";
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
import { TenantResponse } from "../types/tenantTypes";
import { SubmitHandler } from "react-hook-form";

const TenantDashboard: React.FC = () => {
  const { logout, userRole, userEmail } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<MaintenanceRequestResponse[]>([]);
  const [buildings, setBuildings] = useState<BuildingResponse[]>([]);
  const [selectedRequest, setSelectedRequest] =
    useState<MaintenanceRequestResponse | null>(null);
  const [hasProfile, setHasProfile] = useState<boolean>(false);
  const [tenantProfile, setTenantProfile] = useState<TenantResponse | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [requestFormOpen, setRequestFormOpen] = useState(false);

  const checkTenantProfile = useCallback(async () => {
    try {
      const response = await api.get(`/Tenant/by-email/${userEmail}`);
      setTenantProfile(response.data);
      setHasProfile(true);
    } catch (error) {
      console.error("Failed to fetch tenant profile:", error);
      setHasProfile(false);
      navigate("/tenant/profile");
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
        Role: userRole || "Tenant",
        BuildingId: tenantProfile?.BuildingId,
        UnitNumber: tenantProfile?.AssignedUnit,
      };
      const response = await api.post("/MaintenanceRequest/user", request);
      setRequests(response.data);
    } catch (error) {
      console.error("Failed to fetch maintenance requests:", error);
    }
  }, [userRole, tenantProfile?.BuildingId, tenantProfile?.AssignedUnit]);

  useEffect(() => {
    document.title = "Tenant Dashboard - Strata Management Portal";
    checkTenantProfile();
    fetchBuildings();
    fetchMaintenanceRequests();
  }, [checkTenantProfile, fetchBuildings, fetchMaintenanceRequests]);

  const handleStatusChange = async (id: string, status: MaintenanceStatus) => {
    try {
      await api.put(`/MaintenanceRequest/${id}`, { Status: status });
      fetchMaintenanceRequests();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleSubmitRequest: SubmitHandler<MaintenanceRequest> = async (data) => {
    try {
      if (selectedRequest) {
        await api.put(`/MaintenanceRequest/${selectedRequest.Id}`, data);
      } else {
        await api.post("/MaintenanceRequest", data);
      }
      setRequestFormOpen(false);
      setSelectedRequest(null);
      fetchMaintenanceRequests();
    } catch (error) {
      console.error("Failed to save maintenance request:", error);
    }
  };

  const handleNewRequestClick = () => {
    setSelectedRequest(null);
    setRequestFormOpen(true);
  };

  if (!hasProfile) {
    return null;
  }

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", p: 3 }}>
      {/* Header Section */}
      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        mb: 4,
        position: 'relative'
      }}>
        <Box sx={{ flex: 1 }} /> 
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 600,
            textAlign: 'center',
            flex: 1
          }}
        >
          Tenant Dashboard
        </Typography>
        <Box sx={{ 
          display: "flex", 
          justifyContent: "flex-end",
          flex: 1
        }}>
          <IconButton onClick={() => setProfileOpen(true)} sx={{ p: 0 }}>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <AccountCircle />
            </Avatar>
          </IconButton>
        </Box>
      </Box>

      {/* Maintenance Requests Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2 
        }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 500 }}>
            Maintenance Requests
          </Typography>
          <Tooltip title="Create New Request">
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleNewRequestClick}
              sx={{ textTransform: "none" }}
            >
              New Request
            </Button>
          </Tooltip>
        </Box>
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
          <MaintenanceTable
            requests={requests}
            onStatusChange={handleStatusChange}
            canEditStatus={false}
          />
        </Box>
      </Box>

      {/* Profile Dialog */}
      <Dialog open={profileOpen} onClose={() => setProfileOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">Profile Information</Typography>
          <IconButton onClick={() => setProfileOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {tenantProfile && (
            <Stack spacing={2} sx={{ p: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ width: 64, height: 64, bgcolor: "primary.main" }}>
                  <AccountCircle sx={{ fontSize: 40 }} />
                </Avatar>
                <Box>
                  <Typography variant="h6">{tenantProfile.Name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tenant
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                  Contact Information
                </Typography>
                <Typography>{tenantProfile.Contact}</Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                  Property Information
                </Typography>
                <Typography>
                  <strong>Building:</strong> {tenantProfile.Building.Name} ({tenantProfile.Building.Address})
                </Typography>
                <Typography>
                  <strong>Unit:</strong> {tenantProfile.AssignedUnit}
                </Typography>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setProfileOpen(false)} color="primary">
            Close
          </Button>
          <Button onClick={logout} color="error">
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      {/* Request Form Dialog */}
      <Dialog 
        open={requestFormOpen} 
        onClose={() => setRequestFormOpen(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">
            {selectedRequest ? "Edit Maintenance Request" : "Create Maintenance Request"}
          </Typography>
          <IconButton onClick={() => setRequestFormOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <MaintenanceForm
            onSubmit={(data) => {
              handleSubmitRequest(data);
              setRequestFormOpen(false);
            }}
            defaultValues={selectedRequest || undefined}
            buildings={buildings}
            canEditBuilding={false}
            assignedBuildingId={tenantProfile?.BuildingId}
            assignedUnit={tenantProfile?.AssignedUnit}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setRequestFormOpen(false)} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            form="maintenance-form" 
            variant="contained" 
            color="primary"
          >
            {selectedRequest ? "Update Request" : "Create Request"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TenantDashboard;