import React, {useState, useEffect } from 'react';
import axiosInstance from './axios';
import { useNavigate, useParams } from 'react-router-dom';
import useStyles from './FormStyle';
import * as Constants from "./DefaultParams";
import sanitizer from './sanitizer';


//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import moment from 'moment-timezone';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


export default function Edit(content_type, fields, required_fields) {
	const navigate = useNavigate();
	const classes = useStyles();

	// Collect params
	const { id } = useParams();
	
	let time_zone = false;
	
	let form_dict = {};
	fields.map(field =>{
		if (field.includes(Constants.TIMESTRIN)) {
			form_dict[field] = dayjs();
			time_zone = true;
		}else{
			form_dict[field] = '';
		}
	}); 

	const initialFormData = Object.freeze(form_dict);
	const [formData, updateFormData] = useState(initialFormData);
	const [timezone, setTimezone] = React.useState('US/Pacific');
	const [errorMessage, setErrorMessage] = useState('');

	const convert_tz = (time_object) => {
		return moment.tz(time_object.format('YYYY-MM-DDTHH:mm'), timezone).format();
	};

	useEffect(() => {
		axiosInstance.get(`/${content_type}/` + id).then((response) => {
			const data = {}; 
			Object.entries(initialFormData).forEach(([key, _])=> {
				data[key] = response.data[key];
			});
			updateFormData(data);
		});
	}, [updateFormData]);

	const handleChange = (e, myField) => {
		if (myField && myField.includes(Constants.TIMESTRIN)){
			updateFormData({
				...formData,
				[myField]: convert_tz(e),
			});
		}else{
			updateFormData({
				...formData,
				[e.target.name]: e.target.value,
			});
		}	
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axiosInstance.put(`/${content_type}/${id}/`, formData)
		.then((response) => {
			navigate({ pathname: `/${content_type}/${id}/`});
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
			console.log(error.config);
		});
	};


	const create_form = (field, required) =>{
		let multiRows = false;
		Constants.MULTIROWS.map( name => {
			if (field.includes(name)){
				multiRows = true; 
			};
		});
	
		if (field.includes(Constants.TIMESTRIN)){		
			return (
				<Grid item xs={12} key={field}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Stack spacing={3}>
					<DateTimePicker
					required={required}
					label={field}
					value={formData[field]}
					onChange={(e)=>handleChange(e, field)}
					renderInput={(params) => <TextField {...params} />}
					/>
				</Stack>
				</LocalizationProvider>
				</Grid>
			);
		}else{
			return (
				<Grid item xs={12} key={field}>
					<TextField
						variant="outlined"
						required={required}
						fullWidth
						id={field}
						label={field}
						name={field}
						value={formData[field]}
						autoComplete={field}
						onChange={handleChange}
						multiline={multiRows}
						minRows={8}
					/>
				</Grid>
			);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Update {sanitizer(content_type)}
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						{ time_zone && 
						<Grid item xs={12} key={'timezone'}>
							<InputLabel id="demo-simple-select-label">Time Zone</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={timezone}
								label="Timezone"
								onChange={(e)=>{setTimezone(e.target.value)}}
							>
								<MenuItem value={'US/Pacific'}>US/Pacific</MenuItem>
								<MenuItem value={'EST'}>EST</MenuItem>
							</Select>
						</Grid>}
						{fields && fields.map((field, i) => {
							return create_form(field, required_fields[i]);
						})}
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Update {content_type}
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