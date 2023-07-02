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
import testImage from "../../../public/test.svg";
import testImage2 from "../../../public/test2.svg";
import {
  CheckCircleOutline,
  Edit,
  Event,
  History,
  Task,
} from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";

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

export default function BasicClientTable({ data = [], entity = "clients" }) {
  return (
    <>
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 750 }} aria-label="simple table" size="small">
          <TableBody>
            {data?.map((row) => (
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
                    <IconButton>
                      <Image src={testImage} fill alt="client icon" />
                    </IconButton>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        fontSize={14}
                        color={(theme) => theme.palette.secondary.main}
                      >
                        {row?.name}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        fontSize={11}
                        color={(theme) => theme.palette.text.secondary}
                      >
                        {row?.siren}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                {/* <TableCell align="center">
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
                    {row?.consultants?.length} consultants
                  </Button>
                </TableCell> */}
                <TableCell align="left">
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
                    {row?.missions?.length} missions
                  </Button>
                </TableCell>
                {/* <TableCell align="center">
                  <Chip
                    label={`${row.carbs} CRA Validés`}
                    variant="filled"
                    color="default"
                    size="small"
                  />
                </TableCell> */}
                <TableCell align="center">
                  <Button
                    disableElevation
                    variant="text"
                    color="secondary"
                    component={Link}
                    href={`/a/${entity}/${row?.id}/edit`}
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
      </TableContainer>
    </>
  );
}

export function BasicMissionsTable({ data = [], entity = "missions" }) {
  return (
    <>
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 750 }} aria-label="simple table">
          <TableBody>
            {data?.map((row) => (
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
                    <Image
                      src={testImage}
                      // fill
                      alt="mission icon"
                      width={25}
                      height={25}
                    />

                    <Typography
                      variant="subtitle2"
                      fontSize={14}
                      color={(theme) => theme.palette.secondary.main}
                    >
                      {row?.name}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell align="left">
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
                    {row?.consultants?.length} consultants
                  </Button>
                </TableCell>

                <TableCell align="center">
                  <Button
                    disableElevation
                    variant="text"
                    color="secondary"
                    component={Link}
                    href={`/a/${entity}/${row?.id}/edit`}
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
      </TableContainer>
    </>
  );
}

export function BasicConsultantMissionsTable({
  data = [],
  entity = "missions",
}) {
  return (
    <>
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 750 }} aria-label="simple table">
          <TableBody>
            {data?.map((row) => (
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
                    {/* <IconButton size="large"> */}
                    <Image
                      src={testImage2}
                      // fill
                      alt="mission icon"
                      width={30}
                      height={30}
                    />
                    {/* </IconButton> */}

                    <Typography
                      variant="subtitle2"
                      fontSize={14}
                      color={(theme) => theme.palette.secondary.main}
                    >
                      {row?.name}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell align="left">
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
                    {row?.consultants?.length} consultants
                  </Button>
                </TableCell>

                <TableCell align="center">
                  <Button
                    disableElevation
                    variant="text"
                    color="secondary"
                    component={Link}
                    href={`/a/${entity}/${row?.id}/edit`}
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
      </TableContainer>
    </>
  );
}

export function BasicConsultantsTable({ data = [], entity = "consultants" }) {
  return (
    <>
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 750 }} aria-label="simple table" size="small">
          <TableBody>
            {data?.map((row, index) => (
              <TableRow
                key={index}
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
                    <IconButton>
                      <Image src={testImage} fill alt="mission icon" />
                    </IconButton>

                    <Typography
                      variant="subtitle2"
                      fontSize={14}
                      color={(theme) => theme.palette.secondary.main}
                    >
                      {row?.firstName} {row?.lastName}
                    </Typography>
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
                    startIcon={<Task fontSize="small" />}
                  >
                    {row?.missions?.length} missions
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={`${row?.cras?.length} CRA Validés`}
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
                    component={Link}
                    href={`/a/${entity}/${row?.id}/edit`}
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
      </TableContainer>
    </>
  );
}

function createCraData(name, calories, fat, carbs, protein) {
  return {
    name,
    invoiceDate: calories,
    workedDays: fat,
    validatedDate: carbs,
    validated: protein,
  };
}

const craRows = [
  createCraData(
    "Frozen yoghurt",
    "Premier jour du mois suivant",
    "Mai - 19 jours",
    "En cours",
    false
  ),
  createCraData(
    "Ice cream sandwich",
    "dernier jour du mois",
    "Janvier - 8 jours",
    "Validé le 11 Mai",
    true
  ),
  createCraData(
    "Eclair",
    "le 25 du mois",
    "Août - 19 jours",
    "Validé le 11 Mai",
    true
  ),
  createCraData(
    "Cupcake",
    "le dernier lundi",
    "Août - 19 jours",
    "Validé le 11 Mai",
    true
  ),
  createCraData(
    "Gingerbread",
    "dernier jour du mois",
    "Août - 19 jours",
    "Validé le 11 Mai",
    true
  ),
];

export function BasicConsultantsCraTable({ data = [] }) {
  return (
    <>
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 750 }} aria-label="simple table" size="small">
          <TableHead
            sx={{
              bgcolor: (theme) => theme.palette.background.default,
            }}
          >
            <TableRow>
              <TableCell>Client Name</TableCell>
              <TableCell align="left">Invoice Sending Date</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {craRows?.map((row, index) => (
              <TableRow
                key={index}
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
                    <IconButton>
                      <Image src={testImage} fill alt="mission icon" />
                    </IconButton>

                    <Typography
                      variant="subtitle2"
                      fontSize={14}
                      color={(theme) => theme.palette.secondary.main}
                    >
                      {row?.name}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell align="left">
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
                    startIcon={<Event fontSize="small" />}
                  >
                    {row?.invoiceDate}
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Stack alignItems={"center"} flexDirection={"row"} gap={1}>
                    <History fontSize="small" />
                    <Typography variant="caption">{row?.workedDays}</Typography>
                  </Stack>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    icon={<CheckCircleOutline fontSize="small" />}
                    label={`${row?.validatedDate}`}
                    variant="filled"
                    color={row?.validated ? "secondary" : "error"}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
