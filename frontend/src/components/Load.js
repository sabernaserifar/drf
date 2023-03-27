import { useState, useEffect } from "react";
import PostLoadingComponent from './postLoading';
import axiosInstance from "./axios";
import ItemsList from "./List";
import SensorPlot from "./Plot/sensor_plot";
import CreateBlock from "./CreateBlock";
import dayjs from 'dayjs';
import * as Constants from "./FieldOptions";
import * as utils from './utils';
import { Container } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import useStyles from "./FormStyle";
import Typography from '@material-ui/core/Typography';
import FilterQuery from "./FilterQuery";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



export default function Load(fields, filter_fields) {
	const base_route = window.location.pathname.split("/")[1];
	const classes = useStyles();

	let columns = ['id']
	fields.forEach((_, field) => {
		columns.push(field);
	});

	// Optional filter fields 
	let query_dict = {};
	filter_fields.forEach((value, field) => {
		if (utils.is_date_field(field)) {
		  query_dict[field] = null;
		}else{
		  query_dict[field] = value.default_value;
		};
	});
	const initialQuery = Object.freeze(query_dict);
	const [query, setQuery] = useState(initialQuery);

    // useStates for GET requests 
	let PostLoading = PostLoadingComponent(ItemsList);
	if (base_route === 'sensors_data'){
		PostLoading = PostLoadingComponent(SensorPlot);
	};

	const [appState, setAppState] = useState({
		loading: true,
		posts: null,
	});

	useEffect(() => {
		axiosInstance.get(`${base_route}`, { params: query })
		.then((response) => {
			const allPosts = response.data;
			setAppState({
				loading: false, 
				posts: allPosts,	
			});
		});

	}, [query]);


	return (
		<Container component="main" maxWidth="lg">
			{query && Object.keys(query).length>0 && FilterQuery(filter_fields, query, setQuery)}
			<br></br>
			<br></br>
			<Typography component="h1" variant="h5">
					Results 
			</Typography>
			{base_route === 'sensors_data' &&
			<PostLoading
				isLoading={appState.loading} 
				posts={appState.posts} 
				query={query}
			/> }
			{base_route != 'sensors_data' && 
			<PostLoading
						isLoading={appState.loading} 
						posts={appState.posts} 
						columns={columns} 
						base_route={base_route}
			/>
			}
		</Container>




		

		
	);
};
