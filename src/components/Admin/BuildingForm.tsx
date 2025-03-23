import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { BuildingRequest } from '../../types/buildingTypes';

interface BuildingFormProps {
  onSubmit: SubmitHandler<BuildingRequest>;
  defaultValues?: BuildingRequest;
  open: boolean;
  onClose: () => void;
}

const BuildingForm: React.FC<BuildingFormProps> = ({ onSubmit, defaultValues, open, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<BuildingRequest>({ defaultValues });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{defaultValues ? 'Edit Building' : 'Create New Building'}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
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
            label="Address"
            {...register('Address', { required: 'Address is required' })}
            error={!!errors.Address}
            helperText={errors.Address?.message}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Number of Units"
            type="number"
            {...register('NumberOfUnits', { required: 'Number of Units is required' })}
            error={!!errors.NumberOfUnits}
            helperText={errors.NumberOfUnits?.message}
            margin="normal"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)} color="primary">
          {defaultValues ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BuildingForm;