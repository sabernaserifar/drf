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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function ForgotPassword() {
	const navigate = useNavigate();
	const initialFormData = Object.freeze({
		email: '',
	});

	const [formData, updateFormData] = useState(initialFormData);
    const [errorMessage, setErrorMessage] = useState('');
	const [sentMessage, setSentMessage] = useState('');


	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	axiosInstance
	// 		.post(`forgot_password/`, {
	// 			email: formData.email,
	// 		})
	// 		.then((res) => {
    //             setSentMessage('An email with a temporary password was sent!')
	// 		})
	// 		.catch((error) => {
	// 			setErrorMessage(ProcessErrorMessage(error));
	// 		})

	// };

	const classes = useStyles();


	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Send Password To 
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
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Send  
					</Button>
				</form>
			</div>
            { sentMessage && 
      			<Container maxWidth="md" component="main" style={{paddingTop: "50px"}}>
              		<div className="col-md-12">
                    	<h3>{sentMessage}</h3>
              		</div>
         		</Container>
      		} 
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