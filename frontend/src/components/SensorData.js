import React, {useState} from 'react';
import axiosInstance from './axios';
import {useNavigate, useParams} from 'react-router-dom';
import { redirect } from "react-router-dom";
import * as Constants from "./DefaultParams";
import useStyles from "./FormStyle";
import * as utils from './utils';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


export default function Create() {
    console.log('here')

    const base_route = window.location.pathname.split("/")[1];
    // console.log(base_route);
    const navigate = useNavigate();

	
	
	const classes = useStyles();
    const { parent, parentID} = useParams();
	
	const [file, setFile] = useState();
	const [file2, setFile2] = useState();

    const [errorMessage, setErrorMessage] = useState('');

	

    function handleChange(event) {
        setFile(event.target.files[0])
      }

	function handleChange2(event) {
	setFile2(event.target.files[0])
	}

	const handleSubmit = (e) => {
		e.preventDefault();

// {headers: {'content-type': 'text/csv'}}
		//'multipart/form-data'
// Content-Disposition: attachment; filename="cool.html"
//									'Content-Disposition': 'attachment; filename="demo5.csv"' 

		axiosInstance.post(`/${base_route}/`, {'file_uploaded': file, 'Second_file':file2}, {headers: {'content-type': 'multipart/form-data'}})
		// axiosInstance.post(`/sensor_readings/`, file, {headers: {'content-type': 'text/csv'}})
		.then((response) => {
			// Now store the sensor data in database 
			// axiosInstance.post(`/sensor_readings/`, file, {headers: {'content-type': 'text/csv'}})
			// .catch((error)=>{
			// 	console.log(error)
			// });
			
			
			
			if (parent && parentID){
				navigate({ pathname: `/${parent}/${parentID}/`}); 
			}else{
				navigate({ pathname: `/${base_route}/`}); 
			};
			window.location.reload();
		})
		.catch((error) => {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				setErrorMessage(error.response.data);
				// alert('{error.response.data}');
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the
				// browser and an instance of
				// http.ClientRequest in node.js
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
			}
			console.log(error);
		});
	};


	return (
        <Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Create New {utils.sanitizer(base_route)}
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						
					<input type="file" onChange={handleChange}/>
					<input type="file" onChange={handleChange2}/>

					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Create {base_route}
					</Button>

					
					

					


				</form>
			</div>
				{ errorMessage &&
					<Container maxWidth="md" component="main" style={{paddingTop: "50px"}}>
						<Typography key='error_head' component="h1" variant="h5" className={classes.error}>
								Error:
						</Typography>
						{ Object.keys(errorMessage).map((key) => {
							return (
							<Typography key={key} component="h1" variant="h5" className={classes.error}>
								{key.charAt(0).toUpperCase() + key.slice(1)}: {errorMessage[key]}
							</Typography>
						)})}
					</Container>
				}
		</Container>
	);
        

}