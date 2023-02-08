import React, {useState} from 'react';
import axiosInstance from '../axios';
import {useNavigate} from 'react-router-dom';

//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
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


const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	error: {
		color: 'red',
	}
}));

export default function PurchaseCreate() {
	const navigate = useNavigate();
	const classes = useStyles();
	const initialFormData = Object.freeze({
		title: '',
		description: '',
		updated: '',
		order_time: '',
		delivery_time: '',
		active: '',
	});
	const [formData, updateFormData] = useState(initialFormData);
    const [ordertime, setOrdertime] = useState(dayjs());
    const [deliverytime, setDeliverytime] = useState(dayjs());
	const [timezone, setTimezone] = React.useState('US/Pacific');
	const [errorMessage, setErrorMessage] = useState('');

	const convert_tz = (time_object) => {
		return moment.tz(time_object.format('YYYY-MM-DDTHH:mm'), timezone).format();
	};

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axiosInstance.post(`purchases/`, {
			title: formData.title,
			description: formData.description,
			active: formData.active,
			order_time: convert_tz(ordertime),
			delivery_time: convert_tz(ordertime),
		})
		.then((response) => {
			navigate({
			pathname: 'purchases/',
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

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Create New Purchase
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
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								fullWidth
								id="description"
								label="Description"
								name="description"
								autoComplete="description"
								multiline
								minRows={8}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="active"
								label="Active"
								name="active"
								autoComplete="active"
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
								  label="Order Time"
								  value={ordertime}
								  onChange={(e)=>{setOrdertime(e)}}
								  renderInput={(params) => <TextField {...params} />}
								/>
							  </Stack>
							</LocalizationProvider>

						</Grid>
						<Grid item xs={12}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
							  <Stack spacing={3}>
								<DateTimePicker
								  label="Delivery Time"
								  value={deliverytime}
								  onChange={(e)=>{setDeliverytime(e)}}
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
						Create Purchase
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