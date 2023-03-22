// import {Link} from "react-router-dom";
import React , {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useStyles from "./FormStyle";


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
import InfoIcon from '@mui/icons-material/Info';
import Button from '@material-ui/core/Button';
import { Pagination } from "@material-ui/lab";
import usePagination from "./Pagination";
import sanitizer from './sanitizer';


const ItemsList = ({ posts, columns, base_route}) => {
	const classes = useStyles();
	const navigate = useNavigate();

	let [page, setPage] = useState(1);

	const PER_PAGE = 15;
	const count = Math.ceil(posts.length / PER_PAGE);
	const _DATA = usePagination(posts, PER_PAGE);
  
	const handleChange = (e, p) => {
	  setPage(p);
	  _DATA.jump(p);
	};

	return (
		<React.Fragment>
			<Container maxWidth="lg" component="main">
				<Paper className={classes.root}>
					<TableContainer className={classes.container}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									{columns && columns.map((name, i) => {
										return <TableCell align="left" key={i}>{sanitizer(name)}</TableCell>;
									})}
									<TableCell align="left">Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{posts && posts.length !== 0 && _DATA.currentData().map((post) => {
									return (
										<TableRow
											key={post.id}  
											hover  
											selected={false}											
											// onClick={() => navigate({pathname: `/${content_type}/${post.id}`})}
										>
											{columns && columns.map((column, i) => {
												if (column == 'content_object') {
													return (<TableCell align="left" key={'content_obj'+i}>
														<Link
															color="textPrimary"
															href={post[column].split("api/")[1]}
															className={classes.link}
															key = 'link_source'
														>
															click
														</Link>
													</TableCell>
													);	
												}
												else {
													return  (
														<TableCell component="th" scope="row" key={'column'+i}>
															{post[column]}
														</TableCell>
													);	
												}
											})}
											<TableCell align="left">
												<Link
													color="textPrimary"
													href={`/${base_route}/${post.id}`}
													className={classes.link}
												>
													<InfoIcon></InfoIcon>
												</Link>
												<Link
													color="textPrimary"
													href={`/${base_route}/edit/${post.id}/`}
													className={classes.link}
												>
													<EditIcon></EditIcon>
												</Link>
												<Link
													color="textPrimary"
													href={`/${base_route}/delete/${post.id}/`}
													className={classes.link}
												>
													<DeleteForeverIcon></DeleteForeverIcon>
												</Link>
											</TableCell>
										</TableRow>
									);
								})}		
								<TableRow key={'create'}>
									<TableCell colSpan={columns.length+1} align="right">
										<Button
											href={`/${base_route}/create/`}
											variant="contained"
											color="primary"
											className={classes.uploadButton}
										>
											New {base_route}
										</Button>
									</TableCell>
								</TableRow>
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

export default ItemsList;