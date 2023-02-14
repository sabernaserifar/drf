import { useState, useEffect } from "react";
import PostLoadingComponent from './postLoading';
import axiosInstance from "./axios";
import ItemsList from "./List"; 

const Load = (content_type, columns) => {

	const PostLoading = PostLoadingComponent(ItemsList);
	const [appState, setAppState] = useState({
		loading: true,
		posts: null,
	});

	useEffect(() => {
		axiosInstance.get(`${content_type}/`).then((response) => {
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
						content_type={content_type}
			/>
		</div>
	);
}

export default Load;
