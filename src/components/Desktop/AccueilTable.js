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
  TablePagination,
  Typography,
} from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

import {
  DateRangeOutlined,
  DownloadDoneOutlined,
  DownloadOutlined,
  Edit,
} from "@mui/icons-material";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function AccueilTable({ validated = false }) {
  const [page, setPage] = React.useState(0);

  return (
    <>
      <TableContainer component={"div"} elevation={0}>
        <Table sx={{ minWidth: 750 }} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Consultant</TableCell>
              <TableCell align="center">Client</TableCell>
              <TableCell align="center">
                {validated ? "Période" : "Échéance"}
              </TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody component={Paper} elevation={0}>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  <Stack
                    flexDirection={"row"}
                    gap={1}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                  >
                    <IconButton sx={{ bgcolor: (theme) => "#ff352412" }}>
                      <AcUnitIcon fontSize="small" htmlColor="#FF3524" />
                    </IconButton>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        fontSize={14}
                        color={(theme) =>
                          validated
                            ? theme.palette.secondary.main
                            : theme.palette.primary.main
                        }
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
                      color: (theme) =>
                        validated
                          ? theme.palette.text.secondary
                          : theme.palette.primary.main,
                    }}
                    startIcon={<GroupOutlinedIcon fontSize="small" />}
                  >
                    Le Figaro
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    disableElevation
                    disableFocusRipple
                    variant="text"
                    color="primary"
                    disableRipple
                    disableTouchRipple
                    size="small"
                    sx={{
                      textTransform: "capitalize",
                      color: (theme) =>
                        validated
                          ? theme.palette.text.secondary
                          : theme.palette.primary.main,
                    }}
                    startIcon={<DateRangeOutlined fontSize="small" />}
                  >
                    A valider avant le 27 Mai
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={`${row.carbs} CRA Validés`}
                    variant="filled"
                    color={validated ? "default" : "primary"}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Button
                    disableElevation
                    variant="text"
                    color={validated ? "secondary" : "primary"}
                    size="small"
                    sx={{
                      textTransform: "capitalize",
                    }}
                  >
                    Relancer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export const AccueilValidTable = () => {
  return (
    <>
      <TableContainer component={"div"} elevation={0}>
        <Table sx={{ minWidth: 750 }} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Consultant</TableCell>
              <TableCell align="center">Client</TableCell>
              <TableCell align="center">"Période"</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody component={Paper} elevation={0}>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  <Stack
                    flexDirection={"row"}
                    gap={1}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                  >
                    <IconButton
                      sx={{
                        bgcolor: "#47969630",
                      }}
                    >
                      <AcUnitIcon fontSize="small" htmlColor="#479696" />
                    </IconButton>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        fontSize={14}
                        color={(theme) => theme.palette.secondary.main}
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
                    Le Figaro
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    disableElevation
                    disableFocusRipple
                    variant="text"
                    color="primary"
                    disableRipple
                    disableTouchRipple
                    size="small"
                    sx={{
                      textTransform: "capitalize",
                      color: (theme) => theme.palette.text.secondary,
                    }}
                    startIcon={<DateRangeOutlined fontSize="small" />}
                  >
                    Mai - 19 jours
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={`${row.carbs} CRA Validés`}
                    variant="filled"
                    color={"secondary"}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Button
                    disableElevation
                    variant="text"
                    color="secondary"
                    size="small"
                    sx={{
                      textTransform: "capitalize",
                    }}
                    startIcon={<DownloadOutlined fontSize="small" />}
                  >
                    Télécharger (pdf)
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
