import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { BuildingResponse } from '../../types/buildingTypes';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface BuildingTableProps {
  buildings: BuildingResponse[];
  onEdit: (building: BuildingResponse) => void;
  onDelete: (id: string) => void;
}

const BuildingTable: React.FC<BuildingTableProps> = ({ buildings, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Number of Units</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {buildings.map((building) => (
            <TableRow key={building.Id} hover>
              <TableCell>{building.Name}</TableCell>
              <TableCell>{building.Address}</TableCell>
              <TableCell>{building.NumberOfUnits}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(building)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(building.Id)} color="error">
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

export default BuildingTable;