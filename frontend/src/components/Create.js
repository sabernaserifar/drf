import React, {useState} from 'react';
import axiosInstance from './axios';
import {useNavigate, useParams} from 'react-router-dom';
import { redirect } from "react-router-dom";
import * as Constants from "./DefaultParams";
import useStyles from "./FormStyle";
import sanitizer from './sanitizer';



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
import moment from 'moment-timezone';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


export default function Create(content_type, fields) {
		
	const navigate = useNavigate();
	const classes = useStyles();
	let time_zone = false;
	
	let form_dict = {};
	fields.forEach((value, field) => {
		if (field.includes(Constants.TIMESTRIN)) {
			form_dict[field] = dayjs();
			time_zone = true;	
		}else{
			form_dict[field] = value.fixed_value;
		}
	});


	const initialFormData = Object.freeze(form_dict);
	const [formData, updateFormData] = useState(initialFormData);
	const [timezone, setTimezone] = React.useState('US/Pacific');
	const [errorMessage, setErrorMessage] = useState('');

	const convert_tz = (time_object) => {
		return moment.tz(time_object.format('YYYY-MM-DDTHH:mm'), timezone).format();
	};

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
		axiosInstance.post(`/${content_type}/`, formData)
		.then((response) => {
			// navigate({ pathname: `/${content_type}/`});
			navigate({ pathname: `/runs/`});
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

	const create_form = (field) =>{
		
		const label = field[0];
		const required = field[1].required_view;
		const changable = field[1].fixed_value ? false : true;
		
		let multiRows = false;
		Constants.MULTIROWS.map( name => {
			if (label.includes(name)){
				multiRows = true; 
			};
		});
	
		if (label.includes(Constants.TIMESTRIN)){
			return (
				<Grid item xs={12} key={label}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Stack spacing={3}>
					<DateTimePicker
					required={required}
					label={label}
					value={formData[label]}
					onChange={changable? (e)=>handleChange(e, label):null}
					renderInput={(params) => <TextField {...params} />}
					/>
				</Stack>
				</LocalizationProvider>
				</Grid>
			);
		}else{
			return (
				<Grid item xs={12} key={label}>
					<TextField
						variant="outlined"
						required={required}
						fullWidth
						id={label}
						label={label}
						name={label}
						value={formData[label]}
						autoComplete={label}
						onChange={changable? handleChange:null}
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
					Create New {sanitizer(content_type)}
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

						
						{fields && Array.from(fields).map((field) => {
							return create_form(field);
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
						Create {content_type}
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