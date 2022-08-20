import React from 'react'
import "./components.css"
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import jwtDecode from 'jwt-decode';


// react-bootstrap components
import {
    Badge,
    Card,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col,
    CardDeck,
    Alert
} from "react-bootstrap";


import config from '../config';
import { borderRadius } from '@mui/system';


const Login = () => {




    const [password, setpassword] = React.useState('');
    const [email, setEmail] = React.useState('');

    const [passwordError, setpasswordError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState("Filed required");



    let navigate = useNavigate();



    // Form fields states set generic function
    const handleChange = (e, func, errorFunc) => {
        func(e.target.value);
        errorFunc(false)
        setEmailErrorMessage("Filed required")
    }


    //Validation Check After Button Click
    const handleClickOpen = () => {


        // Email regex
        var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



        // Check if any field of Form is Empty
        if (password == '' || email == '' || emailRegex.test(email) == false) {
            if (password === '') {
                setpasswordError(true)
            }

            if (email === '') {
                setEmailError(true)
            }

            else if (!emailRegex.test(email)) {
                setEmailError(true)
                setEmailErrorMessage("Invalid Email address")
            }
        }
        else {

            userLogin();


        }
    };




    const userLogin = async () => {

        var data = {};

        data.password = password;
        data.email = email;

        await axios.post(config.base_url + "/api/v1/auth/login", data)
            .then(res => {
                console.log(res);
                if (res.data.success == true && res.data.token) {
                    window.localStorage.setItem("token", res.data.token)
                    window.localStorage.setItem("login", true)
                    navigate("/", { replace: true });
                }

            }).catch(err => {

                // Checking if we have duplicate key error
                if (err.response.data.errorCode == 400) {
                    alert("Incorrect user name or password")

                }

            });


    }





    return (

        <Container className='signUpDiv' >
            <Card className='cardStyle'  >
                <Card.Header className='cardHeader' >
                    <Card.Title className='cardTitle' > LOGIN   </Card.Title>
                </Card.Header>
                <br></br>
                <Card.Body style={{ marginLeft: "12px", marginRight: "12px", marginTop: "12px" }}>

                    <Row >

                        <TextField
                            error={emailError}
                            id="name"
                            label="User Email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            helperText={emailError === true ? emailErrorMessage : ''}
                            value={email}
                            onChange={(e) => handleChange(e, setEmail, setEmailError)}
                            variant="outlined"
                            size='small'


                        />


                    </Row>
                    <br></br>

                    <Row >

                        <TextField
                            error={passwordError}
                            id="name"
                            label="Password"
                            type="password"
                            placeholder="Enter User Password"
                            autoComplete="off"
                            helperText={passwordError === true ? "field required" : ''}
                            value={password}
                            onChange={(e) => handleChange(e, setpassword, setpasswordError)}
                            variant="outlined"
                            size='small'


                        />

                    </Row>

                    <br></br>
                    <br></br>

                    <Button className='signUpButton' variant="contained" size="medium" onClick={handleClickOpen}>LOGIN</Button>
                    <br></br>
                    <br></br>

                    <span onClick={() => navigate("/signup")} style={{ color: "#C0392B", cursor: "pointer" }}>Don't have an account signup</span>
                </Card.Body>
            </Card>
        </Container>


    )
}

export default Login;


