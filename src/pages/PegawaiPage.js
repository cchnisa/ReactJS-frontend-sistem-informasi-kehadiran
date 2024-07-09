import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  ButtonGroup,
  Modal,
  FormControl,
  Box,
  TextField,
} from '@mui/material';
// components
import { orange } from '@mui/material/colors/orange';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/pegawai';
// mock
import USERLIST from '../_mock/pegawai';


// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 5,
};

const TABLE_HEAD = [
  { id: 'nomor', label: 'No', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'bidang', label: 'Bidang', alignRight: false },
  { id: 'nip', label: 'NIP', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'aksi', label: 'Aksi', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (pegawai) => pegawai.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function PegawaiPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpen = () => setOpen(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bidang, setBidang] = useState('');
  const [nip, setNip] = useState('');
  const [status, setStatus] = useState('');
  const [editId, setEditId] = useState('');

  const handleOpenAdd = () => {
    // console.log(data);
    setName('');
    setEmail('');
    setBidang('');
    setNip('');
    setEditId('');

    // open modal
    handleOpen();
  };

  const handleOpenEdit = (data) => {
    console.log(data);
    setName(data.name);
    setEmail(data.email);
    setBidang(data.bidang);
    setNip(data.nip);
    setEditId(data.editId);

    // open modal
    handleOpen();
  };

  const handleSubmit = () => {
    const blog = { name };
    console.log(blog);
  };

  function updateUser() {
    const item = { name, bidang, status, email, nip };
    console.log(item);
  }

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = USERLIST.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
  //   }
  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Data Pegawai </title>
      </Helmet>

      {/* <Modal open={open} onClose={handleClose}>
        <Box sx={style} component="form" noValidate autoComplete="on">
          <FormControl>
            <TextField id="name" value={row.name} label="Nama" onChange={(e) => setName(e.target.value)} />
            <TextField id="email" value={row.email} label="Email" onChange={(e) => setEmail(e.target.value)} />
            <TextField id="bidang" value={row.bidang} label="Bidang" onChange={(e) => setBidang(e.target.value)} />
            <TextField id="nip" value={row.nip} label="NIP" onChange={(e) => setNip(e.target.value)} />
            <Button>Update Data</Button>
          </FormControl>
        </Box>
      </Modal> */}

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Data Pegawai
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpenAdd}
            style={{ marginBottom: 50, backgroundColor: 'orange'}}
          >
            Pegawai Baru
          </Button>
          <Modal open={open} onClose={handleCloseMenu}>
            <Box sx={style} component="form" noValidate autoComplete="on">
              <FormControl sx={{ minWidth: '80%' }}>
                <TextField id="name" value={name} label="Nama" onChange={(e) => setName(e.target.value)} />
                <TextField id="email" value={email} label="Email" onChange={(e) => setEmail(e.target.value)} />
                <TextField id="bidang" value={bidang} label="Bidang" onChange={(e) => setBidang(e.target.value)} />
                <TextField id="nip" value={nip} label="Nip" onChange={(e) => setNip(e.target.value)} />
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                  <Button onClick={() => handleSubmit()} variant="contained">
                    {' '}
                    Simpan{' '}
                  </Button>
                  <Button onClick={() => handleCloseMenu()}> Batal </Button>
                </ButtonGroup>
              </FormControl>
            </Box>
          </Modal>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                    const { id, name, bidang, status, email, nip } = row;

                    return (
                      <TableRow hover key={id}>
                        <TableCell align="left">{i + 1}</TableCell>

                        <TableCell align="left">{name}</TableCell>

                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{bidang}</TableCell>

                        <TableCell align="left">{nip}</TableCell>

                        <TableCell align="left">
                          <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell>

                        <TableCell align="left">
                          <ButtonGroup color="primary" aria-label="outlined primary button group">
                            <Button onClick={() => handleOpenEdit(row)}>Edit</Button>
                            <Button> Hapus </Button>
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      {/* 
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover> */}
    </>
  );
}
