import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, MenuItem, Box, Typography } from '@mui/material';
import api from '../api/api';

interface RegisterFormProps {
  onSuccess: () => void;
}

interface RegisterRequest {
  email: string;
  fullName: string;
  password: string;
  role: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterRequest>();

  const onSubmit: SubmitHandler<RegisterRequest> = async (data) => {
    try {
      const response = await api.post('/Auth/register', data);
      console.log('Registration successful:', response.data);
      onSuccess();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <TextField
        fullWidth
        label="Email"
        {...register('email', { required: 'Email is required' })}
        error={!!errors.email}
        helperText={errors.email?.message}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Full Name"
        {...register('fullName', { required: 'Full Name is required' })}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        {...register('password', { required: 'Password is required' })}
        error={!!errors.password}
        helperText={errors.password?.message}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Role"
        select
        {...register('role', { required: 'Role is required' })}
        error={!!errors.role}
        helperText={errors.role?.message}
        margin="normal"
      >
        <MenuItem value="Owner">Owner</MenuItem>
        <MenuItem value="Tenant">Tenant</MenuItem>
      </TextField>
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;