import { useParams } from "react-router-dom";
import useFetch from "../useFetch";

import { useState, useEffect } from "react";
import axiosInstance from '../axios';

//MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

const PurchaseDetail = () => {
	const { id } = useParams();
	const classes = useStyles();
	const [data, setData] = useState({
		posts: [],
	});

	useEffect(() => {
		axiosInstance.get('purchases/' + id).then((res) => {
			setData({
				posts: res.data,
			});
			// console.log(res.data);
		});
	}, [setData]);

	return (
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
