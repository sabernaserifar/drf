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

function index(obj, is, value) {
    if (typeof is == 'string')
        return index(obj,is.split('.'), value);
    else if (is.length==1 && value!==undefined)
        return obj[is[0]] = value;
    else if (is.length==0)
        return obj;
    else
        return index(obj[is[0]],is.slice(1), value);
}

function get_delete_route(child, post){
	let delete_route = `/${child.base_route}/delete/${post.id}/`;
	// For deleting sensor reading, we delete the corresponding uploaded files 
	// which also deletes all sensor readings data 
	if (child.label === 'SensorFileUpload'){
		delete_route = `/file_uploads/delete/${index(post, 'fileupload.id' )}/`;
	}
	return delete_route;
}

function get_detail_route(child, post){
	let detail_route = `/${child.base_route}/${post.id}/`;
	// For deleting sensor reading, we delete the corresponding uploaded files 
	// which also deletes all sensor readings data 
	if (child.label === 'SensorFileUpload'){
		detail_route = `/file_uploads/${index(post, 'fileupload.id' )}/`;
	}
	return detail_route;
}


const ShortDetail = (child, posts, current_route) => {
	const classes = useStyles();
	const navigate = useNavigate();

	const columns = child.columns;

	// let columns = [];
	// if (child.label === 'Input'){
	// 	columns = ['id', 'operation', 'inventory', 'quantity'];
	// }else if (child.label === 'Inventory') {
	// 	columns = ['id', 'title', 'quantity', 'unit'];
	// }else if (child.label === 'SensorFileUpload'){
	// 	columns = ['id', 'fileupload.file_url']
	// } else {
	// 	columns = [];
	// };


	// Pagination 
	let [page, setPage] = useState(1);
	if (posts){

	}
	const PER_PAGE = 10;
	const count = posts? Math.ceil(posts.length / PER_PAGE):1;
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
															{index(post, column)}
														</TableCell>
													);	
												
											})}
											<TableCell align="right">
												<Link
													color="textPrimary"
													href={get_detail_route(child, post)+current_route}
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
													href={get_delete_route(child, post)+current_route}
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
											className={classes.uploadButton}
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