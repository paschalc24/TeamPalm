import React, { useState, useEffect } from "react";
import axios from "axios";

interface Prop {
  title: string;
}

const Placeholder2 = () => {
  const [selectedOption, setSelectedOption] =
    useState<string>("mostviewedposts");
  const [data, setData] = useState<Prop[]>([]);

  const getData = (option: string) => {
    axios
      .get(`http://127.0.0.1:8000/${option}`)
      .then((response) => setData(response.data))
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
        {data.slice(0, 10).map((entry) => (
          <li key={0}>
            <h2>{entry.title}</h2>
            {/* Render any additional properties as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Placeholder2;
