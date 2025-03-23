import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Box, Typography } from '@mui/material';
import OwnerProfileForm from '../components/Owner/OwnerProfileForm';
import api from '../api/api';
import { OwnerRequest, OwnerResponse } from '../types/ownerTypes';
import { BuildingResponse } from '../types/buildingTypes';
import { SubmitHandler } from 'react-hook-form';

const OwnerProfile: React.FC = () => {
  const { userEmail } = useAuth();
  const navigate = useNavigate();
  const [buildings, setBuildings] = useState<BuildingResponse[]>([]);
  const [ownerProfile, setOwnerProfile] = useState<OwnerResponse | null>(null);

  useEffect(() => {
    fetchBuildings();
    fetchOwnerProfile();
  }, [userEmail]);

  const fetchBuildings = async () => {
    try {
      const response = await api.get('/Building');
      setBuildings(response.data);
    } catch (error) {
      console.error('Failed to fetch buildings', error);
    }
  };

  const fetchOwnerProfile = async () => {
    try {
      const response = await api.get(`/Owner/by-email/${userEmail}`);
      setOwnerProfile(response.data);
    } catch (error) {
      console.error('Failed to fetch owner profile', error);
    }
  };

    const handleSubmitProfile: SubmitHandler<OwnerRequest> = async (data) => {
        try {
      if (ownerProfile) {
        await api.put(`/Owner/${ownerProfile.Id}`, data);
      } else {
        await api.post('/Owner', data);
      }
      navigate('/owner'); // Redirect to Owner Dashboard after profile creation/update
    } catch (error) {
      console.error('Failed to save profile', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {ownerProfile ? 'Update Profile' : 'Create Profile'}
      </Typography>
      <OwnerProfileForm
        onSubmit={handleSubmitProfile}
        defaultValues={ownerProfile || undefined}
        buildings={buildings}
      />
    </Box>
  );
};

export default OwnerProfile;