import React, { Children, useEffect, useState } from "react";
import axiosInstance from './axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import useStyles from "./FormStyle";
import * as Constants from "./DefaultParams";
import sanitizer from "./sanitizer";
import * as utils from './utils';
import ShortDetail from "./ShortDetail";


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


export default function Detail(fields, children, parents) {
	
	const base_route = window.location.pathname.split("/")[1];
	const { id, parent, parentID } = useParams(); // for navigation after create 
	const navigate = useNavigate();
	const classes = useStyles();

	let parent_route = '';
	if (parent && parentID){
		parent_route = `${parent}/${parentID}`;
	}
	
	let form_dict = {};
	fields.forEach((_, field) => {
		form_dict[field] = '';
	});

	children.map((child) => {
		form_dict[child.name] = '';
	});

	parents.map((parent)=>{
		form_dict[parent.name] = '';
	});
	const initialFormData = Object.freeze(form_dict);

	// Define States
	const [formData, updateFormData] = useState(initialFormData);


	useEffect(() => {
		axiosInstance.get(`/${base_route}/` + id).then((response) => {
			const data = {}; 
			Object.entries(initialFormData).forEach(([key, _])=> {
				data[key] = response.data[key];
			});
			updateFormData(data);
		});
	}, [updateFormData]);

	const build_block = (field) =>{
		const label = field[0];
		const required = field[1].required_view;
		return (
			<Grid item xs={12} key={field}>
				<TextField
					variant="outlined"
					required={required}
					fullWidth
					id={label}
					label={label}
					name={label}
					autoComplete={label}
					multiline={utils.multiRowsField(label)}
					minRows={8}
					value={formData[label]}
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
					{sanitizer(base_route)} {id} Details 
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						{fields && 
							Array.from(fields).map((field) => {
								return build_block(field);
							})
						}
					</Grid>
					<Button
						variant="contained"
						color="primary"
						href={`/${base_route}/edit/${id}/`+parent_route}
					>Edit</Button>
					<Button className={classes.redButton} 
						href={`/${base_route}/delete/${id}/`+parent_route}
						variant="contained"
					>Delete</Button>
				</form>
			</div>
			</Container>
			{
				
			
			children && children.map((child)=>{
				return ShortDetail(child, formData[child.name], `${base_route}/${id}`);
			})}
		</React.Fragment>
	);
}