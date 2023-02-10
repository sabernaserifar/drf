import { useState, useEffect } from "react";
import RunList from "./RunList";
import PostLoadingComponent from '../postLoading';
import axiosInstance from "../axios";


const Run = () => {
	const PostLoading = PostLoadingComponent(RunList);
	const [appState, setAppState] = useState({
		loading: true,
		posts: null,
	});
	// Change the purchases to the materials inventory
	useEffect(() => {
		axiosInstance.get(`runs/`).then((res) => {
			const allPosts = res.data;
			setAppState({ loading: false, posts: allPosts });
			// console.log(appState.posts);
		});
	}, [setAppState]);
	return (
		<div className="home">
			<PostLoading isLoading={appState.loading} posts={appState.posts} title="Runs"/>
		</div>
	);
}
export default Run;
