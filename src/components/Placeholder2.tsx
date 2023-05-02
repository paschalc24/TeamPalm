import React, { useState, useEffect } from "react";
import axios from "axios";
import EnhancedTable from "./EnhancedTable";

interface Prop {
  title: string;
  number: number;
  viewsCount: number;
  uniqueViewsCount: number;
}

const Placeholder2 = () => {
  const [selectedOption, setSelectedOption] =
    useState<string>("mostviewedposts/");
  const [data, setData] = useState<Prop[]>([]);
  const getData = (option: string) => {
    axios
      .get(`http://127.0.0.1:8000/${option}`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData(selectedOption);
  }, [selectedOption]);

  return (
    <div>
      <select
        value={selectedOption}
        onChange={(event) => setSelectedOption(event.target.value)}
      >
        <option value="mostviewedposts/">Most Viewed Posts</option>
        <option value="unansweredposts/">Unanswered Posts</option>
        <option value="posts/">Posts</option>
      </select>
      <ul>
        <EnhancedTable key={selectedOption} rows={data.slice(0, 10)} />
      </ul>
    </div>
  );
};

export default Placeholder2;
