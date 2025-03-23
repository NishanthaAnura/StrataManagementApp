import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { OwnerResponse } from '../../types/ownerTypes';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface OwnerTableProps {
  owners: OwnerResponse[];
  onEdit: (owner: OwnerResponse) => void;
  onDelete: (id: string) => void;
}

const OwnerTable: React.FC<OwnerTableProps> = ({ owners, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Assigned Building</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {owners.map((owner) => (
            <TableRow key={owner.Id} hover>
              <TableCell>{owner.Name}</TableCell>
              <TableCell>{owner.Contact}</TableCell>
              <TableCell>{owner.AssignedBuilding.Name}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(owner)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(owner.Id)} color="error">
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

export default OwnerTable;