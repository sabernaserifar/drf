import React, {useState, useEffect } from 'react';
import axiosInstance from './axios';
import { useNavigate, useParams } from 'react-router-dom';
import useStyles from './FormStyle';
import * as utils from './utils';
import CreateBlock from './CreateBlock';
import ProgressBar from "./ProgressBar";
import ErrorTextBox from './ErrorBox';


//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

// import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import moment from 'moment-timezone';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import type_is from './check_type';


export default function Edit(fields) {
	const base_route = window.location.pathname.split("/")[1];
	const { id, parent, parentID } = useParams(); // for navigation after create 
	const navigate = useNavigate();
	const classes = useStyles();
	let time_zone = false;
	

	let form_dict = {};
	fields.forEach((value, field) => {
		if (utils.is_time_field(field)) {
			form_dict[field] = dayjs();
			time_zone = true;
		}else{
			form_dict[field] = value.default_value;
		};
	});
	const initialFormData = Object.freeze(form_dict);


	// Define States
	const [formData, updateFormData] = useState(initialFormData);
	const [timezone, setTimezone] = React.useState('US/Pacific');
	const [errorMessage, setErrorMessage] = useState('');
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		axiosInstance.get(`/${base_route}/` + id).then((response) => {
			const data = {}; 
			Object.entries(initialFormData).forEach(([key, _])=> {
				if (key == 'supp_kvp' && type_is(response.data[key]) === 'JSON'){
					data[key] = JSON.stringify(response.data[key])? JSON.stringify(response.data[key]):'{}';
				} else {
					data[key] = response.data[key];
				}
			});
			updateFormData(data);
		});
	}, [updateFormData]);

	const handleChange = (e, myField) => {
		if (myField && utils.is_time_field(myField)){
			updateFormData({
				...formData,
				[myField]: utils.convert_tz(e, timezone),
			});
		}else if (myField && utils.is_file_upload(myField)){
			updateFormData({
			  ...formData,
			  [e.target.name]: e.target.files[0],
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
		axiosInstance.put(`/${base_route}/${id}/`, formData, 
		{headers: {'content-type': 'multipart/form-data'}, 
		onUploadProgress : (progressEvent) => {
			setProgress(Math.floor((progressEvent.loaded) / progressEvent.total * 100))}}
		)
		.then((response) => {
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
			console.log(error.config);
		});
	};

	// const build_block = (field) =>{
	// 	const label = field[0];
	// 	const required = field[1].required_view;
	// 	const changable = field[1].changable;
	// 	// const value = (formData[label] && formData[label].length>0)? formData[label]:'None';
	// 	const value = formData[label];
	// 	if (label.includes(Constants.TIMESTRIN)){
	// 		return (
	// 			<Grid item xs={12} key={label}>
	// 				<LocalizationProvider dateAdapter={AdapterDayjs}>
	// 					<Stack spacing={13}>
	// 						<DateTimePicker
	// 						label={label}
	// 						value={value}
	// 						onChange={changable? (e)=>handleChange(e, label):null}
	// 						renderInput={
	// 							(params) => <TextField variant="outlined" required={required} {...params} />
	// 						}
	// 						/>
	// 					</Stack>
	// 				</LocalizationProvider>
	// 			</Grid>
	// 		);
	// 	}else{
	// 		return (
	// 			<Grid item xs={12} key={label}>
	// 				<TextField
	// 					variant="outlined"
	// 					required={required}
	// 					fullWidth
	// 					id={label}
	// 					label={label}
	// 					name={label}
	// 					value={value}
	// 					autoComplete={label}
	// 					onChange={changable? handleChange:null}
	// 					multiline={utils.multiRowsField(label)}
	// 					minRows={8}
	// 				/>
	// 			</Grid>
	// 		);
	// 	}
	// };

	return (
		<Container component="main" maxWidth="sm">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Update {utils.sanitizer(base_route)} {id}
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
							</Grid>
						}
						{ fields && 
							Array.from(fields).map((field) => {
								return CreateBlock(field, formData[field[0]], handleChange);
							})
						}
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={`${classes.uploadButton} ${classes.submit}`}
						onClick={handleSubmit}
					>
						{/* Update {base_route} */}
						Update
					</Button>
					{ProgressBar(progress)}
				</form>
			</div>
			{ errorMessage && 
				<Container maxWidth="md" component="main" style={{paddingTop: "50px"}}>
					<div className="col-md-12">
							<h3>Error</h3>
					</div>
					<ErrorTextBox errorMessage={errorMessage} setErrorMessage={setErrorMessage}/> 
				</Container>
      		} 
			
				{/* { errorMessage &&
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
				} */}
		</Container>
	);
}