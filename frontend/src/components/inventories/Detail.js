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
}));


export default function Detail() {
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
	});

	const [formData, updateFormData] = useState(initialFormData);

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
			});
		});
	}, [updateFormData]);

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
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									fullWidth
									id="timestamp"
									label="Timestamp"
									name="timestamp"
									autoComplete="timestamp"
									value={formData.timestamp}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									fullWidth
									id="updated"
									label="Updated"
									name="updated"
									autoComplete="updated"
									value={formData.updated}
								/>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</React.Fragment>
	);
}