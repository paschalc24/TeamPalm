import React, { useState, useEffect } from "react";
import axios from "axios";

interface Prop {}

const Placeholder2 = () => {
  const [selectedOption, setSelectedOption] = useState<string>("option1");
  const [data, setData] = useState([]);

  const getData = (option: string) => {
    axios
      .get(`http://127.0.0.1:8000/${option}`)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error))
      .finally();
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
        <option value="mostviewedposts/">Option 1</option>
        <option value="unansweredposts/">Option 2</option>
        <option value="posts">Option 3</option>
      </select>
      <ul>
        {data.slice(0, 10).map((item) => (
          <li key={0}>
            <h2>{item.name}</h2>
            {/* Render any additional properties as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Placeholder2;
