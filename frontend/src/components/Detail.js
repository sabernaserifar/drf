import React, { useEffect, useState } from "react";
import axiosInstance from './axios';
import { useParams } from 'react-router-dom';
import useStyles from "./FormStyle";
import * as Constants from "./DefaultParams";
import sanitizer from "./sanitizer";

//MaterialUI
import Button from '@material-ui/core/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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


export default function Detail(content_type, fields, required_fields, input_inventory, output_inventory) {
	// style classes
	const classes = useStyles();

	// Collect params
	const { id } = useParams();
	
	let form_dict = {};
	fields.map(field =>{
		form_dict[field] = '';
	}); 

	const initialFormData = Object.freeze(form_dict);
	const [formData, updateFormData] = useState(initialFormData);
	const [inputInventory, setInputInventory] = useState([]);
	const [outputInventory, setOutputInventory] = useState([]);

	useEffect(() => {
		axiosInstance.get(`/${content_type}/` + id).then((response) => {
			const data = {}; 
			Object.entries(initialFormData).forEach(([key, _])=> {
				data[key] = response.data[key];
			});
			updateFormData(data);
			setInputInventory(response.data[input_inventory]);
			setOutputInventory(response.data[output_inventory]);
		});
	}, [updateFormData]);

	const create_form = (field, required) =>{
		let multiRows = false;
		Constants.MULTIROWS.map( name => {
			if (field.includes(name)){
				multiRows = true; 
			};
		});
	
		return (
			<Grid item xs={12} key={field}>
				<TextField
					variant="outlined"
					required={required}
					fullWidth
					id={field}
					label={field}
					name={field}
					autoComplete={field}
					multiline={multiRows}
					minRows={8}
					value={formData[field]}
				/>
			</Grid>
		);
		
	};
	
	return (
		<React.Fragment>
			<Container component="main" maxWidth="sm">
				<CssBaseline />
				<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					{sanitizer(content_type)} {id} Details 
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						{fields && fields.map((field, i) => {
							return create_form(field, required_fields[i]);
						})}
					</Grid>
					<Button
						variant="contained"
						color="primary"
						href={`/${content_type}/edit/${id}/`}
					>Edit</Button>
					<Button className={classes.redButton} 
						href={`/${content_type}/delete/${id}/`}
						variant="contained"
					>Delete</Button>
				</form>
			</div>
			</Container>
			{ inputInventory && inputInventory.length !== 0 && <Container maxWidth="md" component="main" style={{paddingTop: "50px"}}>
				<Typography component="h1" variant="h5">
					Input Items
				</Typography>
				<Paper className={classes.root}>
					<TableContainer className={classes.container}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell align="left">ID</TableCell>
									<TableCell align="left">{sanitizer(content_type)} ID</TableCell>
									<TableCell align="left">Inventory ID</TableCell>
									<TableCell align="left">Amount</TableCell>
									<TableCell align="left">Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{inputInventory.map((item) => {
									return (
										<TableRow key={item.id}>
											<TableCell component="th" scope="row">
												<Link
													color="textPrimary"
													href={'/input_runs/' + item.id}
													className={classes.link}
												>
													{item.id}
												</Link>
											</TableCell>

											<TableCell component="th" scope="row">
												<Link
													color="textPrimary"
													href={'/runs/' + item.run}
													className={classes.link}
												>
													{item.run}
												</Link>
											</TableCell>
											<TableCell component="th" scope="row">
												<Link
													color="textPrimary"
													href={'/inventories/' + item.inventory}
													className={classes.link}
												>
													{item.inventory}
												</Link>
											</TableCell>
											<TableCell align="left">
												{item.amount}
											</TableCell>
			
											<TableCell align="left">
												<Link
													color="textPrimary"
													href={'/input_runs/edit/' + item.id + '/run/' + id}
													className={classes.link}
												>
													<EditIcon></EditIcon>
												</Link>
												<Link
													color="textPrimary"
													href={'/input_runs/delete/' + item.id + '/run/' + id}
													className={classes.link}
												>
													<DeleteForeverIcon></DeleteForeverIcon>
												</Link>
											</TableCell>
										</TableRow>
									);
								})}
								<TableRow>
									<TableCell colSpan={5} align="right">
										<Button
											href={'/input_runs/create/run/'+ id }
											variant="contained"
											color="primary"
										>
											New Input
										</Button>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Container>}
			{ outputInventory && outputInventory.length !== 0 && <Container maxWidth="md" component="main" style={{paddingTop: "50px"}}>
				<Typography component="h1" variant="h5">
					Output Items
				</Typography>
				<Paper className={classes.root}>
					<TableContainer className={classes.container}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell align="left">ID</TableCell>
									<TableCell align="left">Title</TableCell>
									<TableCell align="left">Quantity</TableCell>
									<TableCell align="left">Unit</TableCell>
									<TableCell align="left">Created</TableCell>
									<TableCell align="left">Updated</TableCell>
									<TableCell align="left">Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{outputInventory.map((item) => {
									return (
										<TableRow key={item.id}>
											<TableCell component="th" scope="row">
												<Link
													color="textPrimary"
													href={'/inventories/' + item.id}
													className={classes.link}
												>
													{item.id}
												</Link>
											</TableCell>
											<TableCell align="left">
												{item.title}
											</TableCell>
											<TableCell align="left">
												{item.quantity}
											</TableCell>
											<TableCell align="left">{item.unit}</TableCell>
											<TableCell align="left">{item.timestamp}</TableCell>
											<TableCell align="left">{item.updated}</TableCell>
											<TableCell align="left">
												<Link
													color="textPrimary"
													href={'/inventories/edit/' + item.id}
													className={classes.link}
												>
													<EditIcon></EditIcon>
												</Link>
												<Link
													color="textPrimary"
													href={'/inventories/delete/' + item.id}
													className={classes.link}
												>
													<DeleteForeverIcon></DeleteForeverIcon>
												</Link>
											</TableCell>
										</TableRow>
									);
								})}
								<TableRow>
									<TableCell colSpan={7} align="right">
										<Button
											href={'/inventories/create/run/'+ id }
											variant="contained"
											color="primary"
										>
											New Output
										</Button>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Container>}
		</React.Fragment>
	);
}