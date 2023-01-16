import {Link} from "react-router-dom";

const BlogList = ({ posts, title}) => {
  // const blogs = props.blogs;
  // const title = props.title;
  // console.log(posts);
  if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;

  return (
    <div className="blog-list">
      <h2>{ title }</h2>
      {posts.map(post => (
        <div className="blog-preview" key={post.id} >
          <Link to={`purchases/${post.id}`}>
            <h2>{ post.title }</h2>
            <p>Ordered at { post.order_time }</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

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
