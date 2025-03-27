import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import {
  MaintenanceRequestResponse,
  MaintenanceStatus,
} from "../../types/maintenanceTypes";

interface MaintenanceTableProps {
  requests: MaintenanceRequestResponse[];
  onEdit?: (request: MaintenanceRequestResponse) => void;
  onDelete?: (id: string) => void;
  onStatusChange: (id: string, status: MaintenanceStatus) => void;
  canEditStatus?: boolean; // Optional prop to control status editability
}

const MaintenanceTable: React.FC<MaintenanceTableProps> = ({
  requests,
  onStatusChange,
  canEditStatus = true, // Default to true
}) => {
  const getStatusColor = (status: MaintenanceStatus) => {
    switch (status) {
      case MaintenanceStatus.Completed:
        return "success";
      case MaintenanceStatus.Pending:
        return "error";
      case MaintenanceStatus.InProgress:
        return "warning";
      default:
        return "default";
    }
  };

  const getMenuItemStyle = (status: MaintenanceStatus) => ({
    color:
      getStatusColor(status) === "success"
        ? "#4caf50"
        : getStatusColor(status) === "error"
          ? "#f44336"
          : getStatusColor(status) === "warning"
            ? "#ff9800"
            : "",
    fontWeight: "bold",
  });

  return (
    <TableContainer component={Paper} sx={{ mt: 3, boxShadow: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Building</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Unit Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request) => (
            <TableRow
              key={request.Id}
              hover
              sx={{ "&:hover": { backgroundColor: "#fafafa" } }}
            >
              <TableCell>{request.Title}</TableCell>
              <TableCell>{request.Description}</TableCell>
              <TableCell>
                {canEditStatus ? (
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={request.Status}
                      onChange={(e) =>
                        onStatusChange(
                          request.Id,
                          e.target.value as MaintenanceStatus
                        )
                      }
                      label="Status"
                      sx={{
                        minWidth: 120,
                        "& .MuiSelect-select": {
                          color:
                            getStatusColor(request.Status) === "success"
                              ? "#4caf50"
                              : getStatusColor(request.Status) === "error"
                                ? "#f44336"
                                : getStatusColor(request.Status) === "warning"
                                  ? "#ff9800"
                                  : "",
                          fontWeight: "bold",
                        },
                      }}
                    >
                      <MenuItem
                        value={MaintenanceStatus.Pending}
                        sx={getMenuItemStyle(MaintenanceStatus.Pending)}
                      >
                        Pending
                      </MenuItem>
                      <MenuItem
                        value={MaintenanceStatus.InProgress}
                        sx={getMenuItemStyle(MaintenanceStatus.InProgress)}
                      >
                        In Progress
                      </MenuItem>
                      <MenuItem
                        value={MaintenanceStatus.Completed}
                        sx={getMenuItemStyle(MaintenanceStatus.Completed)}
                      >
                        Completed
                      </MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <Chip
                    label={request.Status}
                    color={getStatusColor(request.Status)}
                    variant="outlined"
                    sx={{ fontWeight: "bold" }}
                  />
                )}
              </TableCell>
              <TableCell>{request.BuildingName}</TableCell>
              <TableCell>{request.UnitNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MaintenanceTable;
