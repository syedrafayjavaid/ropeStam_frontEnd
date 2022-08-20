import React from 'react'
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import { Card, CardContent, Typography } from '@mui/material'
import { useEffect } from 'react';
import axios from 'axios';
import config from '../config';



const CountCard = () => {


    const [carsData, setcarsData] = React.useState();


    // function to get all cars
    const getcars = async () => {

        await axios.get(config.base_url + "/api/v1/car")
            .then(res => {
                setcarsData(res.data.data)
            }).catch(err => {
                console.log("Error occued possible cause", err.message);
            });
    }

    useEffect(() => {
        getcars();
    }, [])




    return (
        <Card style={{ margin: "150px auto", height: "250px", width: "250px", backgroundColor: "#C0392B" }}>
            <CardContent style={{ justifyContent: "center" }}>
                <h1>
                    Total Cars
                </h1>




                <TimeToLeaveIcon style={{ height: "100px", width: "100px" }} /> <span style={{ heigth: "30px", fontWeigth: '300px', fontSize: "30px" }}>
                    {carsData?.length}
                </span>

            </CardContent>
        </Card >
    )
}

export default CountCard