// import {Link} from "react-router-dom";
import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { Pagination } from "@material-ui/lab";
import usePagination from "../Pagination";

//TODO: move style sheets single file
const useStyles = makeStyles((theme) => ({
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
	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));



const InventoryList = ({ posts: inventories, title}) => {
  	// const { posts } = props;
	const classes = useStyles();

	let [page, setPage] = useState(1);
	const PER_PAGE = 15;
  
	const count = Math.ceil(inventories.length / PER_PAGE);
	const _DATA = usePagination(inventories, PER_PAGE);
  
	const handleChange = (e, p) => {
	  setPage(p);
	  _DATA.jump(p);
	};

	if (!inventories || inventories.length === 0) return <p>Can not find any inventories, sorry</p>;


	return (
		<React.Fragment>
			<Container maxWidth="lg" component="main">
				<Paper className={classes.root}>
					<TableContainer className={classes.container}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell align="left">Title</TableCell>
									<TableCell align="left">Quantity</TableCell>
									<TableCell align="left">Unit</TableCell>
									<TableCell align="left">Created</TableCell>
									<TableCell align="left">Updated</TableCell>
									<TableCell align="left">Category</TableCell>
									<TableCell align="left">Source Link</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{_DATA.currentData().map((inventory) => {
									return (
										<TableRow key={inventory.id}>
											<TableCell component="th" scope="row">{inventory.id}</TableCell>
											<TableCell align="left">{inventory.title}</TableCell>
											<TableCell align="left">{inventory.quantity}</TableCell>
											<TableCell align="left">{inventory.unit}</TableCell>
											<TableCell align="left">{inventory.timestamp}</TableCell>
											<TableCell align="left">{inventory.updated}</TableCell>
											<TableCell align="left">{inventory.content_type}</TableCell>

											<TableCell align="left">
												<Link
													color="textPrimary"
													href={inventory.content_object.split("api/")[1]}
													className={classes.link}
												>
													click
												</Link>
											</TableCell>

										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
					<Pagination
						count={count}
						size="large"
						page={page}
						variant="outlined"
						shape="rounded"
						onChange={handleChange}
					/>
				</Paper>
			</Container>
		</React.Fragment>
	);
};




export default InventoryList;

