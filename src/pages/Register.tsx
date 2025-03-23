import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import { Box, Container, Typography, Link } from '@mui/material';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/login'); // Redirect to login after successful registration
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <RegisterForm onSuccess={handleSuccess} />
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account? <Link href="/login">Login here</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;