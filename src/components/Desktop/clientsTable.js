import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

import { Edit } from "@mui/icons-material";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicClientTable() {
  return (
    <Table sx={{ minWidth: 750 }} aria-label="simple table" size="small">
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.name}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              <Stack
                flexDirection={"row"}
                gap={1}
                alignItems={"center"}
                justifyContent={"flex-start"}
              >
                <IconButton>
                  <AcUnitIcon fontSize="small" />
                </IconButton>
                <Box>
                  <Typography
                    variant="subtitle2"
                    fontSize={14}
                    color={(theme) => theme.palette.secondary.main}
                  >
                    {row.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    fontSize={11}
                    color={(theme) => theme.palette.text.secondary}
                  >
                    {row.name}
                  </Typography>
                </Box>
              </Stack>
            </TableCell>
            <TableCell align="center">
              <Button
                disableElevation
                disableFocusRipple
                disableRipple
                disableTouchRipple
                size="small"
                sx={{
                  textTransform: "capitalize",
                  color: (theme) => theme.palette.text.secondary,
                }}
                startIcon={<GroupOutlinedIcon fontSize="small" />}
              >
                {row.calories} consultants
              </Button>
            </TableCell>
            <TableCell align="center">
              <Button
                disableElevation
                disableFocusRipple
                variant="text"
                color="secondary"
                disableRipple
                disableTouchRipple
                size="small"
                sx={{
                  textTransform: "capitalize",
                  color: (theme) => theme.palette.text.secondary,
                }}
                startIcon={<AssignmentOutlinedIcon fontSize="small" />}
              >
                {row.fat} missions
              </Button>
            </TableCell>
            <TableCell align="center">
              <Chip
                label={`${row.carbs} CRA Validés`}
                variant="filled"
                color="default"
                size="small"
              />
            </TableCell>
            <TableCell align="center">
              <Button
                disableElevation
                variant="text"
                color="secondary"
                size="small"
                sx={{ textTransform: "capitalize" }}
                startIcon={<Edit fontSize="small" />}
              >
                Editer
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
