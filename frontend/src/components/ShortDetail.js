// import {Link} from "react-router-dom";
import React , {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useStyles from "./FormStyle";

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
import Typography from '@material-ui/core/Typography';



const ShortDetail = (child, posts, current_route) => {

	const classes = useStyles();
	const navigate = useNavigate();

	let columns = [];
	if (child.label === 'Input'){
		columns = ['id', 'run', 'inventory', 'amount'];
	}else if (child.label === 'Inventory') {
		columns = ['id', 'title', 'quantity', 'unit'];
	} else {
		columns = [];
	};


	// Pagination 
	let [page, setPage] = useState(1);
	const PER_PAGE = 10;
	const count = Math.ceil(posts.length / PER_PAGE);
	const _DATA = usePagination(posts, PER_PAGE);
  
	const handleChange = (e, p) => {
	  setPage(p);
	  _DATA.jump(p);
	};

	return (
		<React.Fragment key={child.name}>
			<Container maxWidth="md" component="main" style={{paddingTop: "50px"}}>
				<Typography component="h2" variant="h5">
					  {child.label} 
				</Typography>
				<Paper className={classes.root}>
					
					<TableContainer className={classes.container}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									{columns && columns.map((name, i) => {
										return <TableCell align="left" key={i}>{sanitizer(name)}</TableCell>;
									})}		
									<TableCell align="right">Action</TableCell>						
								</TableRow>
							</TableHead>
							<TableBody>
								{posts && posts.length !== 0 && _DATA.currentData().map((post) => {
									return (
										<TableRow 
										    key={post.id} 
											hover  
											selected={false}				
											// onClick={() => navigate({pathname: `/${child.base_route}/${post.id}`})}
										>
											{columns && columns.map((column, i) => {
												return  (
														<TableCell component="th" scope="row" key={'column'+i}>
															{post[column]}
														</TableCell>
													);	
												
											})}
											<TableCell align="right">
												<Link
													color="textPrimary"
													href={`/${child.base_route}/${post.id}/`+current_route}
													className={classes.link}
												>
													<InfoIcon></InfoIcon>
												</Link>
												<Link
													color="textPrimary"
													href={`/${child.base_route}/edit/${post.id}/`+current_route}
													className={classes.link}
												>
													<EditIcon></EditIcon>
												</Link>
												<Link
													color="textPrimary"
													href={`/${child.base_route}/delete/${post.id}/`+current_route}
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
											href={`/${child.base_route}/create/`+current_route}
											variant="contained"
											color="primary"
										>
											New {child.base_route}
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

export default ShortDetail;




{/* <TableCell align="left">Action</TableCell> */}
{/* <TableCell align="left">
<Link
	color="textPrimary"
	href={`/${content_type}/edit/${post.id}/`+parent_route}
	className={classes.link}
>
	<EditIcon></EditIcon>
</Link>
<Link
	color="textPrimary"
	href={`/${content_type}/delete/${post.id}/`+parent_route}
	className={classes.link}
>
	<DeleteForeverIcon></DeleteForeverIcon>
</Link>
</TableCell> */}