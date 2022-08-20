import React from 'react'
import "./components.css"
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import axios from 'axios';




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


const SignUp = () => {




    const [userName, setUserName] = React.useState('');
    const [email, setEmail] = React.useState('');

    const [userNameError, setUserNameError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState("Filed required");



    let navigate = useNavigate();


    // Generic function to handle states
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
        if (userName == '' || email == '' || emailRegex.test(email) == false) {
            if (userName === '') {
                setUserNameError(true)
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

            userSignUp();


        }
    };




    // singup api call
    const userSignUp = async () => {

        var adminData = {};

        adminData.userName = userName;
        adminData.email = email;

        await axios.post(config.base_url + "/api/v1/auth/register", adminData)
            .then(res => {
                console.log(res);
                if (res.data.success == true && res.data.token) {
                    alert("The password is sent to your email please use that to login")
                    navigate("/login", { replace: true });
                }
            }).catch(err => {
                console.log("insde error", err.response.data);

                // Checking if we have duplicate key error
                if (err.response.data.errorCode == 11000) {
                    alert("User With similar email Already exist")

                }


            });


    }







    return (

        <Container className='signUpDiv' >
            <Card className='cardStyle'  >
                <Card.Header className='cardHeader' >
                    <Card.Title className='cardTitle' > SIGN UP   </Card.Title>
                </Card.Header>
                <br></br>
                <Card.Body style={{ marginLeft: "12px", marginRight: "12px", marginTop: "12px" }}>


                    <Row >

                        <TextField
                            error={userNameError}
                            id="name"
                            label="User Name"
                            placeholder="Enter User Name"
                            autoComplete="off"
                            helperText={userNameError === true ? "field required" : ''}
                            value={userName}
                            onChange={(e) => handleChange(e, setUserName, setUserNameError)}
                            variant="outlined"
                            size='small'


                        />

                    </Row>
                    <br></br>

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
                    <br></br>

                    <Button className='signUpButton' variant="contained" size="medium" onClick={handleClickOpen}>SIGN UP</Button>
                    <br></br>
                    <br></br>
                    <span onClick={() => navigate("/login")} style={{ color: "#C0392B", cursor: "pointer" }}>Already have an account sign in</span>
                </Card.Body>
            </Card>
        </Container>


    )
}

export default SignUp;


