import React, { useState } from "react";
import NewsList from "./components/NewsList";

const App = () => {
  // const [data, setData] = useState(null);
  // const onClick = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://newsapi.org/v2/top-headlines?country=kr&apiKey=8b03715d8e07427093ea24fa793a2d64"
  //     );
  //     setData(response.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  return <NewsList />;
};

export default App;
