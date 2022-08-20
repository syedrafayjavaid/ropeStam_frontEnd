import React from 'react'
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';


const MyAppBar = () => {

    let navigate = useNavigate();

    // logout function
    const logOut = () => {

        window.localStorage.removeItem("token");
        window.localStorage.removeItem("login");
        navigate("/login")

    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar style={{ backgroundColor: "#C0392B" }}>
                    <IconButton
                        onClick={() => navigate("/")}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        Rope Stam
                    </IconButton>
                    <Typography onClick={() => navigate("/categories")} variant="h6" component="div" sx={{ flexGrow: 0, cursor: "pointer" }}>
                        Categories
                    </Typography>
                    &nbsp; &nbsp;  &nbsp; &nbsp;
                    <Typography onClick={() => navigate("/cars")} variant="h6" component="div" sx={{ flexGrow: 1, cursor: "pointer" }}>
                        Cars
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 6 }}>

                    </Typography>
                    <Button onClick={logOut} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default MyAppBar