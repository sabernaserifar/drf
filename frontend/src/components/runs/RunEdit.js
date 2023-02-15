import React, {useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useNavigate, useParams } from 'react-router-dom';
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

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function RunEdit() {
	const navigate = useNavigate();
	const { id } = useParams();
	const initialFormData = Object.freeze({
		id: '',
		title: '',
		description: '',
		location: '',
		start_time: '',
		end_time: '',
	});

	const [formData, updateFormData] = useState(initialFormData);
	const [starttime, setStarttime] = useState(dayjs());
    const [endtime, setEndtime] = useState(dayjs());
	const [timezone, setTimezone] = React.useState('US/Pacific');
	const [errorMessage, setErrorMessage] = useState('');


	useEffect(() => {
		axiosInstance.get('runs/' + id).then((response) => {
			updateFormData({
				...formData,
				['title']: response.data.title,
				['description']: response.data.description,
				['location']: response.data.location,
				['order_time']: response.data.start_time,
				['end_time']: response.data.end_time,

			});
		});
	}, [updateFormData]);

	const convert_tz = (time_object) => {
		return moment.tz(time_object.format('YYYY-MM-DDTHH:mm'), timezone).format();
	};

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axiosInstance.put(`/runs/` + id + '/', {
			title: formData.title,
			description: formData.description,
			location: formData.location,
			start_time: convert_tz(starttime),
			end_time: convert_tz(endtime),
		})
		.then((response) => {
			navigate({
			pathname: '/runs/' + id,
		});
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

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="sm">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Edit Run
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="title"
								label="Title"
								name="title"
								autoComplete="title"
								value={formData.title}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="description"
								label="Description"
								name="description"
								autoComplete="description"
								value={formData.description}
								onChange={handleChange}
								multiline
								minRows={8}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="location"
								label="Location"
								name="location"
								autoComplete="locaation"
								value={formData.location}
								onChange={handleChange}
							/>
						</Grid>
						<Grid>
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
						<Grid item xs={12}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
							  <Stack spacing={3}>
								<DateTimePicker
								  label="Start Time"
								  value={starttime}
								  onChange={(e)=>{setStarttime(e)}}
								  renderInput={(params) => <TextField {...params} />}
								/>
							  </Stack>
							</LocalizationProvider>

						</Grid>
						<Grid item xs={12}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
							  <Stack spacing={3}>
								<DateTimePicker
								  label="End Time"
								  value={endtime}
								  onChange={(e)=>{setEndtime(e)}}
								  renderInput={(params) => <TextField {...params} />}
								/>
							  </Stack>
							</LocalizationProvider>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Update Run
					</Button>
				</form>
			</div>
		</Container>
	);
}