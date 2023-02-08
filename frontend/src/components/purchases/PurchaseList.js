// import {Link} from "react-router-dom";
import React from 'react';
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



const BlogList = ({ posts, title}) => {
  	// const { posts } = props;
	const classes = useStyles();
	// if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;

	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<Paper className={classes.root}>
					<TableContainer className={classes.container}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell>Id</TableCell>
									<TableCell align="left">Order Time</TableCell>
									<TableCell align="left">Title</TableCell>
									<TableCell align="left">Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{posts && posts.length !== 0 && posts.map((post) => {
									return (
										<TableRow key={post.id}>
											<TableCell component="th" scope="row">
												{post.id}
											</TableCell>
											<TableCell align="left">{post.order_time}</TableCell>

											<TableCell align="left">
												<Link
													color="textPrimary"
													href={'/purchases/' + post.id}
													className={classes.link}
												>
													{post.title}
												</Link>
											</TableCell>

											<TableCell align="left">
												<Link
													color="textPrimary"
													href={'/purchases/edit/' + post.id}
													className={classes.link}
												>
													<EditIcon></EditIcon>
												</Link>
												<Link
													color="textPrimary"
													href={'/purchases/delete/' + post.id}
													className={classes.link}
												>
													<DeleteForeverIcon></DeleteForeverIcon>
												</Link>
											</TableCell>
										</TableRow>
									);
								})}
								<TableRow>
									<TableCell colSpan={4} align="right">
										<Button
											href={'/purchases/create'}
											variant="contained"
											color="primary"
										>
											New Purchase
										</Button>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Container>
		</React.Fragment>
	);
};





  // const blogs = props.blogs;
  // const title = props.title;
  // console.log(posts);
//   if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;
//
//   return (
//     <div className="blog-list">
//       <h2>{ title }</h2>
//       {posts.map(post => (
//         <div className="blog-preview" key={post.id} >
//           <Link to={`purchases/${post.id}`}>
//             <h2>{ post.title }</h2>
//             <p>Ordered at { post.order_time }</p>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// }

export default BlogList;


//
//
// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
//
// const useStyles = makeStyles((theme) => ({
// 	cardMedia: {
// 		paddingTop: '56.25%', // 16:9
// 	},
// 	link: {
// 		margin: theme.spacing(1, 1.5),
// 	},
// 	cardHeader: {
// 		backgroundColor:
// 			theme.palette.type === 'light'
// 				? theme.palette.grey[200]
// 				: theme.palette.grey[700],
// 	},
// 	postTitle: {
// 		fontSize: '16px',
// 		textAlign: 'left',
// 	},
// 	postText: {
// 		display: 'flex',
// 		justifyContent: 'left',
// 		alignItems: 'baseline',
// 		fontSize: '12px',
// 		textAlign: 'left',
// 		marginBottom: theme.spacing(2),
// 	},
// }));
//
// const BlogList = ({isLoading, blogs, title}) => {
// 	console.log(isLoading, blogs, title)
// 	// const { posts } = props;
// 	const posts = blogs
// 	const classes = useStyles();
// 	if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;
// 	return (
// 		<React.Fragment>
// 			<Container maxWidth="md" component="main">
// 				<Grid container spacing={5} alignItems="flex-end">
// 					{posts.map((post) => {
// 						return (
// 							// Enterprise card is full width at sm breakpoint
// 							<Grid item key={post.id} xs={12} md={4}>
// 								<Card className={classes.card}>
// 									<CardContent className={classes.cardContent}>
// 										<Typography
// 											gutterBottom
// 											variant="h6"
// 											component="h2"
// 											className={classes.postTitle}
// 										>
// 											{post.title.substr(0, 50)}...
// 										</Typography>
// 										{/*<div className={classes.postText}>*/}
// 										{/*	<Typography color="textSecondary">*/}
// 										{/*		{post.excerpt.substr(0, 60)}...*/}
// 										{/*	</Typography>*/}
// 										{/*</div>*/}
// 									</CardContent>
// 								</Card>
// 							</Grid>
// 						);
// 					})}
// 				</Grid>
// 			</Container>
// 		</React.Fragment>
// 	);
// };
// export default BlogList;
