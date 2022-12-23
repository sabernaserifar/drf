import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import PurchaseList from "./PurchaseList";

const Home = () => {
  const {data: blogs, isPending, error} = useFetch("/api/purchases/")

  return (
    <div className="home">
        {error && <div>{ error }</div>}
        {isPending && <h2>Loading...</h2>}
        {blogs && <PurchaseList blogs={blogs} title="All Materials"/>}

    </div>
  );
}

export default Home;