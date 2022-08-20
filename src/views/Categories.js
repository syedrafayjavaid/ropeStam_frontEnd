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





const Categories = () => {


    const [categoriesData, setCategoriesData] = React.useState();
    const [categoryData, setCategoryData] = React.useState('')
    const [createCategoryDialog, setCreateCategoryDialog] = React.useState(false)
    const [updateCategoryDialog, setUpdateCategoryDialog] = React.useState(false)
    const [categoryError, setCategoryError] = React.useState(false)
    const [category, setCategory] = React.useState('')
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortFlag, setSortFlag] = React.useState(false);
    const [showSortFlag, setShowSortFlag] = React.useState(false);




    // handle form states generic funcation
    const handleChange = (e, func, errorFunc) => {
        func(e.target.value)
        errorFunc(false)
    }


    // function to get all categories for api
    const getCategories = async () => {

        await axios.get(config.base_url + "/api/v1/category")
            .then(res => {
                setCategoriesData(res.data.data)
            }).catch(err => {
                console.log("Error occued possible cause", err.message);
            });
    }


    // Delete category api call
    const deleteCategory = (id) => {

        console.log();
        axios
            .delete(`${config.base_url}/api/v1/category/${id}`)
            .then((res) => {
                getCategories()
            })
            .catch((error) => {
                console.log(error, 'error')
            })

    }

    // Update category form open and data setting
    const editCategory = (item) => {
        setCategory(item.name)
        setCategoryData(item)
        setUpdateCategoryDialog(true)

    }

    // useEffect to load categories data
    useEffect(() => {
        getCategories();
    }, [])


    // handle add dialoge close
    const handleCreateClose = () => {
        setCreateCategoryDialog(false)
        setUpdateCategoryDialog(false)
        setCategoryError(false)
        setCategory('')
    }

    // handle the crate category button / checking validation
    const handleCreateClickOpen = () => {
        if (category === '') {
            setCategoryError(true)
        } else {
            createHandler()
        }
    }

    // handle the edit category button / checking validation
    const handleEditClickOpen = () => {
        if (category === '') {
            setCategoryError(true)
        } else {
            editHandler()
        }
    }


    // Create a new category
    const createHandler = () => {


        const data = {};
        data.name = category
        data.createdBy = "rafay"
        axios
            .post(`${config.base_url}/api/v1/category`, data)
            .then((res) => {
                if (res) {
                    handleCreateClose()
                    getCategories();
                    setCategory('')

                }
            })
            .catch((error) => {
                if (error.response.data.errorCode == 11000) {
                    alert("category name already exist")
                }
            })
    }

    // update previous category
    const editHandler = () => {


        const data = {};
        data.name = category
        data.createdBy = "rafay"
        axios
            .put(`${config.base_url}/api/v1/category/${categoryData._id}`, data)
            .then((res) => {
                if (res) {
                    handleCreateClose()
                    getCategories();
                    setCategory('')

                }
            })
            .catch((error) => {
                if (error.response.data.errorCode == 11000) {
                    alert("category name already exist")
                }
            })
    }



    // Table Pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // handle the table row change 
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    // Table data sorting
    const sortData = () => {

        setShowSortFlag(true);
        if (sortFlag) {
            // Ascending Sort 
            const ascSort = categoriesData.sort(function (a, b) {
                let x = a.name.toLowerCase();
                let y = b.name.toLowerCase();
                if (x < y) { return -1; }
                if (x > y) { return 1; }
                return 0;
            });
            setCategoriesData(ascSort);
            console.log("asc sort", ascSort);

        }
        else {
            // Decending sort
            const decSort = categoriesData.sort(function (a, b) {
                let x = a.name.toLowerCase();
                let y = b.name.toLowerCase();
                if (x > y) { return -1; }
                if (x < y) { return 1; }
                return 0;
            });
            setCategoriesData(decSort);
            console.log("dec sort", decSort);
        }





        setSortFlag(!sortFlag)

    }




    return (
        <>
            <Tooltip title="Add Category">
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
                    onClick={() => setCreateCategoryDialog(true)}
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
                                    Category Name
                                    <Button onClick={sortData} style={{ color: "white" }} endIcon={showSortFlag ? sortFlag ? <ArrowDownward /> : <ArrowUpward /> : <Tooltip title="Enable Sorting"><SortByAlphaIcon /></Tooltip>} />

                                </StyledTableCell>
                                <StyledTableCell align="right">Created By</StyledTableCell>
                                <StyledTableCell align="right">Created At</StyledTableCell>
                                <StyledTableCell align="right">Last Modified</StyledTableCell>
                                <StyledTableCell align="right">Edit</StyledTableCell>
                                <StyledTableCell align="right">Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categoriesData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.createdBy}</StyledTableCell>
                                    <StyledTableCell align="right">{row.craetedAt}</StyledTableCell>
                                    <StyledTableCell align="right">{row.modifiedAt ? row.modifiedAt : "N/A"}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button onClick={() => deleteCategory(row._id)}>
                                            <DeleteIcon color="error" />
                                        </Button>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button onClick={() => editCategory(row)}>
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
                            count={categoriesData ? categoriesData?.length : 0}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}>

                        </TablePagination>
                    </TableFooter>
                </TableContainer>

            </div>
            <Dialog
                open={createCategoryDialog}
                onClose={handleCreateClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'ADD CATEGORY'}
                </DialogTitle>
                <DialogContent style={{ width: '300px' }}>
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item>
                            <TextField
                                error={categoryError}
                                id="category"
                                label="Category Name"
                                placeholder="Category Name"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    categoryError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={category}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setCategory,
                                        setCategoryError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
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
                open={updateCategoryDialog}
                onClose={handleCreateClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'UPDATE CATEGORY'}
                </DialogTitle>
                <DialogContent style={{ width: '300px' }}>
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item>
                            <TextField
                                error={categoryError}
                                id="category"
                                label="Category Name"
                                placeholder="Category Name"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    categoryError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={category}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setCategory,
                                        setCategoryError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
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

export default Categories

