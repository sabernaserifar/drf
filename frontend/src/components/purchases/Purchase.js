import { useState, useEffect } from "react";
import PurchaseList from "./PurchaseList";
import PostLoadingComponent from '../postLoading';
import axiosInstance from "../axios";


const Home = () => {
	const PostLoading = PostLoadingComponent(PurchaseList);
	const [appState, setAppState] = useState({
		loading: true,
		posts: null,
	});
	// Change the purchases to the materials inventory
	useEffect(() => {
		axiosInstance.get(`purchases/`).then((res) => {
			const allPosts = res.data;
			setAppState({ loading: false, posts: allPosts });
			// console.log(appState.posts);
		});
	}, [setAppState]);
	return (
		<div className="home">
			<PostLoading isLoading={appState.loading} posts={appState.posts} title="Purchases"/>
		</div>
	);
}
export default Home;

//
// const Home = () => {
//
//
//
//
//   const {data: blogs, isPending, error} = useFetch("/api/purchases/")
//
//   return (
//     <div className="home">
//         {error && <div>{ error }</div>}
//         {isPending && <h2>Loading...</h2>}
//         {blogs && <PurchaseList blogs={blogs} title="All Materials"/>}
//
//     </div>
//   );
// }
//
// export default Home;