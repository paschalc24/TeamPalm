import * as React from "react";
import { useState } from 'react';
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from "axios";
import PersonList from './PersonList'
import TextField from '@mui/material/TextField';


const theme = createTheme({
  typography: {
    fontFamily: ["Roboto Flex", "sans-serif"].join(","),
    fontWeightBold: 700,
  },
});

interface Data {
  slug: string;
  postsNum: number;
  commentsNum: number;
  endorsedCommentsNum: number;
  answeredPostsNum: number;
  name: string;
  title: string;
}

interface Props {
  rows: Data[];
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "postsNum",
    numeric: true,
    disablePadding: false,
    label: "Number of Posts",
  },
  {
    id: "commentsNum",
    numeric: true,
    disablePadding: false,
    label: "Number of Comments",
  },
  {
    id: "endorsedCommentsNum",
    numeric: true,
    disablePadding: false,
    label: "Number of Endorsed Comments",
  },
  {
    id: "answeredPostsNum",
    numeric: true,
    disablePadding: false,
    label: "Number of Posts Answered",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "desc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable({ rows }: Props) {
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<keyof Data>("postsNum");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Data | null>(null);
  const [numComments, setNumComments] = useState<Number>(10);
  const [searchTerm, setSearchTerm] = useState("");


  
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = (row: Data) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (event: React.MouseEvent<unknown>, row: Data) => {
    handleOpen(row);
  };  

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0); // resets page number after every search
  };
  

  return (
    <ThemeProvider theme={theme}>
    <Box
      sx={{
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TextField
          id="search"
          label="Search by Name"
          value={searchTerm}
          onChange={handleSearchChange}
          margin="normal"
          variant="outlined"
          style={{ marginBottom: "20px", width: "100%" }}
        />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead
                numSelected={0}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .filter((row) =>
                  row.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row)}
                        role="checkbox"
                        tabIndex={-1}
                        key={row.name}
                        sx={{
                          cursor: "pointer",
                          "&:nth-child(even)": { backgroundColor: "#fbf6fd" },
                        }}
                      >
                        <TableCell component="th" id={row.name} scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.postsNum}</TableCell>
                        <TableCell align="right">{row.commentsNum}</TableCell>
                        <TableCell align="right">{row.endorsedCommentsNum}</TableCell>
                        <TableCell align="right">{row.answeredPostsNum}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Card>
                <div
                  className="row"
                  style={{ paddingTop: "20px", height: "auto", overflowY: "auto", paddingBottom: "10px" }}
                >
                  <div className="col" style={{}}>
                    <CardContent>
                      <Typography variant="h4" component="div" style={{fontSize: "30px", paddingBottom: "40px", paddingLeft: "20px"}}>
                        {selectedRow?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" style={{fontSize: "18px", paddingBottom: "10px", paddingLeft: '30px'}}>
                        Number of Posts: 
                        <span style={{color: "#9925BE"}}>{" " + selectedRow?.postsNum}</span>
                      </Typography>
                      <Typography variant="body2" color="text.secondary" style={{fontSize: "18px", paddingBottom: "10px", paddingLeft: '30px'}}>
                        Number of Comments:
                        <span style={{color: "#9925BE"}}>{" " + selectedRow?.commentsNum}</span>
                      </Typography>
                      <Typography variant="body2" color="text.secondary" style={{fontSize: "18px", paddingBottom: "10px", paddingLeft: '30px'}}>
                        Endorsed Comments:
                        <span style={{color: "#9925BE"}}>{" " + selectedRow?.endorsedCommentsNum}</span>
                      </Typography>
                      <Typography variant="body2" color="text.secondary" style={{fontSize: "18px", paddingBottom: "10px", paddingLeft: '30px'}}>
                        Posts Answered:
                        <span style={{color: "#9925BE"}}>{" " + selectedRow?.answeredPostsNum}</span>
                      </Typography>
                    </CardContent>
                  </div>
                  <div className="col-8 d-flex justify-content-end"
                            style={{ paddingTop: "20px", height: "100%", overflowY: "auto" }}>
                    
                      <PersonList authorSlug = {selectedRow?.slug} firstName = {selectedRow?.name.split(" ")[0]}/>
                    
                  </div>
                </div>
                
              </Card>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </ThemeProvider>
  );
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '55vw',
  height: 'min-height', // or any value you want
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: "10px",
  overflowY: 'auto', // or 'scroll'
};

  
  