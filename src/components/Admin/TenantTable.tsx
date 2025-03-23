import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { TenantResponse } from '../../types/tenantTypes';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface TenantTableProps {
  tenants: TenantResponse[];
  onEdit: (tenant: TenantResponse) => void;
  onDelete: (id: string) => void;
}

const TenantTable: React.FC<TenantTableProps> = ({ tenants, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Building</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tenants.map((tenant) => (
            <TableRow key={tenant.Id} hover>
              <TableCell>{tenant.Name}</TableCell>
              <TableCell>{tenant.Contact}</TableCell>
              <TableCell>{tenant.Building.Name}</TableCell>
              <TableCell>{tenant.AssignedUnit}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(tenant)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(tenant.Id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TenantTable;