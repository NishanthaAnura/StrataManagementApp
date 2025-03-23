import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { OwnerRequest } from '../../types/ownerTypes';
import { BuildingResponse } from '../../types/buildingTypes';

interface OwnerProfileFormProps {
  onSubmit: SubmitHandler<OwnerRequest>;
  defaultValues?: OwnerRequest;
  buildings: BuildingResponse[];
}

const OwnerProfileForm: React.FC<OwnerProfileFormProps> = ({ onSubmit, defaultValues, buildings }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<OwnerRequest>({ defaultValues });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <TextField
        fullWidth
        label="Name"
        {...register('Name', { required: 'Name is required' })}
        error={!!errors.Name}
        helperText={errors.Name?.message}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Contact"
        {...register('Contact', { required: 'Contact is required' })}
        error={!!errors.Contact}
        helperText={errors.Contact?.message}
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Assigned Building</InputLabel>
        <Select
          {...register('AssignedBuildingId', { required: 'Assigned Building is required' })}
          error={!!errors.AssignedBuildingId}
        >
          {buildings.map((building) => (
            <MenuItem key={building.Id} value={building.Id}>
              {building.Name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
        {defaultValues ? 'Update Profile' : 'Create Profile'}
      </Button>
    </Box>
  );
};

export default OwnerProfileForm;