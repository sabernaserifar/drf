// import {Link} from "react-router-dom";
import React , {useState} from 'react';
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


const RunList = ({ posts, title}) => {
  	// const { posts } = props;
	const classes = useStyles();
	// if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;

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
			<Container maxWidth="md" component="main">
				<Paper className={classes.root}>
					<TableContainer className={classes.container}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell>Id</TableCell>
									<TableCell align="left">Title</TableCell>
									<TableCell align="left">Location</TableCell>
									<TableCell align="left">Start Time</TableCell>
									<TableCell align="left">End Time</TableCell>
									<TableCell align="left">Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{posts && posts.length !== 0 && _DATA.currentData().map((post) => {
									return (
										<TableRow key={post.id}>
											<TableCell component="th" scope="row">
												{post.id}
											</TableCell>
											<TableCell align="left">
												<Link
													color="textPrimary"
													href={'/runs/' + post.id}
													className={classes.link}
												>
													{post.title}
												</Link>
											</TableCell>
											<TableCell component="th" scope="row">
												{post.location}
											</TableCell>
											<TableCell component="th" scope="row">
												{post.start_time}
											</TableCell>
											<TableCell component="th" scope="row">
												{post.end_time}
											</TableCell>
											<TableCell align="left">
												<Link
													color="textPrimary"
													href={'/runs/edit/' + post.id}
													className={classes.link}
												>
													<EditIcon></EditIcon>
												</Link>
												<Link
													color="textPrimary"
													href={'/runs/delete/' + post.id}
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
											href={'/runs/create'}
											variant="contained"
											color="primary"
										>
											New Run
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


export default RunList;