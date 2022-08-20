import React from 'react'
import MyAppBar from '../components/AppBar'
import axios from 'axios';
import config from '../config';
import { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add'
import { Tooltip, Fab, TableFooter, TablePagination } from '@mui/material';
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { TextField, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Categories from './Categories';




// Mui table styling
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#C0392B",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));





const Cars = () => {


    const [carsData, setcarsData] = React.useState();
    const [carData, setcarData] = React.useState('')
    const [createcarDialog, setCreatecarDialog] = React.useState(false)
    const [updatecarDialog, setUpdatecarDialog] = React.useState(false)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortFlag, setSortFlag] = React.useState(false);
    const [showSortFlag, setShowSortFlag] = React.useState(false);



    // Form Sates
    const [carName, setCarName] = React.useState('')
    const [carNameError, setCarNameError] = React.useState(false)
    const [carCategory, setCarCategory] = React.useState('')
    const [carCategoryError, setCarCategoryError] = React.useState(false)
    const [carModel, setCarModel] = React.useState('')
    const [carModelError, setCarModelError] = React.useState(false)
    const [carMake, setCarMake] = React.useState('')
    const [carMakeError, setCarMakeError] = React.useState(false)
    const [carReg, setCarReg] = React.useState('')
    const [carRegError, setCarRegError] = React.useState(false)
    const [carHP, setCarHP] = React.useState('')
    const [carHPError, setCarHPError] = React.useState(false)
    const [carSeats, setCarSeats] = React.useState('')
    const [carSeatsError, setCarSeatsError] = React.useState(false)
    const [carTransmission, setCarTransmission] = React.useState('')
    const [carTransmissionError, setCarTransmissionError] = React.useState(false)
    const [carCategoriesData, setCarCategoriesData] = React.useState()






    // Generic function to handle form states
    const handleChange = (e, func, errorFunc) => {
        func(e.target.value)
        errorFunc(false)
    }


    // function to get all categories for api
    const getCategories = async () => {

        await axios.get(config.base_url + "/api/v1/category")
            .then(res => {
                setCarCategoriesData(res.data.data)
            }).catch(err => {
                console.log("Error occued possible cause", err.message);
            });
    }

    // function to get all cars
    const getcars = async () => {

        await axios.get(config.base_url + "/api/v1/car")
            .then(res => {
                setcarsData(res.data.data)
            }).catch(err => {
                console.log("Error occued possible cause", err.message);
            });
    }




    // Update car
    const editcar = (item) => {


        //Car Data to be used at update time
        setcarData(item)

        // sates update to be shown on Edit Dialogue
        setCarName(item.name)
        setCarCategory(item.category[0] ? item.category[0]._id : "")
        setCarModel(item.model)
        setCarMake(item.make)
        setCarReg(item.registrationNo)
        setCarHP(item.horsePower)
        setCarSeats(item.seatingCapacity)
        setCarTransmission(item.transmissionType)
        setUpdatecarDialog(true)

    }


    // handle the from dialoge close
    const handleCreateClose = () => {
        setCreatecarDialog(false)
        setUpdatecarDialog(false)
        setCarNameError(false)
        setCarName('')
        setCarModel('')
        setCarModelError('')
        setCarMake('')
        setCarMakeError('')
        setCarReg('')
        setCarRegError('')
        setCarHP('')
        setCarHPError('')
        setCarSeats('')
        setCarSeatsError('')
        setCarCategory('')
        setCarCategoryError('')
        setCarTransmission('')
        setCarTransmissionError('')
    }

    // handle the create car button click
    const handleCreateClickOpen = () => {

        // car form Validation Check
        if (carName === '' || carCategory === '' || carModel === '' || carMake === '' || carReg === '' || carHP === '' || carSeats === '' || carTransmission === '') {

            if (carName === '') {
                setCarNameError(true);
            }
            if (carCategory === '') {
                setCarCategoryError(true);
            }
            if (carModel === '') {
                setCarModelError(true);
            }
            if (carMake === '') {
                setCarMakeError(true);
            }
            if (carReg === '') {
                setCarRegError(true);
            }
            if (carHP === '') {
                setCarHPError(true);
            }
            if (carSeats === '') {
                setCarSeatsError(true);
            }
            if (carTransmission === '') {
                setCarTransmissionError(true);
            }
        }
        // Send the req to server if passes Validation
        else {
            createHandler()
        }
    }

    // handle edit car button click
    const handleEditClickOpen = () => {

        // car form Validation Check
        if (carName === '' || carCategory === '' || carModel === '' || carMake === '' || carReg === '' || carHP === '' || carSeats === '' || carTransmission === '') {

            if (carName === '') {
                setCarNameError(true);
            }
            if (carCategory === '') {
                setCarCategoryError(true);
            }
            if (carModel === '') {
                setCarModelError(true);
            }
            if (carMake === '') {
                setCarMakeError(true);
            }
            if (carReg === '') {
                setCarRegError(true);
            }
            if (carHP === '') {
                setCarHPError(true);
            }
            if (carSeats === '') {
                setCarSeatsError(true);
            }
            if (carTransmission === '') {
                setCarTransmissionError(true);
            }
        }
        // Send the req to server
        else {
            editHandler()
        }
    }


    // Delete car api function
    const deletecar = (id) => {

        axios
            .delete(`${config.base_url}/api/v1/car/${id}`)
            .then((res) => {
                getcars()
            })
            .catch((error) => {
                console.log(error, 'error')
            })

    }

    // Create a new car api call
    const createHandler = () => {


        const data = {};
        data.name = carName
        data.model = carModel
        data.category = carCategory
        data.make = carMake
        data.registrationNo = carReg
        data.horsePower = carHP
        data.seatingCapacity = carSeats
        data.transmissionType = carTransmission
        data.createdBy = "rafay"
        axios
            .post(`${config.base_url}/api/v1/car`, data)
            .then((res) => {
                if (res) {
                    handleCreateClose()
                    getcars();
                    setCarName('')
                    setCarModel('')
                    setCarMake('')
                    setCarReg('')
                    setCarHP('')
                    setCarSeats('')
                    setCarCategory('')
                    setCarTransmission('')



                }
            })
            .catch((error) => {
                if (error.response.data.errorCode == 11000) {
                    alert("car name already exist")
                }
            })
    }

    // update car api call
    const editHandler = () => {


        const data = {};
        data.name = carName
        data.model = carModel
        data.category = carCategory
        data.make = carMake
        data.registrationNo = carReg
        data.horsePower = carHP
        data.seatingCapacity = carSeats
        data.transmissionType = carTransmission
        data.createdBy = "rafay"
        axios
            .put(`${config.base_url}/api/v1/car/${carData._id}`, data)
            .then((res) => {
                if (res) {
                    handleCreateClose()
                    getcars();
                    handleCreateClose()
                    getcars();
                    setCarName('')
                    setCarModel('')
                    setCarMake('')
                    setCarReg('')
                    setCarHP('')
                    setCarSeats('')
                    setCarCategory('')
                    setCarTransmission('')



                }
            })
            .catch((error) => {
                if (error.response.data.errorCode == 11000) {
                    alert("car name already exist")
                }
            })
    }



    // Table Pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // handle the row change of paginatiob
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    // Data Sorting for table
    const sortData = () => {

        setShowSortFlag(true);
        if (sortFlag) {
            // Ascending Sort 
            const ascSort = carsData.sort(function (a, b) {
                let x = a.name.toLowerCase();
                let y = b.name.toLowerCase();
                if (x < y) { return -1; }
                if (x > y) { return 1; }
                return 0;
            });
            setcarsData(ascSort);
            console.log("asc sort", ascSort);

        }
        else {
            // Decending sort
            const decSort = carsData.sort(function (a, b) {
                let x = a.name.toLowerCase();
                let y = b.name.toLowerCase();
                if (x > y) { return -1; }
                if (x < y) { return 1; }
                return 0;
            });
            setcarsData(decSort);
            console.log("dec sort", decSort);
        }





        setSortFlag(!sortFlag)

    }


    // useEffect to initially load car and categories data
    useEffect(() => {
        getcars();
        getCategories();
    }, [])





    return (
        <>

            <Tooltip title="Add car">
                <Fab
                    color="default"
                    aria-label="Add"
                    size="medium"
                    style={{
                        zIndex: 999,
                        right: '4vw',
                        bottom: '8vh',
                        position: 'fixed',
                    }}
                    onClick={() => setCreatecarDialog(true)}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
            <MyAppBar />

            <div style={{ margin: '50px 50px' }}>
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell   >
                                    car Name
                                    <Button onClick={sortData} style={{ color: "white" }} endIcon={showSortFlag ? sortFlag ? <ArrowDownward /> : <ArrowUpward /> : <Tooltip title="Enable Sorting"><SortByAlphaIcon /></Tooltip>} />

                                </StyledTableCell>
                                <StyledTableCell align="right">Category</StyledTableCell>
                                <StyledTableCell align="right">Model</StyledTableCell>
                                <StyledTableCell align="right">Make</StyledTableCell>
                                <StyledTableCell align="right">Registration No</StyledTableCell>
                                <StyledTableCell align="right">Horse Power</StyledTableCell>
                                <StyledTableCell align="right">Seats</StyledTableCell>
                                <StyledTableCell align="right">TransmissionType</StyledTableCell>
                                <StyledTableCell align="right">Edit</StyledTableCell>
                                <StyledTableCell align="right">Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {carsData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.category[0] ? row.category[0].name : "N/A"}</StyledTableCell>
                                    <StyledTableCell align="right">{row.model}</StyledTableCell>
                                    <StyledTableCell align="right">{row.make}</StyledTableCell>
                                    <StyledTableCell align="right">{row.registrationNo}</StyledTableCell>
                                    <StyledTableCell align="right">{row.horsePower}</StyledTableCell>
                                    <StyledTableCell align="right">{row.seatingCapacity}</StyledTableCell>
                                    <StyledTableCell align="right">{row.transmissionType}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button onClick={() => deletecar(row._id)}>
                                            <DeleteIcon color="error" />
                                        </Button>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button onClick={() => editcar(row)}>
                                            <EditIcon />
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TableFooter>
                        <TablePagination
                            component="div"
                            rowsPerPageOptions={[5, 10, 25]}
                            count={carsData ? carsData?.length : 0}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}>

                        </TablePagination>
                    </TableFooter>
                </TableContainer>

            </div>
            <Dialog
                open={createcarDialog}
                onClose={handleCreateClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'ADD CAR'}
                </DialogTitle>
                <DialogContent >
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item xs="6">
                            <TextField
                                error={carNameError}
                                id="carName"
                                label="car Name"
                                placeholder="Car Name"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    carNameError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={carName}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setCarName,
                                        setCarNameError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs="6">
                            <FormControl error={carCategoryError} fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                                <Select
                                    value={carCategory}
                                    size="small"
                                    label="Category"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setCarCategory,
                                            setCarCategoryError
                                        )}
                                >
                                    {
                                        carCategoriesData?.map((Category) =>
                                            <MenuItem value={Category._id}>{Category.name}</MenuItem>

                                        )
                                    }

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs="6">
                            <TextField
                                error={carModelError}
                                type="number"
                                label="Car Model"
                                placeholder="Car Model"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    carModelError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={carModel}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setCarModel,
                                        setCarModelError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs="6">
                            <TextField
                                error={carMakeError}
                                label="Car Make"
                                placeholder="Car Make"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    carMakeError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={carMake}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setCarMake,
                                        setCarMakeError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs="6">
                            <TextField
                                error={carRegError}
                                label="Registration No"
                                placeholder="Registration No"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    carRegError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={carReg}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setCarReg,
                                        setCarRegError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs="6">
                            <TextField
                                error={carHPError}
                                label="Horse Power"
                                type="number"
                                placeholder="Horse Power"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    carHPError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={carHP}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setCarHP,
                                        setCarHPError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs="6">
                            <TextField
                                error={carSeatsError}
                                type="number"
                                label="Car Seats"
                                placeholder="Car Seats"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    carSeatsError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={carSeats}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setCarSeats,
                                        setCarSeatsError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs="6">
                            <FormControl error={carTransmissionError} fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Transmission</InputLabel>
                                <Select
                                    value={carTransmission}
                                    size="small"
                                    label="Transmission"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setCarTransmission,
                                            setCarTransmissionError
                                        )}
                                >

                                    <MenuItem value={"manual"}>Manual</MenuItem>
                                    <MenuItem value={"automatic"}>Automatic</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>



                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateClose}>Cancel</Button>
                    <Button onClick={handleCreateClickOpen}>
                        Confirm
                    </Button>
                </DialogActions>

            </Dialog>
            <Dialog
                open={updatecarDialog}
                onClose={handleCreateClose}
            >
                <DialogTitle>
                    {'EDIT CAR'}
                </DialogTitle>
                <DialogContent >
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item xs="6">
                            <TextField
                                error={carNameError}
                                id="carName"
                                label="car Name"
                                placeholder="Car Name"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    carNameError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={carName}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setCarName,
                                        setCarNameError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs="6">
                            <FormControl error={carCategoryError} fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                                <Select
                                    value={carCategory}
                                    size="small"
                                    label="Category"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setCarCategory,
                                            setCarCategoryError
                                        )}
                                >
                                    {
                                        carCategoriesData?.map((Category) =>
                                            <MenuItem value={Category._id}>{Category.name}</MenuItem>

                                        )
                                    }

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs="6">
                            <TextField
                                error={carModelError}
                                type="number"
                                label="Car Model"
                                placeholder="Car Model"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    carModelError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={carModel}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setCarModel,
                                        setCarModelError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs="6">
                            <TextField
                                error={carMakeError}
                                label="Car Make"
                                placeholder="Car Make"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    carMakeError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={carMake}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setCarMake,
                                        setCarMakeError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs="6">
                            <TextField
                                error={carRegError}
                                label="Registration No"
                                placeholder="Registration No"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    carRegError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={carReg}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setCarReg,
                                        setCarRegError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs="6">
                            <TextField
                                error={carHPError}
                                label="Horse Power"
                                type="number"
                                placeholder="Horse Power"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    carHPError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={carHP}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setCarHP,
                                        setCarHPError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs="6">
                            <TextField
                                error={carSeatsError}
                                type="number"
                                label="Car Seats"
                                placeholder="Car Seats"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    carSeatsError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={carSeats}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setCarSeats,
                                        setCarSeatsError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs="6">
                            <FormControl error={carTransmissionError} fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Transmission</InputLabel>
                                <Select
                                    value={carTransmission}
                                    size="small"
                                    label="Transmission"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setCarTransmission,
                                            setCarTransmissionError
                                        )}
                                >

                                    <MenuItem value={"manual"}>Manual</MenuItem>
                                    <MenuItem value={"automatic"}>Automatic</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>



                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateClose}>Cancel</Button>
                    <Button onClick={handleEditClickOpen}>
                        Confirm
                    </Button>
                </DialogActions>

            </Dialog>





        </>
    )
}

export default Cars

