import { useState, useEffect } from "react";
import PostLoadingComponent from './postLoading';
import axiosInstance from "./axios";
import ItemsList from "./List"; 

export default function Load(fields) {
	const base_route = window.location.pathname.split("/")[1];

	let columns = ['id']
	fields.forEach((_, field) => {
		columns.push(field);
	});

	const PostLoading = PostLoadingComponent(ItemsList);
	const [appState, setAppState] = useState({
		loading: true,
		posts: null,
	});

	useEffect(() => {
		axiosInstance.get(`${base_route}/`).then((response) => {
			const allPosts = response.data;
			setAppState({
				loading: false, 
				posts: allPosts,	
			});
		});

	}, [setAppState]);

	return (
		<div className="home">
			<PostLoading
						isLoading={appState.loading} 
						posts={appState.posts} 
						columns={columns} 
						base_route={base_route}
			/>
		</div>
	);
};
