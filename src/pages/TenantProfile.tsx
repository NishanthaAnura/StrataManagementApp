import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Box, Typography } from '@mui/material';
import TenantProfileForm from '../components/Tenant/TenantProfileForm';
import api from '../api/api';
import { TenantRequest, TenantResponse } from '../types/tenantTypes';
import { BuildingResponse } from '../types/buildingTypes';
import { SubmitHandler } from 'react-hook-form';

const TenantProfile: React.FC = () => {
  const { userEmail } = useAuth();
  const navigate = useNavigate();
  const [buildings, setBuildings] = useState<BuildingResponse[]>([]);
  const [tenantProfile, setTenantProfile] = useState<TenantResponse | null>(null);

  useEffect(() => {
    fetchBuildings();
    fetchTenantProfile();
  }, [userEmail]);

  const fetchBuildings = async () => {
    try {
      const response = await api.get('/Building');
      setBuildings(response.data);
    } catch (error) {
      console.error('Failed to fetch buildings', error);
    }
  };

  const fetchTenantProfile = async () => {
    try {
      const response = await api.get(`/Tenant/by-email/${userEmail}`);
      setTenantProfile(response.data);
    } catch (error) {
      console.error('Failed to fetch tenant profile', error);
    }
  };

  const handleSubmitProfile: SubmitHandler<TenantRequest> = async (data) => {
    try {
      if (tenantProfile) {
        await api.put(`/Tenant/${tenantProfile.Id}`, data);
      } else {
        await api.post('/Tenant', data);
      }
      navigate('/tenant'); // Redirect to Tenant Dashboard after profile creation/update
    } catch (error) {
      console.error('Failed to save profile', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {tenantProfile ? 'Update Profile' : 'Create Profile'}
      </Typography>
      <TenantProfileForm
        onSubmit={handleSubmitProfile}
        defaultValues={tenantProfile || undefined}
        buildings={buildings}
      />
    </Box>
  );
};

export default TenantProfile;