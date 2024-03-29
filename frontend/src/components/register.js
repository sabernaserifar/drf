import React, { useState } from 'react';
import axiosInstance from './axios';
import { useNavigate } from 'react-router-dom';
import {ProcessErrorMessage} from './ErrorMessage';
import ErrorTextBox from './ErrorBox';


//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
}));

export default function SignUp() {
	const navigate = useNavigate();
	const initialFormData = Object.freeze({
		email: '',
		password: '',
		retypePassword: '',
	});

	const [formData, updateFormData] = useState(initialFormData);
	const [errorMessage, setErrorMessage] = useState('');


	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (formData.password !== formData.retypePassword) {
			console.log(formData.password, formData.retypePassword)
			setErrorMessage({"data": "Passwords do not match"});
		} else {

		axiosInstance
			.post(`user/create/`, {
				email: formData.email,
				password: formData.password,
			})
			.then((res) => {
				navigate('/login');
				console.log(res);
				console.log(res.data);
			})
			.catch((error) => {
				setErrorMessage(ProcessErrorMessage(error));
			})
			// .catch(function (error) {
			// 	if (error.response) {
			// 	  // The request was made and the server responded with a status code
			// 	  // that falls out of the range of 2xx
			// 	  console.log(error.response.data);
			// 	  console.log(error.response.status);
			// 	  console.log(error.response.headers);
			// 	} else if (error.request) {
			// 	  // The request was made but no response was received
			// 	  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// 	  // http.ClientRequest in node.js
			// 	  console.log(error.request);
			// 	} else {
			// 	  // Something happened in setting up the request that triggered an Error
			// 	  console.log('Error', error.message);
			// 	}
			// 	console.log(error.config);
			//   });
	}};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="retypePassword"
								label="Retype Password"
								type="password"
								id="retypePassword"
								autoComplete="current-password"
								onChange={handleChange}
							/>
						</Grid>
						{/* <Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox value="allowExtraEmails" color="primary" />}
								label="I want to receive inspiration, marketing promotions and updates via email."
							/>
						</Grid> */}
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Sign Up
					</Button>
					<Grid container >
						<Grid item>
							<Link href="/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
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
		</Container>
	);
}