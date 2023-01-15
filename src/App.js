import Landing from "./Landing/Landing";
import "./App.css";
import { useEffect, useState } from "react";
import Chart from "./Chart/Chart";

function App() {
  const [animeData, setAnimeData] = useState([]);
  const [graphData, setGraphData] = useState([]);

  const getData = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/top/anime?limit=20`);
    const resData = await res.json();
    setAnimeData(resData.data);
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    let arr = [];
    animeData.map((m, i) => {
      arr.push({ date: m.aired.prop.from.year, name: m.title });
    });
    setGraphData(arr);
  }, [animeData]);

  return (
    <div className="App">
      <Landing data={animeData} />
      {graphData && <Chart data={graphData} />}
    </div>
  );
}

export default App;
