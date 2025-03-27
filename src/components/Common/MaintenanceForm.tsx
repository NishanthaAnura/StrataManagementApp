import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { 
  TextField, 
  Box, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel,
  Grid
} from '@mui/material';
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
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    setValue,
  } = useForm<MaintenanceRequest>({ 
    defaultValues,
    mode: 'onChange'
  });

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
    <Box 
      component="form" 
      onSubmit={handleSubmit(onSubmit)} 
      id="maintenance-form"
      sx={{ mt: 1 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Title"
            {...register('Title', { 
              required: 'Title is required',
              minLength: {
                value: 5,
                message: 'Title should be at least 5 characters'
              }
            })}
            error={!!errors.Title}
            helperText={errors.Title?.message}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            {...register('Description', { 
              required: 'Description is required',
              minLength: {
                value: 10,
                message: 'Description should be at least 10 characters'
              }
            })}
            error={!!errors.Description}
            helperText={errors.Description?.message}
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              {...register('Status', { required: 'Status is required' })}
              error={!!errors.Status}
              disabled={!isEditMode}
              defaultValue={MaintenanceStatus.Pending}
              label="Status"
              variant="outlined"
            >
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
        </Grid>

        {canEditBuilding ? (
          <>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Building</InputLabel>
                <Select
                  {...register('BuildingId', { required: 'Building is required' })}
                  error={!!errors.BuildingId}
                  label="Building"
                  variant="outlined"
                >
                  {buildings.map((building) => (
                    <MenuItem key={building.Id} value={building.Id}>
                      {building.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Unit Number"
                {...register('UnitNumber')}
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </>
        ) : (
          <>
            {assignedBuildingId && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Building"
                  value={buildings.find(b => b.Id === assignedBuildingId)?.Name || ''}
                  margin="normal"
                  variant="outlined"
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            )}
            {assignedUnit && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Unit Number"
                  value={assignedUnit}
                  margin="normal"
                  variant="outlined"
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            )}
          </>
        )}
      </Grid>
    </Box>
  );
};

export default MaintenanceForm;