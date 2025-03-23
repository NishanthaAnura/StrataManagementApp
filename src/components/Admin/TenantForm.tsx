import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { TenantRequest } from '../../types/tenantTypes';
import { BuildingResponse } from '../../types/buildingTypes';

interface TenantFormProps {
  onSubmit: SubmitHandler<TenantRequest>;
  defaultValues?: TenantRequest;
  buildings: BuildingResponse[];
}

const TenantForm: React.FC<TenantFormProps> = ({ onSubmit, defaultValues, buildings }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<TenantRequest>({ defaultValues });

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
        <InputLabel>Building</InputLabel>
        <Select
          {...register('BuildingId', { required: 'Building is required' })}
          error={!!errors.BuildingId}
        >
          {buildings.map((building) => (
            <MenuItem key={building.Id} value={building.Id}>
              {building.Name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Assigned Unit"
        {...register('AssignedUnit', { required: 'Assigned Unit is required' })}
        error={!!errors.AssignedUnit}
        helperText={errors.AssignedUnit?.message}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
        {defaultValues ? 'Update Tenant' : 'Create Tenant'}
      </Button>
    </Box>
  );
};

export default TenantForm;