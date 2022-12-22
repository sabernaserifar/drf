import {useState} from "react";

import useFetch from "./useFetch";

const Home = () => {
  const { error, isPending, data: blogs } = useFetch('http://localhost:8000/api/purchases')
    console.log(blogs)

  return (
    <div className="home">
      <p>Hi</p>
      {/*{ error && <div>{ error }</div> }*/}
      {/*{ isPending && <div>Loading...</div> }*/}
        {/*{blogs}*/}
      {/*{ blogs && <BlogList blogs={blogs} /> }*/}
    </div>
  );
}

export default Home;

