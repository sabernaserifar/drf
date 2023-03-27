import { useState, useEffect } from "react";
import PostLoadingComponent from './postLoading';
import axiosInstance from "./axios";
import ItemsList from "./List"; 
import CreateBlock from "./CreateBlock";
import dayjs from 'dayjs';
import * as Constants from "./FieldOptions";
import * as utils from './utils';
import { Container } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import useStyles from "./FormStyle";
import Typography from '@material-ui/core/Typography';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';



export default function FilterQuery(fields, query, setQuery) {

	const handleChange = (e, myField) => {
		console.log(myField)

		if (myField && utils.is_date_field(myField)){
			setQuery({
			...query,
			[myField]: utils.convert_tz(e, 'EST'),
			});
		}else if (myField && utils.is_sensor_label(myField)) {
			const labels = []
			e.map((item) => {
				labels.push(item.label);
			});
			setQuery({
				...query,
				[myField]: labels
				});
		}else{
			setQuery({
			...query,
			[e.target.name]: e.target.value,
			});
		}
	};

	return (
		<Container component="main" maxWidth="lg">
			<Typography component="h1" variant="h5">
					Filter Results
			</Typography>

			<Grid container spacing={2}>
				{ fields && Array.from(fields).map((field) => {
					return CreateBlock(field, query[field[0]], handleChange );
					})
				}
			</Grid>

		</Container>
	);
};

