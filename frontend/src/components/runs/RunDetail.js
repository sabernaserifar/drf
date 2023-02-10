import React, {useEffect, useState} from "react";
import axiosInstance from '../axios';
import {useParams} from 'react-router-dom';
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
import { Outbound } from "@mui/icons-material";

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

const useStyles_table = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	postTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	editButton1: {
		color : "primary",
	},
	editButton2: {
		color : "white",
		background: "red"
	},
	container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
    },
	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));

export default function RunDetail() {
	const { id } = useParams();
	const initialFormData = Object.freeze({
		id: '',
		title: '',
		description: '',
		location: '',
		start_time: '',
		end_time: '',
		timestamp: '',
		updated: '',
	});


	const classes = useStyles();
	const classes_items = useStyles_table();

	const [formData, updateFormData] = useState(initialFormData);
	const [inputData, setInputData] = useState([]);
	const [outputData, setOutputData] = useState([]);
	
	useEffect(() => {
		axiosInstance.get('runs/' + id).then((response) => {
			updateFormData({
				...formData,
				['title']: response.data.title,
				['description']: response.data.description,
				['location']: response.data.location,
				['start_time']: response.data.start_time,
				['end_time']: response.data.end_time,
				['timestamp']: response.data.timestamp,
				['updated']: response.data.updated,
			});
			setInputData(response.data.input_run);
			setOutputData(response.data.tags);
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
									id="location"
									label="Location"
									name="location"
									autoComplete="location"
									value={formData.location}
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
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									fullWidth
									id="start_time"
									label="Start Time"
									name="start_time"
									autoComplete="start_time"
									value={formData.start_time}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									fullWidth
									id="end_time"
									label="End Time"
									name="end_time"
									autoComplete="end_time"
									value={formData.end_time}
								/>
							</Grid>

							<ButtonGroup
								variant="contained"
								aria-label="primary button group"
							>
								  <Button
									  variant="contained"
									  color="primary"
									  href={'/runs/edit/'+ id + '/'}
								  >Edit</Button>
								  <Button
										href={'/runs/delete/'+ id + '/'}
										variant="contained"
										style={{
											color: "white",
											backgroundColor: "red",
										}}
								  >Delete</Button>
							</ButtonGroup>
						</Grid>
					</form>
				</div>
			</Container>

			{ inputData && inputData.length !== 0 && <Container maxWidth="md" component="main" style={{paddingTop: "50px"}}>
				<Typography component="h1" variant="h5">
					Input Items
				</Typography>
				<Paper className={classes_items.root}>
					<TableContainer className={classes_items.container}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell align="left">ID</TableCell>
									<TableCell align="left">Run ID</TableCell>
									<TableCell align="left">Inventory ID</TableCell>
									<TableCell align="left">Amount</TableCell>
									<TableCell align="left">Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{inputData.map((item) => {
									return (
										<TableRow key={item.id}>
											<TableCell component="th" scope="row">
												<Link
													color="textPrimary"
													href={'/input_runs/' + item.id}
													className={classes_items.link}
												>
													{item.id}
												</Link>
											</TableCell>

											<TableCell component="th" scope="row">
												<Link
													color="textPrimary"
													href={'/runs/' + item.run}
													className={classes_items.link}
												>
													{item.run}
												</Link>
											</TableCell>
											<TableCell component="th" scope="row">
												<Link
													color="textPrimary"
													href={'/inventories/' + item.inventory}
													className={classes_items.link}
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
													className={classes_items.link}
												>
													<EditIcon></EditIcon>
												</Link>
												<Link
													color="textPrimary"
													href={'/input_runs/delete/' + item.id + '/run/' + id}
													className={classes_items.link}
												>
													<DeleteForeverIcon></DeleteForeverIcon>
												</Link>
											</TableCell>
										</TableRow>
									);
								})}
								<TableRow>
									<TableCell colSpan={8} align="right">
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



			{ outputData && outputData.length !== 0 && <Container maxWidth="md" component="main" style={{paddingTop: "50px"}}>
				<Typography component="h1" variant="h5">
					Output Items
				</Typography>
				<Paper className={classes_items.root}>
					<TableContainer className={classes_items.container}>
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
								{outputData.map((item) => {
									return (
										<TableRow key={item.id}>
											<TableCell component="th" scope="row">
												<Link
													color="textPrimary"
													href={'/inventories/' + item.id}
													className={classes_items.link}
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
													className={classes_items.link}
												>
													<EditIcon></EditIcon>
												</Link>
												<Link
													color="textPrimary"
													href={'/inventories/delete/' + item.id}
													className={classes_items.link}
												>
													<DeleteForeverIcon></DeleteForeverIcon>
												</Link>
											</TableCell>
										</TableRow>
									);
								})}
								<TableRow>
									<TableCell colSpan={8} align="right">
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