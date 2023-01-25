import {useParams} from "react-router-dom";

import React, {useEffect, useState} from "react";
import axiosInstance from '../axios';
//MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Link from "@material-ui/core/Link";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
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
	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));



const PurchaseDetail = () => {
	const { id } = useParams();
	const classes = useStyles();
	const classes_items = useStyles_table();
	const [data, setData] = useState({
		posts: [],
	});

	useEffect(() => {
		axiosInstance.get('purchases/' + id).then((res) => {
			setData({
				posts: res.data,
			});
		});
	}, [setData]);

	const items = data.posts.purchase_items;

	return (
		<React.Fragment>
			<Container component="main" maxWidth="md">
				<CssBaseline />
				<div className={classes.paper}> </div>{' '}
				<div className={classes.heroContent}>
					<Container maxWidth="sm">
						<Typography
							component="h1"
							variant="h2"
							align="center"
							color="textPrimary"
							gutterBottom
						>
							{data.posts.title}{' '}
						</Typography>{' '}
						<Typography
							variant="h5"
							align="center"
							color="textSecondary"
							paragraph
						>
							{data.posts.order_time}{' '}
						</Typography>{' '}
					</Container>{' '}
				</div>{' '}
			</Container>

			{ items && <Container maxWidth="md" component="main">
				<Paper className={classes_items.root}>
					<TableContainer className={classes_items.container}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell>Id</TableCell>
									<TableCell align="left">Name</TableCell>
									<TableCell align="left">Quantity</TableCell>
									<TableCell align="left">Unit</TableCell>
									<TableCell align="left">Action</TableCell>

								</TableRow>
							</TableHead>
							<TableBody>
								{items.map((post) => {
									const item_id = post.split(":")[0];
									return (
										<TableRow key={post}>
											<TableCell component="th" scope="row">
												{item_id}
											</TableCell>
											{/*<TableCell align="left">{post.order_time}</TableCell>*/}
			
											<TableCell align="left">
												<Link
													color="textPrimary"
													href={'/purchaseItem/' + item_id}
													className={classes_items.link}
												>
													{post.split(":")[1]}
												</Link>
											</TableCell>

											<TableCell align="left">
												<Link
													color="textPrimary"
													className={classes_items.link}
												>
													{post.split(":")[2]}
												</Link>
											</TableCell>
											<TableCell align="left">
												<Link
													color="textPrimary"
													className={classes_items.link}
												>
													{post.split(":")[3]}
												</Link>
											</TableCell>






			
											<TableCell align="left">
												<Link
													color="textPrimary"
													href={'/purchases/edit/' + post.id}
													className={classes_items.link}
												>
													<EditIcon></EditIcon>
												</Link>
												<Link
													color="textPrimary"
													href={'/purchases/delete/' + post.id}
													className={classes_items.link}
												>
													<DeleteForeverIcon></DeleteForeverIcon>
												</Link>
											</TableCell>
										</TableRow>
									);
								})}
								<TableRow>
									<TableCell colSpan={6} align="right">
										<Button
											href={'/purchases/create'}
											variant="contained"
											color="primary"
										>
											New Item
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
    // const { id } = useParams();
    // const { data: purchase, isPending, error } = useFetch("/purchases/"+id, true)
    // return (
    //     <div className="blog-details">
    //         { isPending && <div>Loading...</div> }
    //         { error && <div>{ error }</div> }
    //         { purchase && (
    //             <article>
    //                 <h2>{ purchase.title }</h2>
    //                 <p>Ordered at { purchase.order_time }</p>
    //             </article>
    //         )}
    //     </div>
    // );
};

export default PurchaseDetail;
