import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Box, Typography, Button, Tabs, Tab, Fab } from '@mui/material';
import BuildingTable from '../components/Admin/BuildingTable';
import BuildingForm from '../components/Admin/BuildingForm';
import OwnerTable from '../components/Admin/OwnerTable';
import OwnerForm from '../components/Admin/OwnerForm';
import MaintenanceTable from '../components/Common/MaintenanceTable';
import TenantTable from '../components/Admin/TenantTable';
import TenantForm from '../components/Admin/TenantForm';
import api from '../api/api';
import { BuildingResponse, BuildingRequest } from '../types/buildingTypes';
import { OwnerResponse, OwnerRequest } from '../types/ownerTypes';
import { TenantResponse, TenantRequest } from '../types/tenantTypes';
import { MaintenanceRequestResponse, MaintenanceStatus } from '../types/maintenanceTypes';
import { SubmitHandler } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [buildings, setBuildings] = useState<BuildingResponse[]>([]);
  const [owners, setOwners] = useState<OwnerResponse[]>([]);
  const [tenants, setTenants] = useState<TenantResponse[]>([]);
  const [requests, setRequests] = useState<MaintenanceRequestResponse[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingResponse | null>(null);
  const [selectedOwner, setSelectedOwner] = useState<OwnerResponse | null>(null);
  const [selectedTenant, setSelectedTenant] = useState<TenantResponse | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    document.title = 'Admin Dashboard - Strata Management Portal';
    fetchBuildings();
    fetchOwners();
    fetchTenants();
    fetchMaintenanceRequests();
  }, []);

  const fetchBuildings = async () => {
    try {
      const response = await api.get('/Building');
      setBuildings(response.data);
    } catch (error) {
      console.error('Failed to fetch buildings', error);
    }
  };

  const fetchOwners = async () => {
    try {
      const response = await api.get('/Owner');
      setOwners(response.data);
    } catch (error) {
      console.error('Failed to fetch owners', error);
    }
  };

  const fetchTenants = async () => {
    try {
      const response = await api.get('/Tenant');
      setTenants(response.data);
    } catch (error) {
      console.error('Failed to fetch tenants', error);
    }
  };

  const fetchMaintenanceRequests = async () => {
    try {
      const response = await api.get('/MaintenanceRequest');
      setRequests(response.data);
    } catch (error) {
      console.error('Failed to fetch maintenance requests', error);
    }
  };

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setSelectedBuilding(null);
  };

  const handleEditBuilding = (building: BuildingResponse) => {
    setSelectedBuilding(building);
    handleFormOpen();
  };

  const handleDeleteBuilding = async (id: string) => {
    try {
      await api.delete(`/Building/${id}`);
      fetchBuildings();
    } catch (error) {
      console.error('Failed to delete building', error);
    }
  };

  const handleSubmitBuilding: SubmitHandler<BuildingRequest> = async (data) => {
    try {
      if (selectedBuilding) {
        await api.put(`/Building/${selectedBuilding.Id}`, data);
      } else {
        await api.post('/Building', data);
      }
      setSelectedBuilding(null);
      fetchBuildings();
      handleFormClose(); // Close the form after submission
    } catch (error) {
      console.error('Failed to save building', error);
    }
  };

  const handleEditOwner = (owner: OwnerResponse) => {
    setSelectedOwner(owner);
  };

  const handleDeleteOwner = async (id: string) => {
    try {
      await api.delete(`/Owner/${id}`);
      fetchOwners();
    } catch (error) {
      console.error('Failed to delete owner', error);
    }
  };

  const handleSubmitOwner: SubmitHandler<OwnerRequest> = async (data) => {
    try {
      if (selectedOwner) {
        await api.put(`/Owner/${selectedOwner.Id}`, data);
      } else {
        await api.post('/Owner', data);
      }
      setSelectedOwner(null);
      fetchOwners();
    } catch (error) {
      console.error('Failed to save owner', error);
    }
  };

  const handleEditTenant = (tenant: TenantResponse) => {
    setSelectedTenant(tenant);
  };

  const handleDeleteTenant = async (id: string) => {
    try {
      await api.delete(`/Tenant/${id}`);
      fetchTenants();
    } catch (error) {
      console.error('Failed to delete tenant', error);
    }
  };

  const handleSubmitTenant: SubmitHandler<TenantRequest> = async (data) => {
    try {
      if (selectedTenant) {
        await api.put(`/Tenant/${selectedTenant.Id}`, data);
      } else {
        await api.post('/Tenant', data);
      }
      setSelectedTenant(null);
      fetchTenants();
    } catch (error) {
      console.error('Failed to save tenant', error);
    }
  };

  const handleStatusChange = async (id: string, status: MaintenanceStatus) => {
    try {
      await api.put(`/MaintenanceRequest/${id}`, { Status: status });
      fetchMaintenanceRequests();
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  return (
    <Box sx={{ width: '210mm', height: '297mm', margin: 'auto', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Button onClick={logout}>Logout</Button>

      <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
        <Tab label="Buildings" />
        <Tab label="Owners" />
        <Tab label="Tenants" />
        <Tab label="Maintenance Requests" />
      </Tabs>

      {tabValue === 0 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Buildings
          </Typography>
          <BuildingTable buildings={buildings} onEdit={handleEditBuilding} onDelete={handleDeleteBuilding} />
          <Fab color="primary" aria-label="add" onClick={handleFormOpen} sx={{ position: 'fixed', bottom: 16, right: 16 }}>
            <AddIcon />
          </Fab>
          <BuildingForm
            onSubmit={handleSubmitBuilding}
            defaultValues={selectedBuilding || undefined}
            open={formOpen}
            onClose={handleFormClose}
          />
        </Box>
      )}

      {tabValue === 1 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Owners
          </Typography>
          <OwnerForm onSubmit={handleSubmitOwner} defaultValues={selectedOwner || undefined} buildings={buildings} />
          <OwnerTable owners={owners} onEdit={handleEditOwner} onDelete={handleDeleteOwner} />
        </Box>
      )}

      {tabValue === 2 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Tenants
          </Typography>
          <TenantForm onSubmit={handleSubmitTenant} defaultValues={selectedTenant || undefined} buildings={buildings} />
          <TenantTable tenants={tenants} onEdit={handleEditTenant} onDelete={handleDeleteTenant} />
        </Box>
      )}

      {tabValue === 3 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Maintenance Requests
          </Typography>
          <MaintenanceTable
            requests={requests}
            onStatusChange={handleStatusChange}
            canEditStatus={true} // Allow admins to update status
          />
        </Box>
      )}
    </Box>
  );
};

export default AdminDashboard;