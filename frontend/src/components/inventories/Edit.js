import React, {useEffect, useState} from "react";
import axiosInstance from '../axios';
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


export default function Edit() {
	const navigate = useNavigate();
	const { id } = useParams();
   	const classes = useStyles();

	const initialFormData = Object.freeze({
		id: '',
		title: '',
		description: '',
        source_model: '',
        quantity: '',
        unit: '',
        timestamp: '',
		updated: '',
		object_id: '',
		content_type: '',
		content_object: '',
	});

	const [formData, updateFormData] = useState(initialFormData);
	const [errorMessage, setErrorMessage] = useState('');


	useEffect(() => {
		axiosInstance.get('inventories/' + id).then((res) => {
			updateFormData({
				...formData,
				['title']: res.data.title,
				['description']: res.data.description,
                ['source_model']: res.data.source_model,
				['quantity']: res.data.quantity,
				['unit']: res.data.unit,
				['timestamp']: res.data.timestamp,
				['updated']: res.data.updated,
				['object_id']: res.data.object_id,
				['content_type']: res.data.content_type,
				['content_object']: res.data.content_object,
			});
		});
	}, [updateFormData]);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axiosInstance.put(`inventories/` + id + '/', {
			title: formData.title,
			description: formData.description,
			source_model: formData.source_model,
			quantity: formData.quantity,
			unit: formData.unit,
			timestamp: formData.timestamp,
			updated: formData.updated,
			object_id: formData.object_id,
			content_type: formData.content_type,
			content_object: formData.content_object,

		})
		.then((response) => {
			navigate({
			pathname: '/',
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
									fullWidth
									id="description"
									label="Description"
									name="description"
									autoComplete="description"
									value={formData.description}
									multiline
									minRows={8}
									onChange={handleChange}
								/>
							</Grid>
                            <Grid item xs={12}>
								<TextField
									variant="outlined"
									fullWidth
									id="source_model"
									label="Source Model"
									name="source_model"
									autoComplete="source_model"
									value={formData.source_model}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									fullWidth
									id="quantity"
									label="Quantity"
									name="quantity"
									autoComplete="quantity"
									value={formData.quantity}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									fullWidth
									id="unit"
									label="Unit"
									name="unit"
									autoComplete="unit"
									value={formData.unit}
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
							Update Inventory
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