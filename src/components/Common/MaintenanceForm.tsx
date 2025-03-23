import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { MaintenanceRequest, MaintenanceStatus } from '../../types/maintenanceTypes';
import { BuildingResponse } from '../../types/buildingTypes';

interface MaintenanceFormProps {
  onSubmit: SubmitHandler<MaintenanceRequest>;
  defaultValues?: MaintenanceRequest;
  buildings: BuildingResponse[];
  canEditBuilding?: boolean; 
  assignedBuildingId?: string;
  assignedUnit?: string;
}

const MaintenanceForm: React.FC<MaintenanceFormProps> = ({
  onSubmit,
  defaultValues,
  buildings,
  canEditBuilding = true,
  assignedBuildingId,
  assignedUnit,
}) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<MaintenanceRequest>({ defaultValues });

  React.useEffect(() => {
    if (assignedBuildingId) {
      setValue('BuildingId', assignedBuildingId);
    }
    if (assignedUnit) {
      setValue('UnitNumber', assignedUnit);
    }
  }, [assignedBuildingId, assignedUnit, setValue]);

  const isEditMode = !!defaultValues;

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <TextField
        fullWidth
        label="Title"
        {...register('Title', { required: 'Title is required' })}
        error={!!errors.Title}
        helperText={errors.Title?.message}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Description"
        {...register('Description', { required: 'Description is required' })}
        error={!!errors.Description}
        helperText={errors.Description?.message}
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          {...register('Status', { required: 'Status is required' })}
          error={!!errors.Status}
          disabled={!isEditMode} // Disable the dropdown in create mode
          defaultValue={MaintenanceStatus.Pending} // Default to Pending
        >
          {/* Show only Pending in create mode */}
          {!isEditMode ? (
            <MenuItem value={MaintenanceStatus.Pending}>Pending</MenuItem>
          ) : (
            <>
              <MenuItem value={MaintenanceStatus.Pending}>Pending</MenuItem>
              <MenuItem value={MaintenanceStatus.InProgress}>In Progress</MenuItem>
              <MenuItem value={MaintenanceStatus.Completed}>Completed</MenuItem>
            </>
          )}
        </Select>
      </FormControl>
      {canEditBuilding && (
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
      )}
      {!canEditBuilding && assignedBuildingId && (
        <TextField
          fullWidth
          label="Building"
          value={buildings.find(b => b.Id === assignedBuildingId)?.Name || ''}
          margin="normal"
          InputProps={{ readOnly: true }}
        />
      )}
      {!canEditBuilding && assignedUnit && (
        <TextField
          fullWidth
          label="Unit Number"
          value={assignedUnit}
          margin="normal"
          InputProps={{ readOnly: true }}
        />
      )}
      {canEditBuilding && (
        <TextField
          fullWidth
          label="Unit Number"
          {...register('UnitNumber')}
          margin="normal"
        />
      )}

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
        {defaultValues ? 'Update Request' : 'Create Request'}
      </Button>
    </Box>
  );
};

export default MaintenanceForm;