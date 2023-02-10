import React, {useEffect, useState} from "react";
import axiosInstance from '../../axios';
import {useNavigate, useParams} from 'react-router-dom';
//MaterialUI
import Button from '@material-ui/core/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Link from "@material-ui/core/Link";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
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
	error: {
		color: 'red',
	}
}));


export default function Create() {
	const navigate = useNavigate();
	const { id } = useParams();
	const classes = useStyles();

	const initialFormData = Object.freeze({
		id: '',
		run: '',
		inventory: '',
		amount: '',
	});

	const [formData, updateFormData] = useState(initialFormData);
	const [errorMessage, setErrorMessage] = useState('');

	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axiosInstance.post(`inputruns/`, {
			run: id,
			inventory: formData.inventory,
			amount: formData.amount,
		})
		.then((response) => {
			navigate({
			pathname: '/runs/' + id,
		});
		window.location.reload();

		})
		.catch((error) => {
			// Error
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				setErrorMessage(error.response.data);
				// alert('{error.response.data}');
				// console.log(error.response.status);
				// console.log(error.response.headers);
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
		<React.Fragment>
			<Container component="main" maxWidth="sm">
				<CssBaseline />
				<div className={classes.paper}>
					<form className={classes.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="inventory"
									label="Inventory"
									name="inventory"
									autoComplete="inventory"
									value={formData.inventory}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									fullWidth
									id="amount"
									label="Amount"
									name="amount"
									autoComplete="amount"
									value={formData.amount}
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
							Add Input
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
		</React.Fragment>
	);
}